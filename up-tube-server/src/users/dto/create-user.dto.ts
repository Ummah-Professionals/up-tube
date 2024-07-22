//import { isString, IsNotEmpty } from "class-validator";

export class CreateUserDto {
    id: string;

    username: string;

    profile_pic_path: string;
}