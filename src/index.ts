import "reflect-metadata"
import { createHTTPHandler } from '@trpc/server/adapters/standalone'
import http from "http"
import dotenv from 'dotenv'
import router from './router'

dotenv.config({ path: [".env.production.local", ".env.local", ".env.development.local", ".env.development", ".env"] })

const handler = createHTTPHandler({
    router: router,
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

export type AppRouter = typeof router