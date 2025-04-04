"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"
import { useTranslation } from "@/lib/translations"

interface HeroProps {
  onEnterButton: () => void
  onLeaveButton: () => void
}

export default function Hero({ onEnterButton, onLeaveButton }: HeroProps) {
  const { t } = useTranslation()
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (heroRef.current) {
      // Simple animations without SplitText
      gsap.fromTo(
        ".hero-title",
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.5 },
      )

      gsap.fromTo(
        ".hero-subtitle",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.8 },
      )

      gsap.fromTo(
        ".cta-button",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 1.1 },
      )

      gsap.fromTo(
        ".scroll-indicator",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          delay: 1.4,
          onComplete: () => {
            gsap.to(".scroll-indicator", {
              y: 10,
              duration: 1.5,
              repeat: -1,
              yoyo: true,
              ease: "power1.inOut",
            })
          },
        },
      )

      // Create floating Hindi letters
      const letters = ["त", "त्", "स", "म्", "हि", "न्", "दी"]
      const container = heroRef.current

      letters.forEach((letter, index) => {
        const letterEl = document.createElement("div")
        letterEl.className =
          "absolute text-2xl font-bold text-sacred-saffron/20 dark:text-sacred-saffron/10 hindi-letter"
        letterEl.textContent = letter
        letterEl.style.left = `${Math.random() * 80 + 10}%`
        letterEl.style.top = `${Math.random() * 80 + 10}%`
        container.appendChild(letterEl)

        gsap.fromTo(
          letterEl,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 1, delay: 1.5 + index * 0.1, ease: "power3.out" },
        )

        gsap.to(letterEl, {
          y: `-=${20 + Math.random() * 40}`,
          x: `+=${Math.random() * 20 - 10}`,
          rotation: Math.random() * 20 - 10,
          duration: 5 + Math.random() * 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })
    }
  }, [])

  const scrollToAbout = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-20"
    >
      {/* Decorative circles */}
      <div className="decorative-circle absolute -left-20 -top-20 h-64 w-64 rounded-full bg-sacred-saffron/5 dark:bg-sacred-saffron/10"></div>
      <div className="decorative-circle absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-wisdom-gold/5 dark:bg-wisdom-gold/10"></div>
      <div className="decorative-circle absolute left-1/4 top-1/4 h-40 w-40 rounded-full bg-cosmic-indigo/5 dark:bg-sacred-saffron/5"></div>

      <div className="container relative z-10 px-4 text-center">
        <h1 className="hero-title mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
          <span className="text-sacred-saffron">{t('heroTitle')}</span> {t('heroSubtitle')}
        </h1>

        <p className="hero-subtitle mx-auto mb-10 max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80 sm:text-xl md:text-2xl">
          {t('heroDescription')}
        </p>

        <div className="cta-button mb-16">
          <Button
            size="lg"
            className="bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
            onClick={scrollToAbout}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeaveButton}
          >
            {t('learnMore')}
          </Button>
        </div>

        <div className="scroll-indicator absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="mb-2 text-sm text-cosmic-indigo/60 dark:text-white/60">{t('scrollDown')}</p>
          <ChevronDown className="mx-auto h-6 w-6 text-sacred-saffron" />
        </div>
      </div>
    </section>
  )
}

