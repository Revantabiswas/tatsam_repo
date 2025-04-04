"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Calendar, Mic, Users } from "lucide-react"
import { useTranslation } from "@/lib/translations"

interface Feature {
  icon: React.ReactNode
  titleKey: string
  descriptionKey: string
}

export default function About() {
  const { t } = useTranslation()
  const aboutRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)

  const features: Feature[] = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      titleKey: "literaryWorkshops",
      descriptionKey: "literaryWorkshopsDesc",
    },
    {
      icon: <Mic className="h-8 w-8" />,
      titleKey: "poetryCompetitions",
      descriptionKey: "poetryCompetitionsDesc",
    },
    {
      icon: <Calendar className="h-8 w-8" />,
      titleKey: "annualFestival",
      descriptionKey: "annualFestivalDesc",
    },
    {
      icon: <Users className="h-8 w-8" />,
      titleKey: "communityNetwork",
      descriptionKey: "communityNetworkDesc",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (aboutRef.current) {
      // Simple animations
      gsap.fromTo(
        ".about-image",
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".about-content",
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate the decorative line
      gsap.fromTo(
        ".decorative-line",
        { width: 0 },
        {
          width: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: aboutRef.current,
            start: "top 70%",
          },
        },
      )
    }

    if (featuresRef.current) {
      // Animate feature cards
      gsap.fromTo(
        ".feature-card",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: featuresRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="about" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            {t('aboutTitle.our')} <span className="text-sacred-saffron">{t('aboutTitle.introduction')}</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2">
          <div className="about-image relative overflow-hidden rounded-lg order-2 md:order-1">
            <div className="aspect-video overflow-hidden rounded-lg">
              <Image
                src="\img (3).jpeg?height=600&width=800"
                alt={t('festivalImageAlt')}
                width={800}
                height={600}
                className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/30 to-transparent dark:from-cosmic-indigo/50"></div>
            <div className="absolute bottom-0 left-0 p-6 text-white">
              <h3 className="text-2xl font-bold">{t('festivalTitle')}</h3>
              <p className="text-sm">{t('festivalSubtitle')}</p>
            </div>
          </div>

          <div className="about-content flex flex-col justify-center space-y-6 order-1 md:order-2">
            <h3 className="text-3xl font-bold tracking-wider">{t('journeyTitle')}</h3>
            <div className="decorative-line h-1 w-full bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
            <p className="text-lg text-cosmic-indigo/80 dark:text-white/80">
              {t('journeyParagraph1')}
            </p>
            <p className="text-lg text-cosmic-indigo/80 dark:text-white/80">
              {t('journeyParagraph2')}
            </p>
            <div className="pt-4">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="rounded-lg bg-sacred-saffron/10 p-4 dark:bg-sacred-saffron/20">
                  <h4 className="text-3xl font-bold text-sacred-saffron">19+</h4>
                  <p className="text-cosmic-indigo/70 dark:text-white/70">{t('yearsOfHistory')}</p>
                </div>
                <div className="rounded-lg bg-wisdom-gold/10 p-4 dark:bg-wisdom-gold/20">
                  <h4 className="text-3xl font-bold text-wisdom-gold">100+</h4>
                  <p className="text-cosmic-indigo/70 dark:text-white/70">{t('activeMembers')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div ref={featuresRef} className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r from-sacred-saffron to-wisdom-gold p-1">
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-sacred-saffron dark:bg-cosmic-indigo">
                      {feature.icon}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{t(feature.titleKey)}</h3>

                  <p className="text-cosmic-indigo/70 dark:text-white/70">{t(feature.descriptionKey)}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

