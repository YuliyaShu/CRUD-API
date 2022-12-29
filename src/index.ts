import { startServer } from "./server/server.js";

try {
    startServer();
} catch (error) {
    console.log('Something went wrong. Try one more time');
    console.error(error);
}
