import { Injectable,  BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(private prisma: PrismaService, private jwtService: JwtService) {}

	async register(dto: RegisterDto) {
		const exists = await this.prisma.user.findUnique({
			where: { email: dto?.email },
		});

		if (exists) {
			throw new BadRequestException('Email already exists.');
		}

		const password = await bcrypt.hash(dto.password, 10);

		const user = await this.prisma.user.create({
			data: {
				name: dto.name,
				email: dto.email,
				password,
			}
		});

		return {
			messege: 'Register success',
			user,
		}
	}

	async login(dto: LoginDto) {
		const user = await this.prisma.user.findUnique({
			where: { email: dto.email }
		});

		if (!user) {
			throw new UnauthorizedException();
		}

		const match = await bcrypt.compare(
			dto.password,
			user.password
		);

		if (!match) {
			throw new UnauthorizedException();
		}

		const pasyload = {
			sub: user.id,
			email: user.email,
		}

		return {
			access_token: await this.jwtService.signAsync(pasyload),
		}
	}
}
