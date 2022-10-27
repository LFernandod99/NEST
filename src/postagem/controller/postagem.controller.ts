import{Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards} from "@nestjs/common"
import { JwtAuthGuard } from "src/auth/guard/jwt-auth.guard";
import { postagem } from "../entities/postagem.entity";
import { PostagemService } from "../service/postagem.service";

@UseGuards(JwtAuthGuard)
@Controller("/postagens")
export class postagemController{
    constructor(private readonly PostagemService:PostagemService) {}
@Get()
@HttpCode(HttpStatus.OK)
findAll(): Promise<postagem[]> {
    return this.PostagemService.findAll();
}
@Get('/:id')
@HttpCode(HttpStatus.OK)
        findById(@Param('id', ParseIntPipe)id: number): Promise<postagem>{
            return this.PostagemService.findById(id)
        }
@Post()
@HttpCode(HttpStatus.CREATED)
 create(@Body() postagem:postagem):Promise<postagem>{
    return this.PostagemService.create(postagem)
 }
@Put()
@HttpCode(HttpStatus.OK)
update(@Body()postagem: postagem): Promise<postagem>{
    return this.PostagemService.update(postagem)
}
@Delete('/:id')
@HttpCode(HttpStatus.NO_CONTENT)
delete(@Param('id', ParseIntPipe) id: number){
    return this.PostagemService.delete(id)
}

@Get('/descricao/:descricao')
@HttpCode(HttpStatus.OK)
findByDescricao(@Param('descricao')descricao:string): Promise<postagem[]>{
    return this.PostagemService.findByDescricao(descricao)


}
}