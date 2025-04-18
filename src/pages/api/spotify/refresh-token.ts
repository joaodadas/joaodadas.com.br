import { type NextApiRequest, type NextApiResponse } from "next";
import querystring from "querystring";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token?: string;
}

interface SpotifyErrorResponse {
  error: string;
  error_description: string;
}

const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Verifica se é uma requisição POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

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
      body: querystring.stringify({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const data = (await response.json()) as
      | SpotifyTokenResponse
      | SpotifyErrorResponse;

    if (!response.ok) {
      if ("error_description" in data) {
        throw new Error(data.error_description);
      }
      throw new Error("Erro ao atualizar token");
    }

    // Se recebermos um novo refresh token, atualizamos a variável de ambiente
    if ("refresh_token" in data && data.refresh_token) {
      // Na Vercel, você pode atualizar as variáveis de ambiente usando a API deles
      // ou usando um serviço de configuração externo
      console.log("Novo refresh token recebido:", data.refresh_token);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Erro ao atualizar token:", error);
    return res.status(500).json({
      error: "Erro ao atualizar token",
      details: error instanceof Error ? error.message : "Erro desconhecido",
    });
  }
}
