const CLIENT_ID = "b9447e0f80a943f6b7e6d9371c6abf6b";
const CLIENT_SECRET = "bcbf59743d634f958725f4583683e7c1";
const REDIRECT_URI = "https://joaodadas.com.br/api/spotify/callback";
const SCOPES = "user-read-currently-playing user-read-recently-played";

// URL de autorização
const authURL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}`;

console.log("Siga estes passos:");
console.log("\n1. Abra esta URL no navegador:");
console.log("\x1b[36m%s\x1b[0m", authURL);
console.log("\n2. Faça login no Spotify e autorize o aplicativo");
console.log("3. Você será redirecionado para uma URL que contém um código");
console.log("4. Copie o código da URL (a parte após ?code=)");
console.log(
  "\n5. Execute este comando substituindo CÓDIGO_AQUI pelo código copiado:"
);
console.log(
  "\x1b[33m%s\x1b[0m",
  `curl -X POST -H "Authorization: Basic ${Buffer.from(
    CLIENT_ID + ":" + CLIENT_SECRET
  ).toString(
    "base64"
  )}" -d grant_type=authorization_code -d code=CÓDIGO_AQUI -d redirect_uri=${REDIRECT_URI} https://accounts.spotify.com/api/token`
);
