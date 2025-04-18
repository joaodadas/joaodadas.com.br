/**
 * Script para verificar e renovar automaticamente o token do Spotify
 *
 * Uso:
 * 1. Instale as dependências: npm install dotenv node-fetch
 * 2. Execute: node scripts/auto-refresh-spotify-token.js
 *
 * Este script verifica se o token do Spotify está válido e, se necessário,
 * solicita uma renovação. Você pode configurar este script para ser executado
 * periodicamente usando um agendador de tarefas (cron, etc.).
 */

require("dotenv").config();
const fetch = require("node-fetch");
const fs = require("fs").promises;
const path = require("path");

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

async function updateEnvFile(newRefreshToken) {
  const envPath = path.join(process.cwd(), ".env");
  let envContent = await fs.readFile(envPath, "utf8");

  // Atualiza o refresh token no arquivo .env
  envContent = envContent.replace(
    /SPOTIFY_REFRESH_TOKEN=.*/,
    `SPOTIFY_REFRESH_TOKEN=${newRefreshToken}`
  );

  await fs.writeFile(envPath, envContent);
  console.log("✅ Arquivo .env atualizado com sucesso");
}

async function refreshToken() {
  try {
    if (!client_id || !client_secret || !refresh_token) {
      throw new Error("Credenciais do Spotify não configuradas");
    }

    const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || "Erro ao atualizar token");
    }

    // Se recebermos um novo refresh token, atualizamos o arquivo .env
    if (data.refresh_token) {
      await updateEnvFile(data.refresh_token);
    }

    console.log("✅ Token atualizado com sucesso");
    return data.access_token;
  } catch (error) {
    console.error("❌ Erro ao atualizar token:", error.message);
    throw error;
  }
}

// Executa a atualização do token
refreshToken().catch(console.error);
