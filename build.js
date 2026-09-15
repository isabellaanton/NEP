const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = "public";
const API_KEY = process.env.GOOGLE_MAPS_API_KEY;

if (!API_KEY) {
  console.error("ERRO: variável de ambiente GOOGLE_MAPS_API_KEY não encontrada.");
  process.exit(1);
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });

// Copia style.css e script.js sem alteração
fs.copyFileSync("style.css", path.join(OUTPUT_DIR, "style.css"));
fs.copyFileSync("script.js", path.join(OUTPUT_DIR, "script.js"));

// Substitui o placeholder pela chave real dentro do index.html
let html = fs.readFileSync("index.html", "utf8");
html = html.replace("__GOOGLE_MAPS_API_KEY__", API_KEY);
fs.writeFileSync(path.join(OUTPUT_DIR, "index.html"), html);

console.log("Build concluído: arquivos gerados em /public com a chave injetada.");
