import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { Group } from "../entities";
import { Assignment } from "../entities/Assignment";
import { AuthenticateResponseSchema } from "../plugins/authentication";
import { SensibleErrorSchema } from "../schemas";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["assignments"];
    app.get(
        "/",
        {
            schema: {
                tags: TAGS,
                description: "Get all assignments for a group",
                querystring: Type.Object({
                    groupId: Type.Integer({ minimum: 0 }),
                }),
                response: {
                    200: Type.Array(
                        Type.Object({
                            id: Type.Integer({ minimum: 0 }),
                            createdAt: Type.String({ format: "date-time" }),
                            text: Type.String(),
                            attachments: Type.Array(
                                Type.String({ pattern: "[a-f0-9]{64}" })
                            ),
                        })
                    ),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                    404: Type.Ref<typeof SensibleErrorSchema>(
                        "SensibleErrorSchema",
                        { description: "Group not found" }
                    ),
                },
            },
            onRequest: (req, res) => app.authenticate(req, res),
        },
        async (req, res) => {
            const { groupId } = req.query;

            const groupRepo = app.dataSource.getRepository(Group);
            const group = await groupRepo.findOneBy({ id: groupId });
            if (group === null) return res.notFound("Group not found");

            const assignmentRepo = app.dataSource.getRepository(Assignment);
            const assignments = await assignmentRepo.find({
                relations: { attachments: {} },
                where: { group },
            });

            return assignments.map((assignment) => ({
                ...assignment,
                createdAt: assignment.createdAt.toISOString(),
                attachments: assignment.attachments.map(
                    (attachment) => attachment.hash
                ),
            }));
        }
    );

    done();
};

export default route;
