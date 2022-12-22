import { IncomingMessage, ServerResponse } from 'node:http';

export const requestListener = (req: IncomingMessage, res: ServerResponse) => {
    console.log("Url: " + req.url);
    console.log("Тип запроса: " + req.method);
    res.setHeader('Content-Type', 'text/html; charset=utf-8;');
    res.writeHead(200);
    res.write("<h2>hello world</h2>");
    res.end();
}
