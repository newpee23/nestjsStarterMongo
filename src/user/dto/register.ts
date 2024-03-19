import { IsEmail, IsString } from "class-validator";

export class RegisterDto {
    @IsEmail()
    @IsString()
    readonly email: string;
    @IsString()
    readonly password: string;
    @IsString()
    readonly name: string;
    @IsString()
    readonly tel: string;
}
