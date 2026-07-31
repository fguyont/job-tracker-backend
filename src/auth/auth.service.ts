import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AuthService {

    constructor(private readonly jwtService: JwtService, private readonly prisma: PrismaService) { }

    async register(registerDto: RegisterDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: { email: registerDto.email },
        });

        if (existingUser) {
            throw new ConflictException("A user using this email is already registered");
        }

        const hashedPassword = await bcrypt.hash(registerDto.password, 10); // a 10 time hashing
        const userToRegister = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                password: hashedPassword
            },
        });
        return {
            id: userToRegister.id,
            email: userToRegister.email,
            password: '**********',
            createdAt: userToRegister.createdAt,
            updatedAt: userToRegister.updatedAt
        };
    }


    async login(loginDto: LoginDto) {

        const existingUser = await this.prisma.user.findUnique({
            where: { email: loginDto.email }
        });
        let isPasswordValid = false;
        if (existingUser) {
            isPasswordValid = await bcrypt.compare(loginDto.password, existingUser.password);
        }

        if (!existingUser || isPasswordValid == false) { // The goal is not giving clues about login failure
            throw new UnauthorizedException('Logging-in impossible');
        }

        return this.generateToken(existingUser.id, existingUser.email);
    }

    private generateToken(userId: string, email: string) {
        const payload = { sub: userId, email };
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}