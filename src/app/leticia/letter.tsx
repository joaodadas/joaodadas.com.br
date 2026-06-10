"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState } from "react";

const paragraphs = [
  "Eu não estou escrevendo esta carta esperando que você me desculpe. Na verdade, eu entendo se você não conseguir me desculpar agora, ou mesmo se nunca quiser fazer isso. Esta carta não é uma tentativa de aproximação, nem uma tentativa de fazer você mudar o que sente. É só o que meu coração precisava dizer antes do adeus.",
  "Eu acho que existem coisas que precisam ser ditas para que um fim seja vivido com um pouco mais de verdade, mesmo quando ele acontece da pior forma. E eu sei que, no nosso caso, eu não soube fazer isso direito.",
  "Eu sinto muito. Sinto muito por ter te machucado. Sinto muito por ter sido justamente em um dia tão importante como o da apresentação do seu TCC. Esse dia deveria ter sido seu, da sua conquista, da sua caminhada, e eu transformei isso em dor. Eu sei que fui infantil e que não tive coragem suficiente para lidar com o fim da maneira certa.",
  "A verdade é que, há algum tempo, nosso relacionamento já não estava bem. Eu acho que nós dois, de alguma forma, já não estávamos tão felizes. Mas isso não muda tudo o que a gente viveu. Não muda os três anos que passamos juntos, nem tudo o que você foi para mim.",
  "Tudo que eu conquistei na minha carreira aconteceu depois que eu estava com você. Você esteve presente em uma fase enorme da minha vida. É impossível simplesmente apagar isso. É impossível esquecer os cinemas, as viagens, os finais de semana na sua casa, sua família, as conversas, os momentos bons, tudo que eu aprendi com você e tudo que a gente construiu, mesmo que agora tenha acabado.",
  "Tem lugares que, para mim, sempre vão ter o seu rosto. Mariscal, os Anos Novos que passamos lá, tantos lugares e momentos que vão continuar significando você de alguma forma. Não digo isso para diminuir a sua dor, nem para te pedir que lembre das coisas do mesmo jeito que eu lembro. Eu respeito tudo o que você estiver sentindo agora. Só queria dizer que, para mim, esses momentos foram muito especiais e eu nunca vou esquecer.",
  "Eu também sinto muito por ter feito isso terminar de uma forma tão ruim. Você não tinha culpa. Isso não tem a ver com falta de valor seu, com algo que você deixou de ser ou de fazer. Você é uma pessoa boa, honesta, linda, estilosa, forte, inteligente e muito especial. Você foi muito importante para mim e eu nunca vou negar isso.",
  "O que eu espero, de coração, é que você seja muito feliz. Muito feliz mesmo. Que você encontre alguém que cuide de você, que te escute do jeito que você precisa ser escutada, que valorize quem você é, sua profissão, sua inteligência, sua sensibilidade, seu jeito, sua força, suas explosões, suas intensidades e todas as partes que fazem você ser você. Alguém que te ame com cuidado, presença e respeito.",
  "Eu sei que talvez, de um dia para o outro, eu deixe de fazer parte da sua vida. Talvez eu não veja mais você, sua família, sua casa, os lugares que viraram parte da minha rotina nos últimos três anos. E isso dói muito. Mas eu entendo que talvez seja assim que precise ser agora.",
  "Eu não quero que o final apague tudo. Eu sei que o final foi horrível, e eu assumo a minha responsabilidade por isso. Mas eu também sei que existiu amor, carinho e verdade em muita coisa que a gente viveu. Você foi muito amada. Você foi muito importante para mim. Você fez parte da minha vida de uma forma que eu nunca vou esquecer.",
  "Eu amei você. E, de alguma forma, acho que uma parte de mim sempre vai ter carinho por você e por tudo que a gente viveu.",
  "Eu sinto muito por não ter sabido terminar melhor. Sinto muito por ter te machucado. Sinto muito por ter sido injusto com você.",
  "Obrigado por tudo que você foi na minha vida. Eu espero, do fundo do meu coração, que você fique bem, que se cuide, que seja feliz e que nunca esqueça o quanto você é incrível.",
];

export default function Letter() {
  const [opened, setOpened] = useState(false);

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto bg-[#070605] text-[#e9e3db]">
      <div
        className="pointer-events-none fixed inset-0 z-[101] opacity-[0.04]"
        style={{ backgroundImage: "url(/noise.png)", backgroundRepeat: "repeat" }}
      />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="cover"
            onClick={() => setOpened(true)}
            exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
            className="flex min-h-full w-full cursor-pointer flex-col items-center justify-center px-8 text-center outline-none"
            aria-label="Abrir a carta"
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 2, delay: 0.6, ease: "easeOut" }}
              className="font-display text-sm italic tracking-[0.3em] text-[#8a8178]"
            >
              uma carta
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 2.2, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 font-display text-5xl italic leading-tight sm:text-6xl"
            >
              para Letícia
            </motion.h1>

            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 1.6, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 h-px w-16 bg-[#3d362f]"
            />

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0.35, 0.7] }}
              transition={{ duration: 4, delay: 3.6, times: [0, 0.3, 0.65, 1], repeat: Infinity, repeatType: "reverse" }}
              className="mt-16 text-[13px] tracking-[0.25em] text-[#8a8178]"
            >
              toque para ler
            </motion.span>
          </motion.button>
        ) : (
          <LetterBody key="letter" />
        )}
      </AnimatePresence>
    </div>
  );
}

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

function LetterBody() {
  const openedAt = useRef<number | null>(null);
  if (openedAt.current === null) openedAt.current = performance.now();

  // Each block has a scheduled reveal time cascading top-down from when the
  // letter opens. Blocks already on screen stagger in order; blocks scrolled
  // into view after their slot appear right away.
  const reveal = {
    hidden: { opacity: 0, y: 12 },
    visible: (slot: number) => {
      const elapsed = (performance.now() - (openedAt.current ?? 0)) / 1000;
      return {
        opacity: 1,
        y: 0,
        transition: {
          duration: 1.1,
          delay: Math.max(0.08, 0.9 + slot * 0.35 - elapsed),
          ease: EASE,
        },
      };
    },
  };

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, ease: "easeOut" }}
      className="mx-auto max-w-[40rem] px-7 pb-28 pt-20 sm:px-8 sm:pt-28"
    >
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.6, delay: 0.3, ease: EASE }}
        className="mb-14 font-display text-3xl italic"
      >
        Letícia,
      </motion.h2>

      {paragraphs.map((text, i) => (
        <motion.p
          key={i}
          custom={i}
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mb-7 font-serif text-[17px] leading-[1.9] text-[#d8d1c8] sm:text-lg"
        >
          {text}
        </motion.p>
      ))}

      <motion.div
        custom={paragraphs.length}
        variants={reveal}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        className="mt-16"
      >
        <p className="font-serif text-[17px] italic text-[#d8d1c8] sm:text-lg">
          Com carinho,
        </p>
        <p className="mt-3 font-display text-3xl italic">João</p>
      </motion.div>
    </motion.article>
  );
}
