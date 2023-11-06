import { randomUUID } from "crypto";
import { FastifyError, onRequestAsyncHookHandler } from "fastify";
import fastifyPlugin from "fastify-plugin";

import { FastifyJwtNamespace } from "@fastify/jwt";
import { Type } from "@sinclair/typebox";

import { CourseEnrollment, RefreshToken, Teacher, User } from "../entities";
import { FastifyInstanceTypeBox } from "../utils";

declare module "fastify" {
    interface FastifyInstance
        extends FastifyJwtNamespace<{ namespace: "security" }> {
        authenticate: onRequestAsyncHookHandler;
        authenticateAsStudent: onRequestAsyncHookHandler;
        authenticateAsTeacher: onRequestAsyncHookHandler;
        authenticateAsAdmin: onRequestAsyncHookHandler;
    }

    interface FastifyRequest {
        userId: number;
        userEntity: User;
        userCourse: CourseEnrollment;
    }
}

export type JwtBody = {
    readonly id: number;
};

export type JwtRefreshBody = {
    readonly id: string;
    readonly userId: number;
};

export const AuthenticateResponseSchema = Type.Object(
    {
        statusCode: Type.Integer(),
        error: Type.String(),
        message: Type.String(),
    },
    {
        $id: "AuthenticateResponseSchema",
        description: "User not found or deleted",
    }
);

const authenticatePlugin = fastifyPlugin(async function (
    app: FastifyInstanceTypeBox
) {
    app.addSchema(AuthenticateResponseSchema);

    app.decorateRequest("userId", null);
    app.decorateRequest("userEntity", null);
    app.decorate("authenticate", async (req, res) => {
        const tryVerify = async () => {
            try {
                return await req.jwtVerify<JwtBody>();
            } catch (err) {
                if (
                    (err as FastifyError).code !==
                    "FST_JWT_AUTHORIZATION_TOKEN_EXPIRED"
                )
                    throw err;

                // Re-throw the expiry error if there is no refresh token
                const refreshToken = req.cookies.refreshToken;
                if (refreshToken === undefined) throw err;

                // Verify the refresh token
                const body = await req.jwtDecode<JwtBody>();
                const refreshTokenBody = app.jwt.verify<JwtRefreshBody>(
                    refreshToken,
                    { onlyCookie: true }
                );
                if (refreshTokenBody.userId !== body.id)
                    throw res.unauthorized("Refresh token user id mismatch");

                const refreshTokenRepo =
                    app.dataSource.getRepository(RefreshToken);
                let refreshTokenEntity = await refreshTokenRepo.findOneBy({
                    id: refreshTokenBody.id,
                });
                if (refreshTokenEntity !== null)
                    throw res.unauthorized("Refresh token is expired");

                // Add used refresh token to the database
                await refreshTokenRepo
                    .createQueryBuilder()
                    .insert()
                    .values({ id: refreshTokenBody.id })
                    .execute();

                // Give a new token
                const newToken = await res.jwtSign(body);

                // Give a new refresh token
                const newRefreshToken = await res.jwtSign(
                    { ...body, id: randomUUID() } as JwtRefreshBody,
                    {
                        expiresIn: app.config.JWT_REFRESH_EXPIRY,
                    }
                );

                res.setCookie("token", newToken, {
                    sameSite: "strict",
                    path: app.config.JWT_COOKIE_PATH,
                });

                res.setCookie("refreshToken", newRefreshToken, {
                    sameSite: "strict",
                    path: app.config.JWT_COOKIE_PATH,
                });

                return body;
            }
        };

        try {
            const body = await tryVerify();

            const userRepo = app.dataSource.getRepository(User);
            const user = await userRepo.findOneBy({ id: body.id });
            if (user === null) return res.unauthorized("User not found");

            req.userId = body.id;
            req.userEntity = user;
        } catch (err) {
            res.send(err);
        }
    });

    app.decorate("authenticateAsStudent", async (req, res) => {
        await app.authenticate(req, res);

        const courseEnrollment = await app.dataSource
            .createQueryBuilder()
            .select("course_enrollment")
            .from(CourseEnrollment, "course_enrollment")
            .leftJoin(
                "application_acceptance",
                "acceptance",
                "acceptance.id = course_enrollment.acceptanceId"
            )
            .leftJoin(
                "application",
                "application",
                "application.acceptanceId = acceptance.id"
            )
            .leftJoinAndSelect(
                "course_enrollment.group",
                "group",
                "group.id = course_enrollment.groupId"
            )
            .where("application.userId = :userId", { userId: req.userId })
            .getOne();

        if (courseEnrollment === null)
            return res.unauthorized("Unauthorized: not a student");

        req.userCourse = courseEnrollment;
    });

    app.decorate("authenticateAsTeacher", async (req, res) => {
        await app.authenticate(req, res);
        const teacher = await app.dataSource
            .getRepository(Teacher)
            .findBy({ user: { id: req.userId } });

        if (teacher === null)
            return res.unauthorized("Unauthorized: not an admin");
    });

    app.decorate("authenticateAsAdmin", async (req, res) => {
        await app.authenticate(req, res);
        if (!req.userEntity.isAdmin)
            return res.unauthorized("Unauthorized: not an admin");
    });
});

export default authenticatePlugin;
