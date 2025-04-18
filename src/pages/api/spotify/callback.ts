import { type NextApiRequest, type NextApiResponse } from "next";
import querystring from "querystring";
import fs from "fs";
import path from "path";

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
  refresh_token: string;
}

interface SpotifyErrorResponse {
  error: string;
  error_description: string;
}

const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const redirect_uri = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}/api/spotify/callback`
  : "http://127.0.0.1:3000/api/spotify/callback";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const code = req.query.code as string;
  const state = req.query.state as string;
  const error = req.query.error as string;

  // Verifica se houve erro na autorização
  if (error) {
    console.error("Erro na autorização:", error);
    return res.redirect("/?spotify=error&message=" + encodeURIComponent(error));
  }

  // Verifica se o código foi fornecido
  if (!code) {
    return res.redirect("/?spotify=error&message=code_missing");
  }

  try {
    if (!client_id || !client_secret) {
      throw new Error("Credenciais do Spotify não configuradas");
    }

    // Codifica as credenciais em base64
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString(
      "base64"
    );

    // Faz a requisição para obter o token
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: querystring.stringify({
        grant_type: "authorization_code",
        code,
        redirect_uri,
      }),
    });

    const data = (await response.json()) as
      | SpotifyTokenResponse
      | SpotifyErrorResponse;

    if (!response.ok) {
      if ("error_description" in data) {
        throw new Error(data.error_description);
      }
      throw new Error("Erro ao obter token");
    }

    // Verifica se recebemos um refresh token
    if ("refresh_token" in data && data.refresh_token) {
      // Atualiza o arquivo .env com o novo refresh token
      updateEnvFile(data.refresh_token);

      // Redireciona para a página inicial com uma mensagem de sucesso
      return res.redirect("/?spotify=success");
    } else {
      return res.redirect("/?spotify=error&message=no_refresh_token");
    }
  } catch (error) {
    console.error("Erro ao processar callback:", error);
    return res.redirect(
      "/?spotify=error&message=" +
        encodeURIComponent(
          error instanceof Error ? error.message : "Erro desconhecido"
        )
    );
  }
}

// Função para atualizar o arquivo .env com o novo refresh token
function updateEnvFile(refreshToken: string) {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    let envContent = fs.readFileSync(envPath, "utf8");

    // Substitui o valor atual do refresh token pelo novo
    envContent = envContent.replace(
      /SPOTIFY_REFRESH_TOKEN=.*/,
      `SPOTIFY_REFRESH_TOKEN=${refreshToken}`
    );

    // Escreve o conteúdo atualizado de volta no arquivo
    fs.writeFileSync(envPath, envContent);

    console.log("Arquivo .env atualizado com sucesso");
  } catch (error) {
    console.error("Erro ao atualizar arquivo .env:", error);
  }
}
