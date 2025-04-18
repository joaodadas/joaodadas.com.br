/**
 * Script para verificar se as credenciais do Spotify são válidas
 *
 * Uso:
 * 1. Instale as dependências: npm install dotenv node-fetch
 * 2. Execute: node scripts/verify-spotify-credentials.js
 */

require("dotenv").config();
const fetch = require("node-fetch");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

if (!client_id || !client_secret) {
  console.error(
    "Erro: SPOTIFY_CLIENT_ID e SPOTIFY_CLIENT_SECRET devem estar definidos no arquivo .env"
  );
  process.exit(1);
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");

console.log("=== Verificação de Credenciais do Spotify ===");
console.log("Client ID:", client_id);
console.log("Client Secret:", client_secret ? "********" : "Não definido");
console.log("\nVerificando credenciais...");

// Tentar obter um token de acesso usando as credenciais do cliente
fetch("https://accounts.spotify.com/api/token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${basic}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({
    grant_type: "client_credentials",
  }),
})
  .then((response) => {
    if (!response.ok) {
      return response.text().then((text) => {
        throw new Error(
          `Erro na resposta: ${response.status} ${response.statusText} - ${text}`
        );
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log("\n✅ Credenciais válidas!");
    console.log("Token de acesso obtido com sucesso.");
    console.log("\nPróximos passos:");
    console.log(
      "1. Certifique-se de que o URI de redirecionamento está configurado no painel do desenvolvedor do Spotify:"
    );
    console.log("   https://joaodadas.com.br/api/spotify/callback");
    console.log(
      "2. Execute o script get-spotify-token.js para obter um token de atualização:"
    );
    console.log("   node scripts/get-spotify-token.js");
  })
  .catch((error) => {
    console.error("\n❌ Erro ao verificar credenciais:");
    console.error(error.message);
    console.log("\nPossíveis soluções:");
    console.log(
      "1. Verifique se o Client ID e Client Secret estão corretos no arquivo .env"
    );
    console.log(
      "2. Verifique se as credenciais não foram revogadas no painel do desenvolvedor do Spotify"
    );
    console.log(
      "3. Tente gerar novas credenciais no painel do desenvolvedor do Spotify"
    );
  });
