import "reflect-metadata"
import { z } from 'zod'
import { procedure, router } from './trpc'
import { ds } from './db'
import { Project } from './entities/Project'
import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import { Skill } from './entities/Skill'
import http from "http"
import dotenv from 'dotenv'
dotenv.config({ path: [".env.production.local", ".env.local", ".env.development.local", ".env.development", ".env"] })

// const projectParser = z.object({
//     id: z.bigint().optional(),
//     title: z.string(),
//     subtitle: z.string(),
//     text: z.string(),
//     image: z.string(),
//     description: z.string(),
//     link: z.string(),
//     download: z.boolean(),
// })

const projectRepo      = ds.getRepository(Project)
const skillRepo        = ds.getRepository(Skill)

const appRouter = router({
    readProjects: procedure.query(async () => {
        console.log("=== readProjects ===");
        try {
            const projects = await projectRepo.find();
    
            console.log("=== END readProjects ===");
            return projects
        } catch (err) {
            console.error(err)
        }
    }),
    readProject: procedure.input(
        z.number()
    ).query(async (opts) => {
        console.log("=== readProject ===");
        const { input: id } = opts
        try {
            const project = await projectRepo.findOneBy({ id })
            
            console.log("=== END readProject ===");
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

const handler = createHTTPHandler({
    router: appRouter,
});

const { ALLOWED_ORIGIN, DEPLOYMENT_HOST, DEPLOYMENT_PORT } = process.env

const server = http.createServer((req, res) => {
    
    res.setHeader('Access-Control-Allow-Origin', ALLOWED_ORIGIN!)
    res.setHeader('Access-Control-Request-Method', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if (req.method === 'OPTIONS') {
        res.writeHead(200);
        res.end();
        return;
    }
    handler(req, res)
})

console.log(DEPLOYMENT_HOST);
server.listen({
    host: DEPLOYMENT_HOST,
    port: DEPLOYMENT_PORT,
})

export type AppRouter = typeof appRouter