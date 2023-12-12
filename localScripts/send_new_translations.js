import fs from "fs";
import path from "path";

const content = [];
const phrases = {};

function readFiles(directory) {
    fs.readdirSync(directory).forEach(file => {
        const absolute = path.join(directory, file);
        if (fs.statSync(absolute).isDirectory()) return readFiles(absolute);
        const data = fs.readFileSync(absolute, {encoding: 'utf-8'});
        content.push(data);
    });
}
readFiles('src/PublicApp')

content.map(text => {
    const regex = /<T>([\S\s]*?)<\/T>/g;
    const result = text.matchAll(regex);
    for (const match of result) {
        phrases[match[1]] = 1;
    }
})

let currentTranslations = fs.readFileSync('public/translationsCache.json', {encoding: 'utf-8'});
currentTranslations = JSON.parse(currentTranslations);

Object.keys(phrases).map(phrase => {

    if (currentTranslations[phrase]) {
        return
    }
    fetch('http://localhost:8000/admin/create_phrase',  {method: "POST", body: JSON.stringify({phrase})})
})

