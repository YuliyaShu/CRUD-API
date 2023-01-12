import { PORT, startServer } from "./server/server.js";

const port = PORT();
startServer(port);
process.on('SIGINT', () => {
    console.log('Gracefully shutting down from SIGINT (Ctrl-C)');
    process.exit();
})
