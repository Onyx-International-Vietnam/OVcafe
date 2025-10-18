"use client";

import { mockMedia } from "@/lib/helpers/mock";
import { Button } from "@/components/ui/button";
import { Play, Share2, Music } from "lucide-react";
import { motion } from "framer-motion";

export default function MediaTab() {
  const items = mockMedia("recording", 6);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="space-y-2"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {items.map((it, index) => (
        <motion.div
          key={it.id}
          variants={item}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="group relative overflow-hidden rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
              <Music className="h-5 w-5" />
            </div>
            
            <div className="min-w-0 flex-1">
              <div className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
                {it.title}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
                  REC
                </span>
                <span>·</span>
                <span className="rounded-full bg-muted px-2 py-0.5">
                  {it.visibility.toUpperCase()}
                </span>
              </div>
            </div>

            <div className="flex gap-1.5 opacity-0 transition-opacity group-hover:opacity-100">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 hover:bg-primary hover:text-primary-foreground"
              >
                <Play className="h-3.5 w-3.5" />
                Play
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 gap-1.5 hover:bg-primary hover:text-primary-foreground"
              >
                <Share2 className="h-3.5 w-3.5" />
                Share
              </Button>
            </div>
          </div>

          {/* Progress bar animation */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-primary/50"
            initial={{ width: "0%" }}
            animate={{ width: `${(index + 1) * 15}%` }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
