import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags('Articles')
@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(
    @Body() dto: CreateArticleDto,
    @CurrentUser() user: any,
  ) {
    return this.articlesService.create(dto, user.sub);
  }

  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
}