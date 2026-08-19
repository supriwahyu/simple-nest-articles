import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Param,
  Delete
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { Public } from './dto/public-article.dto'
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

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(Number(id));
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(Number(id));
  }

  @Public()
  @Get()
  findAll() {
    return this.articlesService.findAll();
  }
}