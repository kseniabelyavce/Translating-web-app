import fs from "fs";

const response = await fetch("http://localhost:8000/all_translations");
const translations = await response.json();
fs.writeFile('public/translationsCache.json', JSON.stringify(translations), () => console.log('done'));