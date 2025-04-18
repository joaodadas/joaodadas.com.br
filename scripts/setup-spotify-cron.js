/**
 * Script para configurar um agendador de tarefas (cron) para verificar e renovar o token do Spotify
 *
 * Uso:
 * 1. Instale as dependências: npm install dotenv node-cron
 * 2. Execute: node scripts/setup-spotify-cron.js
 *
 * Este script configura um agendador de tarefas para verificar e renovar o token do Spotify
 * automaticamente a cada 12 horas. Você pode ajustar o intervalo conforme necessário.
 */

require("dotenv").config();
const cron = require("node-cron");
const { exec } = require("child_process");
const path = require("path");

// Verifica se o refresh token está configurado
if (!process.env.SPOTIFY_REFRESH_TOKEN) {
  console.error(
    "❌ SPOTIFY_REFRESH_TOKEN não está configurado no arquivo .env"
  );
  process.exit(1);
}

// Agenda a verificação do token a cada 12 horas
cron.schedule("0 */12 * * *", async () => {
  console.log("🔄 Executando verificação do token do Spotify...");

  try {
    // Executa o script de atualização do token
    const scriptPath = path.join(__dirname, "auto-refresh-spotify-token.js");
    exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("❌ Erro ao executar script:", error);
        return;
      }
      console.log("✅ Script executado com sucesso:");
      console.log(stdout);
      if (stderr) console.error("⚠️ Avisos:", stderr);
    });
  } catch (error) {
    console.error("❌ Erro ao executar cron job:", error);
  }
});

console.log("✅ Cron job configurado com sucesso");
console.log("🕒 O token será verificado a cada 12 horas");

// Manter o processo em execução
process.stdin.resume();
