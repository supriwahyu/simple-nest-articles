import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticlesService {
	constructor(private prisma: PrismaService) {}

	async create(dto: CreateArticleDto, userId: number) {
	  return this.prisma.article.create({
	    data: {
	      title: dto.title,
	      slug: dto.slug,
	      content: dto.content,
	      authorId: userId,
	    },
	  });
	}

	findAll() {
		return this.prisma.article.findMany({
			orderBy: {
				createdAt: 'desc',
			}
		});
	}

	findOne(id: number) {
		return this.prisma.article.findUnique({
			where: {
				id: id,
			}
		})
	}

	async remove(id: number) {
		const article = await this.prisma.article.findUnique({
			where: { id }
		});

		if (!article) {
			throw new NotFoundException('Article not found');
		}
		return this.prisma.article.delete({
			where: { id },
		});
	}
}
