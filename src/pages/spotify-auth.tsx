import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

const SpotifyAuth: NextPage = () => {
  const router = useRouter();
  const { spotify, message } = router.query;

  return (
    <>
      <Head>
        <title>Autorização Spotify - João Vitor Dadas</title>
        <meta
          name="description"
          content="Autorização do Spotify para o site de João Vitor Dadas"
        />
      </Head>
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <h1 className="mb-8 text-3xl font-bold">Autorização do Spotify</h1>

        {spotify === "success" ? (
          <div className="mb-8 rounded-lg bg-green-100 p-4 text-green-800">
            <p className="mb-2 font-semibold">Autorização bem-sucedida!</p>
            <p>O token de atualização foi configurado com sucesso.</p>
          </div>
        ) : spotify === "error" ? (
          <div className="mb-8 rounded-lg bg-red-100 p-4 text-red-800">
            <p className="mb-2 font-semibold">Erro na autorização</p>
            <p>
              {message || "Ocorreu um erro durante o processo de autorização."}
            </p>
          </div>
        ) : null}

        <div className="mb-8 max-w-md rounded-lg bg-white p-6 shadow-md">
          <p className="mb-4">
            Para mostrar a música que você está ouvindo no Spotify, precisamos
            de sua autorização. Clique no botão abaixo para iniciar o processo.
          </p>
          <Link
            href="/api/spotify/login"
            className="inline-block rounded-full bg-green-500 px-6 py-3 font-semibold text-white transition-colors hover:bg-green-600"
          >
            Autorizar Spotify
          </Link>
        </div>

        <Link href="/" className="text-sm text-gray-500 hover:text-gray-700">
          Voltar para a página inicial
        </Link>
      </div>
    </>
  );
};

export default SpotifyAuth;
