export namespace Api {
    export type OkResponse = any;
    export type ErrResponse = {
        statusCode: number;
        code?: string;
        error: string;
        message: string;
    };

    class _Response<TResponse extends OkResponse> {
        constructor(public readonly data: TResponse | ErrResponse) {}
    }

    export class Ok<TResponse extends OkResponse> extends _Response<TResponse> {
        constructor(public readonly data: TResponse) {
            super(data);
        }

        readonly isOk = true;
        readonly isErr = false;
    }

    export class Err<
        TResponse extends OkResponse,
    > extends _Response<TResponse> {
        constructor(public readonly data: ErrResponse) {
            super(data);
        }

        readonly isOk = false;
        readonly isErr = true;
    }

    export type Response<TResponse extends OkResponse> =
        | Ok<TResponse>
        | Err<TResponse>;

    type RequestOptions = {
        opts?: RequestInit;
        querystring?: Record<string, string>;
        json?: any;
        ignore401?: boolean;
    };

    const API_BASE_URL = `${window.location.origin}/api`;
    async function fetchApi<TResponse extends OkResponse = void>(
        route: string,
        opts?: RequestOptions
    ): Promise<Response<TResponse>> {
        let fetchOpts: RequestInit = {
            credentials: "same-origin",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        };

        let searchParamsStr = "";
        if (opts !== undefined) {
            if (opts.opts !== undefined)
                fetchOpts = { ...fetchOpts, ...opts.opts };

            if (opts.json !== undefined)
                fetchOpts.body = JSON.stringify(opts.json);

            if (opts.querystring !== undefined) {
                const searchParams = new URLSearchParams(opts.querystring);
                searchParamsStr = `?${searchParams}`;
            }
        }

        const resp = await fetch(
            API_BASE_URL + route + searchParamsStr,
            fetchOpts
        );

        let respData: any;
        try {
            respData = await resp.json();
        } catch (err) {
            respData = {};
        }

        if (resp.ok) return new Ok<TResponse>(respData);

        return new Err<TResponse>(respData);
    }

    export async function login(data: { email: string; password: string }) {
        return await fetchApi("/auth/login", {
            opts: { method: "POST" },
            json: data,
        });
    }

    export namespace Users {
        interface IUser {
            name: string;
            email: string;
            surname: string;
            middleName: string;
            isAdmin: boolean;
            isTeacher: boolean;
        }

        export async function me() {
            return await fetchApi<IUser>("/users/me");
        }
    }

    export namespace Specialties {
        interface ISpecialty {
            id: number;
            name: string;
        }

        export async function getSpec() {
            return await fetchApi<ISpecialty[]>("/specialties");
        }
    }

    export namespace Students {
        interface IStudent {
            createdAt: string;
            group: {
                id: number;
                name: string;
            };
        }

        export async function me() {
            return await fetchApi<IStudent>("/students/me");
        }
    }

    export namespace Applications {
        interface IApplication {
            motivationalLetter: string;
            experienceInYears: number;
            achievements: string;
            currentPosition: string;
            specialtyId: number;
        }
        export async function sendApplication(data: IApplication) {
            return await fetchApi<IApplication>("/applications", {
                opts: { method: "POST" },
                json: data,
            });
        }
    }

    export namespace Groups {
        export interface IGroup {
            id: number;
            name: string;
        }
        
        interface IAssigment {
            id: number;
            createdAt: string;
            text: string;
            attachments: string[]
        }

        export async function get() {
            return await fetchApi<IGroup[]>('/groups')
        }

        export async function getTask(id: number) {
            return await fetchApi<IAssigment[]>('/assignments', {
                querystring: {
                    groupId: id.toString()
                }
            })
        }
    }
}
