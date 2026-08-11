import express from "express";
import type { Express } from "express";

const app: Express = express();

const PORT: number = 8081;

app.listen(PORT, () => {
    console.log(` Servidor rodando em http://localhost:${PORT}`);
});