import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { Teacher } from "../entities";
import { AuthenticateResponseSchema } from "../plugins/authentication";
import { UserPrivateSchema } from "../schemas/user";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["users"];
    app.get(
        "/me",
        {
            schema: {
                tags: TAGS,
                description: "Gets info about current user",
                response: {
                    200: Type.Ref<typeof UserPrivateSchema>(
                        "UserPrivateSchema"
                    ),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                },
            },
            onRequest: (req, res) => app.authenticate(req, res),
        },
        async (req) => {
            const teacher = await app.dataSource
                .getRepository(Teacher)
                .findOneBy({ user: { id: req.userId } });

            return { ...req.userEntity, isTeacher: teacher !== null };
        }
    );

    done();
};

export default route;
