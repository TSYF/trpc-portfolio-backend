import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Skill } from "./Skill";

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id?: number;
    @Column("varchar")
    title!: string;
    @Column("varchar")
    image!: string;
    @Column("varchar")
    description!: string;
    @Column("varchar")
    link!: string;
    @Column("boolean")
    download!: boolean;

    @ManyToMany(() => Skill, skill => skill.projects)
    @JoinTable({
        name: "project_skill",
        joinColumn: { name: "project_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "skill_id", referencedColumnName: "id" },
    })
    skills?: Skill[];
}