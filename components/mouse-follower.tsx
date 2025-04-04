"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MouseFollowerProps {
  variant: string
  text?: string
}

export default function MouseFollower({ variant, text }: MouseFollowerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      height: 32,
      width: 32,
      backgroundColor: "rgba(255, 111, 0, 0.2)",
      mixBlendMode: "difference" as const,
    },
    text: {
      x: mousePosition.x - 48,
      y: mousePosition.y - 48,
      height: 96,
      width: 96,
      backgroundColor: "rgba(255, 111, 0, 0.5)",
      mixBlendMode: "difference" as const,
    },
    link: {
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      height: 48,
      width: 48,
      backgroundColor: "rgba(255, 215, 64, 0.4)",
      mixBlendMode: "difference" as const,
    },
  }

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-50 flex items-center justify-center rounded-full"
        variants={variants}
        animate={variant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {variant === "text" && <span className="select-none text-sm font-medium text-white">{text}</span>}
      </motion.div>
    </>
  )
}

