import { FastifyPluginCallback } from "fastify";

import { Type } from "@sinclair/typebox";

import { Application, Specialty } from "../entities";
import { AuthenticateResponseSchema } from "../plugins/authentication";
import { SensibleErrorSchema } from "../schemas/sensible";
import { FastifyInstanceTypeBox } from "../utils";

const route: FastifyPluginCallback = (
    app: FastifyInstanceTypeBox,
    _opts,
    done
) => {
    const TAGS = ["applications", "applicant"];
    app.post(
        "/",
        {
            schema: {
                description: "Create an application",
                tags: TAGS,
                body: Type.Object({
                    motivationalLetter: Type.String({ maxLength: 500 }),
                    experienceInYears: Type.Integer({ minimum: 0 }),
                    achievements: Type.String({ maxLength: 256 }),
                    currentPosition: Type.String({ maxLength: 30 }),
                    specialtyId: Type.Integer({ minimum: 0 }),
                }),
                response: {
                    200: Type.Object({ id: Type.Integer() }),
                    401: Type.Ref<typeof AuthenticateResponseSchema>(
                        "AuthenticateResponseSchema"
                    ),
                    404: Type.Ref<typeof SensibleErrorSchema>(
                        "SensibleErrorSchema",
                        { description: "Specialty not found" }
                    ),
                },
            },
            onRequest: (req, res) => app.authenticate(req, res),
        },
        async (req, res) => {
            const {
                motivationalLetter,
                experienceInYears,
                achievements,
                currentPosition,
                specialtyId,
            } = req.body;

            const specialtyRepo = app.dataSource.getRepository(Specialty);
            const specialty = await specialtyRepo.findOneBy({
                id: specialtyId,
            });
            if (specialty === null) return res.notFound("Specialty not found");

            const applicationRepo = app.dataSource.getRepository(Application);
            const application = applicationRepo.create({
                user: req.userEntity,
                motivationalLetter,
                experienceInYears,
                achievements,
                currentPosition,
                specialty,
            });

            await applicationRepo.save(application);

            return { id: application.id };
        }
    );

    done();
};

export default route;
