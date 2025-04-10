import { DataSource } from "../dataSource/dataSource";

export class UserService{
    userService: DataSource;

    constructor() {
        this.userService = new DataSource();
    }

    register(user: { email: string; password: string; name: string; lastname: string }){
        return this.userService.addUser(user)
    }
}