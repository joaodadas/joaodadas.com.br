require("dotenv").config();
const fetch = require("node-fetch");

async function testRefreshToken() {
  try {
    console.log("Testando renovação do token...");

    const response = await fetch(
      "http://localhost:3000/api/spotify/refresh-token",
      {
        method: "POST",
      }
    );

    const data = await response.json();

    if (response.ok) {
      console.log("Token renovado com sucesso!");
      console.log("Tempo de expiração:", data.expires_in, "segundos");
    } else {
      console.error("Erro ao renovar token:", data.error);
      if (data.details) {
        console.error("Detalhes:", data.details);
      }
    }
  } catch (error) {
    console.error("Erro ao executar o teste:", error);
  }
}

testRefreshToken();
