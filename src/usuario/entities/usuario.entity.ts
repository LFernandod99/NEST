import { IsNotEmpty, MinLength } from "class-validator";
import { postagem } from "src/postagem/entities/postagem.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity ({name: "tb_usuario"})
export class Usuario{
    @PrimaryGeneratedColumn()
    id: number

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    nome: string

    @IsNotEmpty()
    @Column({length: 255, nullable: false})
    usuario: string //e-mail

    @IsNotEmpty()
    @MinLength(8)
    @Column({length: 255, nullable: false})
    senha: string

    @Column({length: 5000})
    foto: string

    @OneToMany(() => postagem, (posratgem) => posratgem.Usuario)
    postagem: postagem[]

}