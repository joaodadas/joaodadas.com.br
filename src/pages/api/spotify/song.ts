import type { NextApiRequest, NextApiResponse } from "next";
import { getCurrentlyPlaying, getRecentlyPlayed } from "~/utils/spotify";
import type { SongData } from "~/types/spotify";

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
