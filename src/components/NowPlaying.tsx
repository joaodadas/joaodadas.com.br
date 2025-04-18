import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface SongData {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  isPlaying: boolean;
  songUrl: string;
}

export default function NowPlaying() {
  const [song, setSong] = useState<SongData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await fetch("/api/spotify/song");
        if (!response.ok) throw new Error("Falha ao buscar música");
        const data = (await response.json()) as SongData;
        setSong(data);
      } catch (error) {
        console.error("Erro ao buscar música:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void fetchSong();
    const interval = setInterval(() => void fetchSong(), 30000); // Atualiza a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  if (isLoading || !song) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-4 rounded-lg border border-neutral-700/50 bg-neutral-800/50 p-4 backdrop-blur-sm"
    >
      <div className="relative h-16 w-16">
        <Image
          src={song.albumImageUrl}
          alt={song.album}
          fill
          className="rounded-md object-cover"
        />
      </div>
      <div className="flex flex-col">
        <p className="text-sm text-neutral-400">
          {song.isPlaying ? "Ouvindo agora" : "Última música"}
        </p>
        <Link
          href={song.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white transition-colors duration-200 hover:text-[#C49B66]"
        >
          {song.title}
        </Link>
        <p className="text-sm text-neutral-500">{song.artist}</p>
        <p className="text-xs text-neutral-600">{song.album}</p>
      </div>
    </motion.div>
  );
}
