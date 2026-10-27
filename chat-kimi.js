import dotenv from "dotenv";
import OpenAI from "openai";
import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

// 1. Forçar o carregamento do .env a partir da raiz (onde o processo é executado)
dotenv.config();

// 2. Resgatar e validar a variável de ambiente exata
const apiKey = process.env.MOONSHOT_API_KEY;

if (!apiKey) {
  console.error("ERRO: A variável MOONSHOT_API_KEY não foi encontrada no arquivo .env.");
  console.error("Verifique se o arquivo se chama extamente '.env' e não '.env.txt'.");
  process.exit(1);
}

// 3. Validação segura: exibe apenas os primeiros e últimos 4 caracteres
const maskedKey = `${apiKey.slice(0, 4)}...${apiKey.slice(-4)}`;
console.log(`[OK] MOONSHOT_API_KEY carregada com sucesso: ${maskedKey}`);

// 4. Inicializar o cliente com a chave e baseURL corretos
const client = new OpenAI({
  apiKey: apiKey,
  baseURL: "https://api.moonshot.ai/v1",
});

const terminal = readline.createInterface({ input, output });

const messages = [
  {
    role: "system",
    content: `
Você é um desenvolvedor frontend trabalhando no projeto Olimpo.
O projeto usa React, Vite, Tailwind CSS e Motion.
Responda em português.
Não reescreva arquivos desnecessariamente.
Antes de alterar código, explique quais arquivos precisam mudar.
`,
  },
];

console.log("Conversa com Kimi iniciada. Digite 'sair' para encerrar.\n");

// 5. Encapsulando o top-level await numa função assíncrona auto-invocada (IIFE)
// para evitar problemas em versões do Node.js, ou apenas usando await no top-level 
// pois "type": "module" suporta Top-Level Await nativamente.
while (true) {
  const pergunta = await terminal.question("Você: ");

  if (pergunta.toLowerCase() === "sair") {
    break;
  }

  messages.push({
    role: "user",
    content: pergunta,
  });

  try {
    const response = await client.chat.completions.create({
      model: "kimi-k3",
      messages,
      max_tokens: 4000,
    });

    const resposta =
      response.choices[0]?.message?.content ??
      "O Kimi não retornou uma resposta.";

    console.log(`\nKimi: ${resposta}\n`);

    messages.push({
      role: "assistant",
      content: resposta,
    });
  } catch (error) {
    console.error("\nErro:", error.message, "\n");
  }
}

terminal.close();