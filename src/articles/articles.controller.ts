import { Controller, Body, Get, Post } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';

@Controller('articles')
export class ArticlesController {
	constructor(private readonly articlesService: ArticlesService) {}

	@Post()
	create(@Body() dto: CreateArticleDto) {
		return this.articlesService.create(dto);
	}

	@Get()
	findAll() {
		return this.articlesService.findAll();
	}
}
