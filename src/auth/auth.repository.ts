import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { User } from "./user.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SigninDto } from "./dto/signin-dto";
import { SignupDto } from "./dto/signup-dto";


@Injectable()
export class AuthRepository {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async createUser(user: SigninDto): Promise<User> {
        try {
            const addUser = this.userRepository.create(user);
            return await this.userRepository.save(addUser);
        } catch (error) {
            if (error.code === '23505') {
                throw new ConflictException('Email already exists');
            }
            throw new InternalServerErrorException(error.message);
        }
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findOne({ where: { email } });
    }

}