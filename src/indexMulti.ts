import { startMultiServer } from "./server/multiServer.js";

startMultiServer();
process.on('SIGINT', () => {
    console.log(`Process ${process.pid} gracefully shutting down from SIGINT (Ctrl-C)`);
    process.kill(process.pid, 'SIGINT'); 
});
