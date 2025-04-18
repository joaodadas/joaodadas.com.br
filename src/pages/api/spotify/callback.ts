import { type NextApiRequest, type NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  // Exibir o código para o usuário copiar
  res.setHeader("Content-Type", "text/html");
  return res.status(200).send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Spotify Authorization</title>
        <style>
          body {
            font-family: system-ui;
            max-width: 600px;
            margin: 2rem auto;
            padding: 0 1rem;
            background: #000;
            color: #fff;
          }
          .code {
            background: #1DB954;
            color: #000;
            padding: 1rem;
            border-radius: 4px;
            font-family: monospace;
            word-break: break-all;
          }
          h1 { color: #1DB954; }
        </style>
      </head>
      <body>
        <h1>Código obtido com sucesso!</h1>
        <p>Copie o código abaixo e use-o no terminal:</p>
        <div class="code">${code}</div>
      </body>
    </html>
  `);
}
