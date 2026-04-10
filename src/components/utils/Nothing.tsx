import * as React from "react";
import * as motion from "motion/react-client";
import * as motions from "motion/react";
import { stagger } from "motion";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface NothingProps {
  title?: string;
  subtitle?: string;
  nodot?: boolean;
  refresh?: string;
}

const nothingTranslations = [
  { lang: "English", word: "nothing" },
  { lang: "Spanish", word: "nada" },
  { lang: "French", word: "rien" },
  { lang: "German", word: "nichts" },
  { lang: "Italian", word: "niente" },
  { lang: "Portuguese", word: "nada" },
  { lang: "Russian", word: "ничего" },
  { lang: "Chinese", word: "没有" },
  { lang: "Japanese", word: "何もない" },
  { lang: "Korean", word: "아무것도" },
  { lang: "Arabic", word: "لا شيء" },
  { lang: "Hindi", word: "कुछ नहीं" },
  { lang: "Bengali", word: "কিছুই না" },
  { lang: "Turkish", word: "hiçbir şey" },
  { lang: "Vietnamese", word: "không có gì" },
  { lang: "Polish", word: "nic" },
  { lang: "Dutch", word: "niets" },
  { lang: "Swedish", word: "ingenting" },
  { lang: "Greek", word: "τίποτα" },
  { lang: "Thai", word: "ไม่มีอะไร" },
];

export default function Loading({ title, subtitle, nodot }: NothingProps) {
  const [scope, animate] = motions.useAnimate();
  const [displayTitle, setDisplayTitle] = React.useState<string>("");
  const [lang, setLang] = React.useState<string>("");

  // Set title once on mount
  React.useEffect(() => {
    if (title) {
      setDisplayTitle(title);
    } else {
      const randomPair =
        nothingTranslations[
          Math.floor(Math.random() * nothingTranslations.length)
        ];
      setDisplayTitle(randomPair.word);
      setLang(randomPair.lang);
    }
  }, [title]);

  let animatedTitle = displayTitle;
  if (!nodot) {
    animatedTitle = animatedTitle + "...";
  }

  // Memoize animation parameters
  const { stagr, duration, total } = React.useMemo(() => {
    let staggerVal: number;
    let durationVal: number;
    let totalVal: number;

    // 10% stagger with 0.4s pause before restart
    if (animatedTitle.length > 0) {
      durationVal = animatedTitle.length / 10;
      staggerVal = durationVal / 10;
      totalVal = durationVal + staggerVal + 0.4;
    } else {
      totalVal = 1.5;
      durationVal = 0.6;
      staggerVal = 0.2;
    }
    return { stagr: staggerVal, duration: durationVal, total: totalVal };
  }, [animatedTitle.length]);

  console.log("Duration:", duration, "Stagger:", stagr);

  React.useEffect(() => {
    if (!displayTitle) return; // Only animate when title is set

    const frameId = requestAnimationFrame(() => {
      animate(
        "span",
        { y: [0, -75, 0] },
        {
          delay: stagger(stagr),
          duration: duration,
          ease: ["easeInOut"],
          repeat: Infinity,
          repeatDelay: total,
        },
      );
    });

    return () => cancelAnimationFrame(frameId);
  }, [displayTitle, animate, stagr, duration, total]);

  return (
    <Box
      sx={{
        p: 0,
        textAlign: "center",
        mx: 4,
      }}
    >
      <motions.AnimatePresence initial={false} mode="wait">
        <motion.div
          layout
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            overflow: "visible",
            fontFamily: "Courier New, monospace",
            fontSize: "5em",
            fontWeight: 700,
          }}
          ref={scope}
        >
          {animatedTitle.split("").map((char: string, index: number) => {
            return <motion.span key={char + index}>{char}</motion.span>;
          })}
        </motion.div>
      </motions.AnimatePresence>
      {lang != "" ? (
        <Typography variant="body1" component="div" sx={{ fontSize: "2em" }}>
          "Nothing"{" "}
          {<Typography variant="body2">{"(" + lang + ")"}</Typography>}
        </Typography>
      ) : (
        <Typography variant="body1" component="div" sx={{ marginBottom: 10 }}>
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}
