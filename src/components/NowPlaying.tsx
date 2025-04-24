import { useEffect, useState } from "react";
import type { SongData } from "~/types/spotify";
import H1 from "~/components/md/H1";
import Link from "next/link";
import H2 from "./md/H2";

interface ApiResponse {
  error?: string;
  title?: string;
  artist?: string;
  songUrl?: string;
}

export default function NowPlaying() {
  const [song, setSong] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("/api/spotify/song");
        const data = (await response.json()) as ApiResponse;

        if (!response.ok) {
          throw new Error(data.error || "Erro ao buscar música");
        }

        if (data.title && data.artist && data.songUrl) {
          setSong({
            title: data.title,
            artist: data.artist,
            songUrl: data.songUrl,
            isPlaying: true,
            album: "",
            albumImageUrl: "",
          });
        } else {
          setSong(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro ao buscar música");
        setSong(null);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSong();
    const interval = setInterval(() => void fetchSong(), 30000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-gray-600" />
        <span>Carregando música...</span>
      </div>
    );
  }

  if (error) {
    if (
      error.includes("Credenciais do Spotify não configuradas") ||
      error.includes("Erro ao obter token de acesso") ||
      error.includes("invalid_grant")
    ) {
      return (
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center space-x-2 text-red-500">
            <span>⚠️</span>
            <span>Erro de autenticação do Spotify</span>
          </div>
          <Link
            href="/spotify-auth"
            className="text-xs text-blue-500 hover:underline"
          >
            Clique aqui para autorizar
          </Link>
        </div>
      );
    }

    return (
      <div className="flex items-center space-x-2 text-sm text-red-500">
        <span>⚠️</span>
        <span>{error}</span>
      </div>
    );
  }

  if (!song) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-500">
        <span>Nenhuma música tocando</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm">
      <a
        href={song.songUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {song.title} - {song.artist}
      </a>
    </div>
  );
}
