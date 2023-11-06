import { Api } from "./api"; 

export class AuthService {
    async login(email: string, password: string) {
        Api.login({email, password})
    }
}