// A palavra "class" define que estamos criando um molde.
// A palavra "export" permite que esse arquivo seja usado por outros arquivos (como o app.ts)

// Substatntivos ou Adjetivos
export class Player {
    public name: string; // O nome do jogador (texto)
    public health: number; // A saúde do jogador (número)
    public level: number; // O nível do jogador (número)
    
    // Contrutores (O contrutor é um método especial que é executado automaticamente quando a classe é instanciada uma única vez)
    constructor(name: string, health: number = 100, level: number = 1) {
        // A palavra "this" faz referêmcia a própria classe, ou seja: Pegue o atributo "name" da classe Player e atribua o valor do parâmetro "name" a ele
        this.name = name;
        this.health = health;
        this.level = level;

    }

    // Métodos (Comportamentos da classe)
    // Verbos
    // Métodos são as "funções" que a classe pode executar, ou seja, são os comportamentos da classe.
    // O método "attack" é um método que retorna uma string.
    public attack(): string {
        const damage = this.level * 10; // Calcula o dano baseado no nível do jogador
        return `${this.name} atacou e causou ${damage} de dano!`;
    }

    // O método "takeDamage" é um étodo que recebe um número com parâmetro e não retorna nada (void).
    public takeDamage(amount: number): string {
        this.health = amount // Reduz a saúde do jogador pelo valor do parêmetro
        if (this.health < 0) {
            this.health = 0; // Garante que a saúde não fique negativa
            return `${this.name} doi derrotado!`;
        }
        
        return `${this.name} receber ${amount} de dano e agora tem ${this.health} de saúde.`;
    }

}