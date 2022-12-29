import dotenv from 'dotenv';
import { createServer } from 'node:http';
import process from 'node:process';
import { requestListener } from './requestListener.js';
import { cpus } from 'node:os';
import cluster from 'node:cluster';

dotenv.config();

const PORT = Number(process.env.DEV_PORT) || 4000;
const numCPUs = cpus().length;

export const startMultiServer = () => {
    cluster.SCHED_RR;
    if (cluster.isPrimary) {
        createServer(requestListener).listen(PORT, () => console.log(`Primary ${process.pid} is running on ${PORT} port. Please, wait...`));
      
        for (let i = 0; i < numCPUs; i++) {
          const workerPORT = PORT + i +1;
          cluster.fork({PORT: workerPORT});
          process.env.PORT = workerPORT.toString();
        }
      
        cluster.on('exit', (worker) => {
          console.log(`Worker ${worker.process.pid} died`);
        });
      } else {
        createServer(requestListener).listen(Number(process.env.PORT), () => console.log(`Worker ${process.pid} started and is listening on ${process.env.PORT} port in ${process.env.STATUS} mode.`))
    }
} 
