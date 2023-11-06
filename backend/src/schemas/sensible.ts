import { Type } from "@sinclair/typebox";

export const SensibleErrorSchema = Type.Object(
    {
        statusCode: Type.Integer(),
        error: Type.String(),
        message: Type.String(),
    },
    {
        $id: "SensibleErrorSchema",
    }
);
