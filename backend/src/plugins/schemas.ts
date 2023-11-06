import fastifyPlugin from "fastify-plugin";

import {
    SensibleErrorSchema,
    SpecialtySchema,
    UserPrivateSchema,
    UserPublicSchema,
} from "../schemas";

const schemaPlugin = fastifyPlugin(async function (app) {
    app.addSchema(SensibleErrorSchema);
    app.addSchema(SpecialtySchema);
    app.addSchema(UserPublicSchema);
    app.addSchema(UserPrivateSchema);
});

export default schemaPlugin;
