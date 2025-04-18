export const SPOTIFY_CONFIG = {
  client_id: process.env.SPOTIFY_CLIENT_ID ?? "",
  client_secret: process.env.SPOTIFY_CLIENT_SECRET ?? "",
  refresh_token: process.env.SPOTIFY_REFRESH_TOKEN ?? "",
  redirect_uri: process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}/api/spotify/callback`
    : "http://localhost:3000/api/spotify/callback",
  endpoints: {
    token: "https://accounts.spotify.com/api/token",
    currentlyPlaying: "https://api.spotify.com/v1/me/player/currently-playing",
    recentlyPlayed:
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
  },
  profile: {
    url: "https://open.spotify.com/user/12159908355?si=c71c739a37fd4113",
  },
} as const;

export function validateSpotifyConfig() {
  const missing = [];
  if (!SPOTIFY_CONFIG.client_id) missing.push("SPOTIFY_CLIENT_ID");
  if (!SPOTIFY_CONFIG.client_secret) missing.push("SPOTIFY_CLIENT_SECRET");
  if (!SPOTIFY_CONFIG.refresh_token) missing.push("SPOTIFY_REFRESH_TOKEN");

  if (missing.length > 0) {
    throw new Error(
      `Credenciais do Spotify não configuradas: ${missing.join(", ")}`
    );
  }
}
