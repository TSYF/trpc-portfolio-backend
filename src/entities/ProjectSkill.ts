import { Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Project } from "./Project";
import { Skill } from "./Skill";

@Entity("project_skill")
export class ProjectSkill {
    @PrimaryColumn("int")
    @OneToMany(() => Project, (project) => project.id)
    projectId!: number;
    @PrimaryColumn("int")
    @OneToMany(() => Skill, (skill) => skill.id)
    skillId!: number;
}