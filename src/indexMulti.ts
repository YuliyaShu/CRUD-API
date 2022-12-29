import { startMultiServer } from "./server/multiServer.js";

try {
    startMultiServer();
} catch (error) {
    console.log('Something went wrong. Try one more time');
    console.error(error);
}
