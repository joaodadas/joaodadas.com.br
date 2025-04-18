import { SPOTIFY_CONFIG, validateSpotifyConfig } from "~/config/spotify";
import {
  type SpotifyCurrentlyPlayingResponse,
  type SpotifyErrorResponse,
  type SpotifyRecentlyPlayedResponse,
  type SpotifyTokenResponse,
  type SongData,
} from "~/types/spotify";
import querystring from "querystring";

export async function getAccessToken(): Promise<string> {
  validateSpotifyConfig();

  const basic = Buffer.from(
    `${SPOTIFY_CONFIG.client_id ?? ""}:${SPOTIFY_CONFIG.client_secret ?? ""}`
  ).toString("base64");

  const response = await fetch(SPOTIFY_CONFIG.endpoints.token, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: querystring.stringify({
      grant_type: "refresh_token",
      refresh_token: SPOTIFY_CONFIG.refresh_token,
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

export async function getCurrentlyPlaying(): Promise<SongData> {
  const access_token = await getAccessToken();

  const response = await fetch(SPOTIFY_CONFIG.endpoints.currentlyPlaying, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  // Se não estiver tocando nada (status 204) ou houver erro
  if (response.status === 204 || !response.ok) {
    return {
      isPlaying: false,
      title: "Nenhuma música tocando",
      artist: "",
      album: "",
      albumImageUrl: "",
      songUrl: SPOTIFY_CONFIG.profile.url,
    };
  }

  const data = (await response.json()) as SpotifyCurrentlyPlayingResponse;

  return {
    isPlaying: data.is_playing,
    title: data.item.name,
    artist: data.item.artists.map((artist) => artist.name).join(", "),
    album: data.item.album.name,
    albumImageUrl: data.item.album.images[0]?.url ?? "",
    songUrl: data.item.external_urls.spotify,
  };
}

export async function getRecentlyPlayed(): Promise<SongData> {
  const access_token = await getAccessToken();

  const response = await fetch(SPOTIFY_CONFIG.endpoints.recentlyPlayed, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar última música reproduzida");
  }

  const data = (await response.json()) as SpotifyRecentlyPlayedResponse;

  if (!data.items?.[0]?.track) {
    return {
      isPlaying: false,
      title: "Nenhuma música recente",
      artist: "",
      album: "",
      albumImageUrl: "",
      songUrl: SPOTIFY_CONFIG.profile.url,
    };
  }

  const track = data.items[0].track;

  return {
    isPlaying: false,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    album: track.album.name,
    albumImageUrl: track.album.images[0]?.url ?? "",
    songUrl: track.external_urls.spotify,
  };
}
