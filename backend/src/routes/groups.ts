import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { Group } from "../entities";
import { AuthenticateResponseSchema } from "../plugins/authentication";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["groups"];
    app.get(
        "/",
        {
            schema: {
                tags: TAGS,
                description: "Get all groups",
                response: {
                    200: Type.Array(
                        Type.Object({
                            id: Type.Integer(),
                            name: Type.String(),
                        })
                    ),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                },
            },
            onRequest: (req, res) => app.authenticateAsTeacher(req, res),
        },
        async () => {
            const groups = await app.dataSource.getRepository(Group).find();
            return groups;
        }
    );

    done();
};

export default route;
