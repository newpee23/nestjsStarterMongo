import { IsString } from "class-validator";

export class userLoginDto {
    @IsString()
    readonly userId: string;
    @IsString()
    readonly email: string;
}
