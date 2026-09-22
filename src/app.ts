// Importa a biblioteca Express
import express from "express";
import type { Express, Request, Response } from "express";

import fs from "fs";
// Importa a classe Player
import { Player } from "./models/player.js";

// Cria uma aplicação Express
const app: Express = express();

// Middleware para permitir que o servidor entenda JSON
app.use(express.json());

// Define a porta do servidor
const PORT: number = 8081;

// Define o nome do diretório onde os arquivos serão armazenados
const DATA_FILE = "./data/players.json";

/*
Função para garantir que o diretório de dados exista antes de salvar os arquivos.
Se o diretório não existir, ele será criado
*/
function ensureDataFolderExists() {
    const dataFolder = "./data";
    if (!fs.existsSync(dataFolder)) {
        fs.mkdirSync(dataFolder);
    }
}

// Chamar a função para garantir que o diretório de dados exista
// antes de qualquer operação de leitura ou escrita de arquivos
ensureDataFolderExists();

// Função para salvar os dados do player em um arquivo JSON
function savePlayerState(player: Player) {
    // Converte o objeto player em uma string JSON
    const data = JSON.stringify(player, null, 2);
    // Salva a string JSON no arquivo definido em DATA_FILE
    fs.writeFileSync(DATA_FILE, data, "utf-8");
}

// Função para carregar os dados do player de um arquivo JSON
function loadPLayerState(): Player {
    // Verifica se oo arquivo de dados existe
    if (fs.existsSync(DATA_FILE)) { 
    // Lê o conteúdo do arquivo e converte de volta para um objeto Player
    const data = fs.readFileSync(DATA_FILE, "utf-8");
    const playerData = JSON.parse(data);

    /* ATENÇÃO: JSON.parse() retorna um objeto "puro" (sem os métodos da classe Player)
    Para que o objeto tenha os métodos da classe Player, precisamos criar uma nova instância da
    classe Player e passar os dados carregados para o construtor.
    */
    return new Player(playerData.name, playerData.health, playerData.level);
    }
    // Cria um novo jogador se não existir chamado "Hero"
    // Nome: Hero | Vida: 100 | Nível: 5
    const newPlayer: Player = new Player("Hero", 100, 5);
    savePlayerState(newPlayer);
    return newPlayer;
}
// Inicializa o player carregando seu estado do arquivo JSON
let player1: Player = loadPLayerState();


// GET
// Quando o usuário acessa /player,
// o servidor retorna os dados do jogador
app.get("/player", (req: Request, res: Response) => {
    res.json({
        message: "Informações do Player",
        player: player1,
    });
});

// POST
// Faz o jogador atacar
app.post("/player/attack", (req: Request, res: Response) => {
    const attackMessage = player1.attack();

    res.json({
        message: attackMessage,
    });
});

// POST
// Faz o jogador receber dano
app.post("/player/damage", (req: Request, res: Response) => {
    const { damage } = req.body;

    const damageMessage = player1.takeDamage(damage);
    // Salvar o estado atual do player no arquivo JSON
    savePlayerState(player1);
    res.json({
        action: damageMessage,
        currentHealth: player1.health,
        currentLevel: player1.level,
    });
});

// Inicializa o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
    console.log("Rotas disponíveis:");
    console.log("GET /player - Obter informações do jogador");
    console.log("POST /player/attack - Jogador realiza um ataque");
    console.log("POST /player/damage - Jogador recebe dano");
});