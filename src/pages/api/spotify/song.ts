/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentlyPlaying, getRecentlyPlayed } from "~/utils/spotify";
import type { SongData } from "~/types/spotify";
import querystring from "querystring";

/**
 * Para obter um novo token de atualização do Spotify:
 * 1. Acesse https://developer.spotify.com/dashboard
 * 2. Selecione seu aplicativo
 * 3. Vá para "Settings" e adicione um URI de redirecionamento (ex: http://localhost:3000/api/spotify/callback)
 * 4. Acesse: https://accounts.spotify.com/authorize?client_id=SEU_CLIENT_ID&response_type=code&redirect_uri=SEU_REDIRECT_URI&scope=user-read-currently-playing%20user-read-recently-played
 * 5. Após autorizar, você será redirecionado para uma URL com um código
 * 6. Use este código para obter o token de atualização:
 *    curl -X POST -H "Content-Type: application/x-www-form-urlencoded" -H "Authorization: Basic SEU_BASIC_TOKEN" -d "grant_type=authorization_code&code=SEU_CODIGO&redirect_uri=SEU_REDIRECT_URI" https://accounts.spotify.com/api/token
 * 7. A resposta incluirá refresh_token e access_token
 * 8. Atualize a variável de ambiente SPOTIFY_REFRESH_TOKEN com o novo valor
 */

interface SpotifyTokenResponse {
  access_token: string;
  token_type: string;
  scope: string;
  expires_in: number;
}

interface SpotifyErrorResponse {
  error: string;
  error_description: string;
}

interface SpotifyTrackResponse {
  item: {
    name: string;
    artists: Array<{ name: string }>;
    album: {
      name: string;
      images: Array<{ url: string }>;
    };
    external_urls: {
      spotify: string;
    };
  };
  is_playing: boolean;
}

const client_id = process.env.SPOTIFY_CLIENT_ID ?? "";
const client_secret = process.env.SPOTIFY_CLIENT_SECRET ?? "";
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN ?? "";

async function getAccessToken(): Promise<string> {
  if (!client_id || !client_secret || !refresh_token) {
    throw new Error("Credenciais do Spotify não configuradas");
  }

  const basic = Buffer.from(`${client_id}:${client_secret}`).toString("base64");
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
    throw new Error("Erro ao obter token de acesso");
  }

  if (!("access_token" in data)) {
    throw new Error("Resposta inválida da API do Spotify");
  }

  return data.access_token;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SongData>
) {
  try {
    // Tenta obter a música atual
    const song = await getCurrentlyPlaying();

    // Se não estiver tocando nada, retorna a última música reproduzida
    if (!song.isPlaying) {
      const lastPlayed = await getRecentlyPlayed();
      return res.status(200).json(lastPlayed);
    }

    return res.status(200).json(song);
  } catch (error) {
    console.error("Erro ao buscar música:", error);
    return res.status(500).json({
      isPlaying: false,
      title: "Erro ao buscar música",
      artist: "",
      album: "",
      albumImageUrl: "",
      songUrl: "https://open.spotify.com/user/joaodadas",
    });
  }
}
