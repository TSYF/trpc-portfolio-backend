import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Project } from "./Project";

@Entity("skill")
export class Skill {
    @PrimaryGeneratedColumn()
    id?: number
    @Column("varchar")
    name!: string
    @Column("varchar")
    slug!: string
    @Column("varchar")
    subtitle!: string
    @Column("varchar")
    description?: string


    @ManyToMany(() => Project, project => project.skills)
    @JoinTable({
        name: "project_skill",
        joinColumn: { name: "skill_id", referencedColumnName: "id" },
        inverseJoinColumn: { name: "project_id", referencedColumnName: "id" },
    })
    projects?: Project[];
}

