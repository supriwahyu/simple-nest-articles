import { Module, Global } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
	imports: [
		PassportModule,
		JwtModule.register({
			secret: 'secretKey',
			signOptions: {
				expiresIn: '7d',
			}
		}),
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		JwtStrategy,
		PrismaService,
	],
	exports: [AuthService],
})
export class AuthModule {}
