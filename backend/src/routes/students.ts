import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { AuthenticateResponseSchema } from "../plugins/authentication";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["students"];
    app.get(
        "/me",
        {
            schema: {
                tags: TAGS,
                description: "Gets info about current student",
                response: {
                    200: Type.Object({
                        createdAt: Type.String({ format: "date-time" }),
                        group: Type.Object({
                            id: Type.Integer(),
                            name: Type.String(),
                        }),
                    }),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                },
            },
            onRequest: (req, res) => app.authenticateAsStudent(req, res),
        },
        async (req) => {
            return {
                ...req.userCourse,
                createdAt: req.userCourse.createdAt.toISOString(),
            };
        }
    );

    done();
};

export default route;
