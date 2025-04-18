/**
 * Script para obter um novo token de atualização do Spotify
 *
 * Uso:
 * 1. Instale as dependências: npm install dotenv node-fetch
 * 2. Execute: node scripts/get-spotify-token.js
 */

require("dotenv").config();
const fetch = require("node-fetch");
const readline = require("readline");
const fs = require("fs");
const path = require("path");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!client_id || !client_secret) {
  console.error(
    "Erro: SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET devem estar definidos no arquivo .env"
  );
  process.exit(1);
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

console.log("=== Obtenção de Token do Spotify ===");
console.log("IMPORTANTE: Antes de continuar, certifique-se de que:");
console.log(
  "1. Você configurou o URI de redirecionamento no painel do desenvolvedor do Spotify"
);
console.log(
  "2. O URI de redirecionamento configurado é: https://joaodadas.com.br/api/spotify/callback"
);
console.log("\n1. Acesse a URL abaixo no seu navegador:");
console.log(
  `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=https://joaodadas.com.br/api/spotify/callback&scope=user-read-currently-playing%20user-read-recently-played`
);
console.log(
  "\n2. Após autorizar, você será redirecionado para uma URL com um código."
);
console.log('3. Copie o código da URL (parâmetro "code=") e cole abaixo:');

rl.question("Código de autorização: ", async (code) => {
  try {
    console.log("\nObtendo token de atualização...");

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: "https://joaodadas.com.br/api/spotify/callback",
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erro ao obter token:", errorText);
      rl.close();
      return;
    }

    const data = await response.json();

    console.log("\n=== Tokens obtidos com sucesso ===");
    console.log("Access Token:", data.access_token);
    console.log("Refresh Token:", data.refresh_token);
    console.log("\nAtualize o arquivo .env com o novo refresh_token:");
    console.log(`SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`);

    // Perguntar se deseja atualizar o arquivo .env automaticamente
    rl.question(
      "\nDeseja atualizar o arquivo .env automaticamente? (s/n): ",
      (answer) => {
        if (answer.toLowerCase() === "s") {
          const envPath = path.resolve(process.cwd(), ".env");
          let envContent = fs.readFileSync(envPath, "utf8");

          // Atualizar o refresh_token no arquivo .env
          envContent = envContent.replace(
            /SPOTIFY_REFRESH_TOKEN=.*/,
            `SPOTIFY_REFRESH_TOKEN=${data.refresh_token}`
          );

          fs.writeFileSync(envPath, envContent);
          console.log("Arquivo .env atualizado com sucesso!");
        }

        rl.close();
      }
    );
  } catch (error) {
    console.error("Erro:", error.message);
    rl.close();
  }
});
