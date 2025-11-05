import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { User } from "./user.entity";
import * as dotenv from 'dotenv';
import { AuthRepository } from "./auth.repository";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET as string,
        });
    }

    async validate(payload: any): Promise<User> {
        const user = await this.userRepository.findOne({ where: { email: payload.email } });
        if (!user) {
            throw new UnauthorizedException('Invalid token');
        }
        return user;
    }

   
}