import bcrypt from "bcrypt";
import { FastifyPluginCallback } from "fastify";

import { randomUUID } from "node:crypto";

import { Type } from "@sinclair/typebox";

import { User } from "../../entities";
import {
    AuthenticateResponseSchema,
    JwtBody,
    JwtRefreshBody,
} from "../../plugins/authentication";
import { SensibleErrorSchema } from "../../schemas/sensible";
import { FastifyInstanceTypeBox } from "../../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    app.post(
        "/login",
        {
            schema: {
                description: "Log in",
                tags: ["auth"],
                body: Type.Object({
                    email: Type.String({ format: "email" }),
                    password: Type.String({ minLength: 1, maxLength: 70 - 8 }),
                }),
                response: {
                    200: Type.Object({}),
                    401: Type.Union([
                        Type.Ref<typeof AuthenticateResponseSchema>(
                            "AuthenticateResponseSchema"
                        ),
                        Type.Ref<typeof SensibleErrorSchema>(
                            "SensibleErrorSchema"
                        ),
                    ]),
                },
            },
        },
        async (req, res) => {
            const { email, password } = req.body;

            const userRepo = app.dataSource.getRepository(User);
            const user = await userRepo.findOneBy({ email });
            if (user === null)
                return res.unauthorized("Wrong email or password");

            const isValidPassword = await bcrypt.compare(
                password,
                user.passwordHash
            );

            if (!isValidPassword)
                return res.unauthorized("Wrong email or password");

            const [token, refreshToken] = await Promise.all([
                res.jwtSign({ id: user.id } as JwtBody),
                res.jwtSign(
                    { id: randomUUID(), userId: user.id } as JwtRefreshBody,
                    {
                        expiresIn: app.config.JWT_REFRESH_EXPIRY,
                    }
                ),
            ]);

            res.setCookie("token", token, {
                sameSite: "strict",
                path: app.config.JWT_COOKIE_PATH,
            });

            res.setCookie("refreshToken", refreshToken, {
                sameSite: "strict",
                path: app.config.JWT_COOKIE_PATH,
            });

            return {};
        }
    );

    done();
};

export default route;
