import { Type } from "@sinclair/typebox";

export const EnvSchema = Type.Object({
    HOST: Type.String(),
    PORT: Type.Integer(),

    JWT_SECRET: Type.String(),
    JWT_EXPIRY: Type.String(),
    JWT_REFRESH_EXPIRY: Type.String(),
    JWT_COOKIE_PATH: Type.Optional(Type.String()),

    DB_HOST: Type.String(),
    DB_PORT: Type.Integer(),
    DB_USERNAME: Type.String(),
    DB_PASSWORD: Type.String(),
    DB_DATABASE: Type.String(),

    STORAGE_PATH: Type.String(),
    STORAGE_TMP_PATH: Type.Optional(Type.String()),
    // Set to true if STORAGE_TMP_PATH
    // is on the same partition as the STORAGE_PATH
    STORAGE_ATOMIC: Type.Boolean(),
});
