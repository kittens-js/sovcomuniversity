import fastify, { FastifyInstance } from "fastify";

import fastifyCookie from "@fastify/cookie";
import fastifyJwt from "@fastify/jwt";
import { ajvFilePlugin, fastifyMultipart } from "@fastify/multipart";
import fastifySensible from "@fastify/sensible";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";

import {
    AdmissionCommitee,
    CourseEnrollment,
    File,
    Group,
    Homework,
    LearningMaterial,
    News,
    RefreshToken,
    Specialty,
    Teacher,
    TimeTable,
    User,
} from "./entities";
import {
    Application,
    ApplicationAcceptance,
    ApplicationRejection,
} from "./entities/Application";
import { Assignment } from "./entities/Assignment";
import authenticatePlugin from "./plugins/authentication";
import envPlugin from "./plugins/env";
import schemaPlugin from "./plugins/schemas";
import typeOrmPlugin from "./plugins/typeorm";
import * as routes from "./routes";
import { EnvSchema } from "./schemas/env";

async function main() {
    const app: FastifyInstance = fastify({
        logger: true,
        ajv: {
            plugins: [ajvFilePlugin],
        },
    });

    // Register plugins
    await app.register(fastifySwagger, {
        swagger: {
            consumes: ["application/json"],
            produces: ["application/json"],
        },
    });

    app.register(fastifySwaggerUi, {
        routePrefix: "/docs",
    });

    app.register(fastifyMultipart, {
        // attachFieldsToBody: true,
        limits: { files: 1 },
    });

    await app.register(envPlugin, {
        confKey: "config",
        schema: EnvSchema,
        dotenv: true,
    });

    app.register(authenticatePlugin);
    app.register(schemaPlugin);

    app.register(fastifyJwt, {
        secret: app.config.JWT_SECRET,
        sign: {
            expiresIn: app.config.JWT_EXPIRY,
        },
        cookie: {
            cookieName: "token",
            signed: false,
        },
    });

    app.register(fastifyCookie);
    app.register(fastifySensible);
    await app.register(typeOrmPlugin, {
        host: app.config.DB_HOST,
        port: app.config.DB_PORT,
        username: app.config.DB_USERNAME,
        password: app.config.DB_PASSWORD,
        database: app.config.DB_DATABASE,
        entities: [
            AdmissionCommitee,
            Application,
            ApplicationAcceptance,
            ApplicationRejection,
            Assignment,
            CourseEnrollment,
            File,
            Group,
            Homework,
            LearningMaterial,
            News,
            RefreshToken,
            Specialty,
            Teacher,
            TimeTable,
            User,
        ],
    });

    // Register routes
    app.register(routes.login, { prefix: "/auth" });
    app.register(routes.applications, { prefix: "/applications" });
    app.register(routes.specialties, { prefix: "/specialties" });
    app.register(routes.users, { prefix: "/users" });
    app.register(routes.students, { prefix: "/students" });
    app.register(routes.groups, { prefix: "/groups" });
    app.register(routes.files, { prefix: "/files" });
    app.register(routes.assignments, { prefix: "/assignments" });

    // Start the app
    try {
        await app.listen({ host: app.config.HOST, port: app.config.PORT });
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
}

main();
