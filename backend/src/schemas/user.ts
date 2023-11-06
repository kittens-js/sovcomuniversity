import { Type } from "@sinclair/typebox";

export const UserPublicSchema = Type.Object(
    {
        name: Type.String(),
        surname: Type.String(),
        middleName: Type.String(),
        isAdmin: Type.Boolean(),
        isTeacher: Type.Boolean(),
    },
    { $id: "UserPublicSchema" }
);

export const UserPrivateSchema = Type.Composite(
    [
        UserPublicSchema,
        Type.Object({
            email: Type.String({ format: "email" }),
        }),
    ],
    { $id: "UserPrivateSchema" }
);
