import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { postagem } from "../entities/postagem.entity";

@Injectable()
export class PostagemService {
    postagemService: any;
    constructor(
        @InjectRepository(postagem)
        private postagemRepository : Repository<postagem>

     ) {}

 async findAll(): Promise<postagem[]> {
    return await this.postagemRepository.find()
 }

async findById(id: number): Promise<postagem>{
let postagem = await this.postagemRepository.findOne ({
where:{
    id
},
relations: {tema:true}

})

if (!postagem)
throw new HttpException ('postagem não existe', HttpStatus.NOT_FOUND)

return postagem

}
async create(postagem:postagem): Promise<postagem> {
return await this.postagemRepository.save(postagem)
}
async update(postagem: postagem): Promise<postagem> {
    let buscarPostagem =await this.findById(postagem.id)
    if(!buscarPostagem|| !postagem.id)
    throw new HttpException('Postagem não Existe',HttpStatus.NOT_FOUND)

    return await this.postagemRepository.save(postagem)
}

async delete(id: number): Promise<DeleteResult>{
    let buscarPostagem = await this.findById(id)

    if(!buscarPostagem)
    throw new HttpException('postagem não emcontrada',HttpStatus.NOT_FOUND)

return await this.postagemRepository.delete(id)
}


async findByDescricao(descricao: string): Promise<postagem[]> {
    return await this.postagemRepository.find({
        where: {
            titulo:ILike(`%${descricao} `)
        }
    })
 
}
}