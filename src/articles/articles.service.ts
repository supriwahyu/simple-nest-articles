import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) {}

	create(dto: CreateArticleDto) {
		return this.prisma.article.create({
			data: dto,
		});
	}

	findAll() {
		return this.prisma.article.findMany({
			orderBy: {
				createdAt: 'desc',
			}
		});
	}
}
