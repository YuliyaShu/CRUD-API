import dotenv from 'dotenv';
import { createServer } from 'node:http';
import process from 'node:process';
import { requestListener } from './requestListener.js';
import { cpus } from 'node:os';
import cluster from 'node:cluster';

dotenv.config();

const PORT = (process.env.STATUS?.trim() === 'production')
    ? process.env.PROD_PORT || 4001
    : process.env.DEV_PORT || 4000;
const numCPUs = cpus().length;

export const startMultiServer = () => {
    cluster.SCHED_RR;
    if (cluster.isPrimary) {
        
        console.log(`Primary ${process.pid} is running. Please, wait...`);
      
        for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
        }
      
        cluster.on('exit', (worker) => {
          console.log(`Worker ${worker.process.pid} died`);
        });
      } else {
        createServer(requestListener).listen(PORT, () => console.log(`Worker ${process.pid} started and is listening on ${PORT} port in ${process.env.STATUS} mode.`))
    }
} 
