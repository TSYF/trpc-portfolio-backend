import { z } from 'zod'
import { procedure, router } from './trpc'
import { ds } from './db'
import { Project } from './entities/Project'
import { Skill } from './entities/Skill'
import { parse as yamlParse } from "yaml"
import configuration from "./parsers/configuration"
import fs from 'fs'


const projectRepo      = ds.getRepository(Project)
const skillRepo        = ds.getRepository(Skill)

export default router({
    readSiteConfig: procedure.output(configuration).query(() => yamlParse(fs.readFileSync("./src/config.yml", "utf-8")) as z.infer<typeof configuration>),
    health: procedure.query(() => {
        return "OK"
    }),
    readProjects: procedure.query(async () => {
        try {
            const projects = await projectRepo.find();
    
            return projects
        } catch (err) {
            console.error(err)
        }
    }),
    readProject: procedure.input(
        z.number()
    ).query(async (opts) => {
        const { input: id } = opts
        try {
            const project = await projectRepo.findOneBy({ id })
            
            return project
        } catch (err) {
            console.error(err);
        }
    }),
    readSkills: procedure.query(async () => {
        try {
            return skillRepo.find()
        } catch (err) {
            console.error(err);
        }
    }),
    readSkillsWithProjects: procedure.query(async () => {
        try {
            const data = skillRepo.createQueryBuilder("skill")
                            .leftJoinAndSelect("skill.projects", "project")
                            .getMany()
            return data
        } catch (err) {
            console.error(err);
        }
    })
})