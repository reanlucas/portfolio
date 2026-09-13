"use client"
import { CgMail } from "react-icons/cg";
import { BottomNeural, LSTMNeural } from "@/components/neuralDecor";
import { Separator } from "./ui/separator";
import { motion } from "motion/react"
import { Reveal, SectionTitle } from "@/components/motion/primitives";
import { useT } from "@/i18n/context";

export default function Contact() {
  const t = useT()
  const c = t.contact
  return (
    <div className="w-full overflow-hidden relative">
      <BottomNeural className="absolute -left-10 top-0 w-72 md:w-[30rem] dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <LSTMNeural className="absolute -right-10 bottom-0 w-64 md:w-96 dark:opacity-[0.18] opacity-[0.22] pointer-events-none" />
      <Separator
        orientation="horizontal"
        className="max-w-[90vw] m-auto dark:bg-white/20 bg-black/10 my-8"
      />
      <div className="max-w-7xl flex flex-col px-6 mx-auto relative">
        <SectionTitle index="06" overline={c.overline} title={c.title} className="mb-4" />

        <Reveal>
          <p className="text-sm text-muted-foreground mb-6 leading-6 max-w-3xl">
            {c.statusPrefix}
            <span className="text-foreground font-semibold">{c.status}</span>
            {c.text}{" "}
            <a
              href={`mailto:${c.email}`}
              className="font-medium underline underline-offset-4 dark:text-white text-foreground hover:text-primary transition-colors"
            >
              {c.email}
            </a>
            .
          </p>
        </Reveal>

        <Reveal>
          <motion.a
            href={`mailto:${c.email}`}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.99 }}
            transition={{ type: "spring", stiffness: 320, damping: 24 }}
            className="group block rounded-none border border-border dark:border-white/10 bg-muted/40 dark:bg-white/5 p-5 md:p-6 hover:bg-muted/60 dark:hover:bg-white/8 transition-colors duration-300"
          >
            <div className="flex flex-row items-center gap-5">
              <div className="p-3 rounded-none bg-background dark:bg-white/5 shrink-0 group-hover:scale-110 transition-transform duration-300 text-foreground">
                <CgMail size={32} />
              </div>
              <span className="text-base md:text-xl font-medium flex-1 break-all md:break-normal">
                {c.email}
              </span>
            </div>
          </motion.a>
        </Reveal>
      </div>
    </div>
  )
}
