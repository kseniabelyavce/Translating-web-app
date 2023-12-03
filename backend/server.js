import TranslateLib from "./TranslateLib.js";
import * as http from "http";

http.createServer(async (request, response) => {
    response.setHeader("Content-Type", "application/json");
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type, x-requested-with, authorization");
    if (request.method === 'OPTIONS') {
        return sendResponse(response)
    }

    const body = await readFullBody(request);
    let result
    switch (request.url) {
        case "/translate":
            const {phrase} = body
            result = await TranslateLib.getTranslation(phrase);
            sendResponse(response, result);
            break;
        case "/all_translations":
            result = await TranslateLib.getAllTranslations();
            sendResponse(response, result);
            break;

    }
}).listen(8000, 'localhost', () => {
    console.log(`Server is running on http://localhost:8000`);
});


function sendResponse(response, body={}, code=200) {
    response.writeHead(code);
    response.write(JSON.stringify(body));
    return response.end();
}

//Body is reading in chunks
function readFullBody(request) {

    return new Promise((resolve, reject) => {
        let body = [];

        request
            .on('data', chunk => {
                body.push(chunk);
            })
            .on('end', () => {
                body = Buffer.concat(body).toString();
                if (body.length) {
                    resolve(JSON.parse(body));
                } else {
                    resolve({})
                }

            });
    });

}