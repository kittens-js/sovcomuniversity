import { Type } from "@sinclair/typebox";

export const SpecialtySchema = Type.Object(
    {
        id: Type.Integer({ minimum: 0 }),
        name: Type.String({ maxLength: 40 }),
    },
    { $id: "SpecialtySchema" }
);
