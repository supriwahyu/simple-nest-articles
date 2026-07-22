import { IsString, MinLength } from 'class-validator';

export class CreateArticleDto {
	@IsString()
	@MinLength(3)
	title: string;

	@IsString()
	@MinLength(3)
	slug: string;

	@IsString()
	@MinLength(10)
	content: string;
}