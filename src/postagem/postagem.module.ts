//gerencia as postagem
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { postagemController } from "./controller/postagem.controller";
import { postagem } from "./entities/postagem.entity";
import { PostagemService } from "./service/postagem.service";

@Module({
    imports: [TypeOrmModule.forFeature([postagem])],
    providers: [PostagemService],
    controllers: [postagemController],
    exports: [TypeOrmModule]
})
export class PostagemModule {}