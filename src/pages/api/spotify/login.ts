import { type NextApiRequest, type NextApiResponse } from "next";
import querystring from "querystring";
import crypto from "crypto";

// Função para gerar uma string aleatória para o parâmetro state
function generateRandomString(length: number): string {
  return crypto.randomBytes(length).toString("hex");
}

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Verifica se é uma requisição GET
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
  const redirect_uri = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/spotify/callback`
    : "http://127.0.0.1:3000/api/spotify/callback";

  // Gera um estado aleatório para proteção contra CSRF
  const state = generateRandomString(16);

  // Define os escopos necessários
  const scope = "user-read-currently-playing user-read-recently-played";

  // Redireciona para a página de autorização do Spotify
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: scope,
        redirect_uri: redirect_uri,
        state: state,
      })
  );
}
