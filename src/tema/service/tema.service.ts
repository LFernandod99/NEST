import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { postagem } from "src/postagem/entities/postagem.entity";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService{
    constructor(
        @InjectRepository(Tema)
        private TemaRepository: Repository<Tema>
    ) {}

    async findAll(): Promise<Tema[]> {
        return await this.TemaRepository.find({
            relations: {postagem:true}
        })
     }
     
    
    async findById(id: number): Promise<Tema>{
    let tema = await this.TemaRepository.findOne ({
    where:{
        id
    },
    relations: {
        postagem: true
    }
    
    })
    
    if (!tema)
    throw new HttpException ('postagem não existe', HttpStatus.NOT_FOUND)
    
    return tema
    
    }
    async create(tema:Tema): Promise<Tema> {
    return await this.TemaRepository.save(tema)
    }
    async update(tema: Tema): Promise<Tema> {
        let buscarTema =await this.findById(tema.id)
        if(!buscarTema|| !tema.id)
        throw new HttpException('Postagem não Existe',HttpStatus.NOT_FOUND)
    
        return await this.TemaRepository.save(tema)
    }
    
    async delete(id: number): Promise<DeleteResult>{
        let buscarTema = await this.findById(id)
    
        if(!buscarTema)
        throw new HttpException('postagem não emcontrada',HttpStatus.NOT_FOUND)
    
    return await this.TemaRepository.delete(id)
    }
    
    
    async findByDescricao(descricao: string): Promise<Tema[]> {
        return await this.TemaRepository.find({
            where: {
                descricao:ILike(`%${descricao} `)
            },
            relations:{
                postagem: true
            }
        })
     
    }
}