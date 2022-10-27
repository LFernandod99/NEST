import { IsNotEmpty, isNotEmpty, MaxLength } from "class-validator";
import { Tema } from "src/tema/entities/tema.entity";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

// É a nossa mãe, sabe onde ta tudo...
@Entity({name: "tb_postagens"})
    export class postagem{
        @PrimaryGeneratedColumn()
        id: number
        @IsNotEmpty()
        @MaxLength(100)
        @Column({length: 100, nullable: false})
        titulo: string
        @Column({length: 1000, nullable: false})
        texto: string
        @UpdateDateColumn()
        data: Date
        @MaxLength(1000)
        @Column({length: 1000, nullable: false})
        descricao: string
        @ManyToOne(() => Tema, (tema) => tema.postagem,{
            onDelete: "CASCADE"
        })
        tema: Tema
        @ManyToOne(() => Usuario, (Usuario) => Usuario.postagem, {
            onDelete: "CASCADE"
        })
        Usuario: Usuario
    }