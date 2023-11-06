import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { Specialty } from "../entities";
import { AuthenticateResponseSchema } from "../plugins/authentication";
import { SensibleErrorSchema, SpecialtySchema } from "../schemas";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["specialties"];
    app.post(
        "/",
        {
            schema: {
                description: "Create an specialty",
                tags: [...TAGS, "admin"],
                body: Type.Object({
                    name: Type.String({ minLength: 1, maxLength: 40 }),
                }),
                response: {
                    200: Type.Ref<typeof SpecialtySchema>("SpecialtySchema"),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                    409: Type.Ref<typeof SensibleErrorSchema>(
                        "SensibleErrorSchema",
                        { description: "This specialty already exists" }
                    ),
                },
            },
            onRequest: (req, res) => app.authenticateAsAdmin(req, res),
        },
        async (req, res) => {
            const { name } = req.body;

            const specialtyRepo = app.dataSource.getRepository(Specialty);
            const specialty = specialtyRepo.create({
                name,
            });

            try {
                await specialtyRepo.save(specialty);
            } catch (err) {
                if ((err as Error).message.includes("already exists"))
                    return res.conflict("This specialty already exists");

                throw err;
            }

            return specialty;
        }
    );

    app.get(
        "/",
        {
            schema: {
                description: "Get specialties",
                tags: TAGS,
                response: {
                    200: Type.Array(
                        Type.Ref<typeof SpecialtySchema>("SpecialtySchema")
                    ),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                },
            },
            onRequest: (req, res) => app.authenticate(req, res),
        },
        async () => {
            const specialtyRepo = app.dataSource.getRepository(Specialty);
            return await specialtyRepo.find();
        }
    );

    done();
};

export default route;
