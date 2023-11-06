import fastifyPlugin from "fastify-plugin";

import fastifyEnv from "@fastify/env";
import { Static } from "@sinclair/typebox";

import { EnvSchema } from "../schemas/env";

declare module "fastify" {
    interface FastifyInstance {
        config: Static<typeof EnvSchema>;
    }
}

type ConfigType = "dev" | "prod";
function configType(): ConfigType {
    const configType = process.env.CONFIG_TYPE;
    switch (configType) {
        case "prod":
            return "prod";
        case undefined:
        case "dev":
        default:
            return "dev";
    }
}

const envPlugin = fastifyPlugin(async function (app) {
    const envPath = configType() === "dev" ? ".env.dev" : ".env.prod";
    await app.register(fastifyEnv, {
        confKey: "config",
        schema: EnvSchema,
        dotenv: { path: envPath },
    });
});

export default envPlugin;
