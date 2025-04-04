"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Award, BookOpen, Globe, Trophy, Users } from "lucide-react"
import Image from "next/image"
import { useTranslation } from "@/lib/translations"

interface Achievement {
  id: number
  title: string
  value: string
  icon: React.ReactNode
  color: string
}

interface MajorAchievement {
  id: number
  title: string
  description: string
  year: string
  image?: string
}

export default function Achievements() {
  const { t } = useTranslation()
  const achievementsRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const achievements: Achievement[] = [
    {
      id: 1,
      title: t("awardsTitle"),
      value: "50+",
      icon: <Trophy className="h-8 w-8" />,
      color: "from-sacred-saffron to-wisdom-gold",
    },
    {
      id: 2,
      title: t("publishedWorksTitle"),
      value: "25+",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-wisdom-gold to-cosmic-indigo",
    },
    {
      id: 3,
      title: t("eventsOrganizedTitle"),
      value: "100+",
      icon: <Globe className="h-8 w-8" />,
      color: "from-cosmic-indigo to-sacred-saffron",
    },
    {
      id: 4,
      title: t("activeMembersTitle"),
      value: "100+",
      icon: <Users className="h-8 w-8" />,
      color: "from-sacred-saffron to-cosmic-indigo",
    },
  ]

  const majorAchievements: MajorAchievement[] = [
    {
      id: 1,
      title: t("achievement1Title"),
      description: t("achievement1Description"),
      year: "2023",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 2,
      title: t("achievement2Title"),
      description: t("achievement2Description"),
      year: "2022",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 3,
      title: t("achievement3Title"),
      description: t("achievement3Description"),
      year: "2021",
      image: "/placeholder.svg?height=300&width=400",
    },
    {
      id: 4,
      title: t("achievement4Title"),
      description: t("achievement4Description"),
      year: "2020",
      image: "/placeholder.svg?height=300&width=400",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (achievementsRef.current) {
      // Animate achievement cards
      gsap.fromTo(
        ".achievement-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: achievementsRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate achievement values with counting effect
      achievements.forEach((achievement) => {
        const value = achievement.value.replace(/\D/g, "")
        if (value) {
          const endValue = Number.parseInt(value, 10)
          gsap.fromTo(
            `#achievement-value-${achievement.id}`,
            { innerText: "0" },
            {
              innerText: endValue,
              duration: 2,
              ease: "power2.out",
              snap: { innerText: 1 },
              scrollTrigger: {
                trigger: achievementsRef.current,
                start: "top 80%",
              },
            },
          )
        }
      })
    }

    if (timelineRef.current) {
      // Animate timeline
      gsap.fromTo(
        ".timeline-line",
        { height: 0 },
        {
          height: "100%",
          duration: 1.5,
          ease: "power2.inOut",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".timeline-item",
        {
          opacity: 0,
          x: (i) => (i % 2 === 0 ? -50 : 50),
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [achievements])

  return (
    <section
      id="achievements"
      className="relative py-20 bg-gradient-to-b from-white to-cosmic-indigo/5 dark:from-cosmic-indigo/95 dark:to-cosmic-indigo/90"
    >
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            {t("achievementsTitle")} <span className="text-sacred-saffron">{t("achievementsSubtitle")}</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            {t("achievementsDescription")}
          </p>
        </div>

        <div ref={achievementsRef} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement) => (
            <Card key={achievement.id} className="achievement-card overflow-hidden dark:bg-cosmic-indigo/30">
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r ${achievement.color} p-1`}
                  >
                    <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-cosmic-indigo dark:bg-cosmic-indigo dark:text-white">
                      {achievement.icon}
                    </div>
                  </div>

                  <h3 className="mb-2 text-xl font-bold">{achievement.title}</h3>

                  <div className="text-3xl font-bold text-sacred-saffron">
                    <span id={`achievement-value-${achievement.id}`}>{achievement.value.replace(/\D/g, "")}</span>
                    <span>{achievement.value.replace(/\d/g, "")}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div ref={timelineRef} className="mt-20">
          <h3 className="mb-10 text-center text-2xl font-bold">{t("majorAchievementsTitle")}</h3>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 top-0 h-full w-0.5 sm:-translate-x-1/2 bg-gradient-to-b from-sacred-saffron via-wisdom-gold to-cosmic-indigo timeline-line"></div>

            {majorAchievements.map((achievement, index) => (
              <div key={achievement.id} className="timeline-item relative mb-16 flex flex-col sm:flex-row">
                <div
                  className={`w-full sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12" : "sm:order-2 sm:pl-12"} pl-12 sm:pl-0`}
                >
                  <Card className="h-full overflow-hidden dark:bg-cosmic-indigo/30">
                    {achievement.image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={achievement.image || "/placeholder.svg"}
                          alt={achievement.title}
                          width={400}
                          height={300}
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                        <div className="absolute bottom-2 right-2 rounded-full bg-sacred-saffron px-3 py-1 text-sm font-bold text-white">
                          {achievement.year}
                        </div>
                      </div>
                    )}
                    <CardContent className="p-6">
                      <h4 className="mb-2 text-xl font-bold">{achievement.title}</h4>
                      <p className="text-cosmic-indigo/80 dark:text-white/80">{achievement.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-4 sm:left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-sacred-saffron p-1">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-cosmic-indigo">
                    <Award className="h-5 w-5 text-sacred-saffron" />
                  </div>
                </div>

                <div
                  className={`hidden sm:block w-full sm:w-1/2 ${index % 2 !== 0 ? "sm:pr-12 text-right" : "sm:order-2 sm:pl-12"}`}
                >
                  {!achievement.image && (
                    <div className="flex h-full flex-col justify-center">
                      <h4 className="mb-2 text-xl font-bold">{achievement.title}</h4>
                      <p className="text-cosmic-indigo/80 dark:text-white/80">{achievement.description}</p>
                      <p className="mt-2 font-bold text-sacred-saffron">{achievement.year}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 rounded-lg bg-gradient-to-r from-cosmic-indigo/10 to-sacred-saffron/10 p-8 dark:from-cosmic-indigo/30 dark:to-sacred-saffron/30">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">राष्ट्रीय मान्यता</h3>
              <p className="text-cosmic-indigo/80 dark:text-white/80">
                तत्सम् को हिंदी साहित्य के क्षेत्र में उत्कृष्ट योगदान के लिए कई राष्ट्रीय स्तर के संगठनों द्वारा मान्यता प्राप्त हुई है। हमारे
                सदस्यों ने विभिन्न प्रतिष्ठित प्रतियोगिताओं में पुरस्कार जीते हैं और अपनी प्रतिभा का प्रदर्शन किया है।
              </p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-cosmic-indigo/50">
                  <h4 className="mb-2 text-lg font-semibold text-sacred-saffron">राष्ट्रीय युवा साहित्य पुरस्कार</h4>
                  <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">2022 में सर्वश्रेष्ठ कॉलेज साहित्यिक संस्था</p>
                </div>
                <div className="rounded-lg bg-white p-4 shadow-sm dark:bg-cosmic-indigo/50">
                  <h4 className="mb-2 text-lg font-semibold text-sacred-saffron">हिंदी अकादमी सम्मान</h4>
                  <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">2021 में युवा साहित्य प्रोत्साहन के लिए</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold">प्रकाशन और मीडिया कवरेज</h3>
              <p className="text-cosmic-indigo/80 dark:text-white/80">
                तत्सम् के कार्यक्रमों और उपलब्धियों को विभिन्न राष्ट्रीय समाचार पत्रों और पत्रिकाओं में प्रकाशित किया गया है। हमारे सदस्यों की
                रचनाएँ प्रतिष्ठित साहित्यिक पत्रिकाओं में प्रकाशित हुई हैं।
              </p>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="overflow-hidden rounded-lg bg-white shadow-sm dark:bg-cosmic-indigo/50">
                    <div className="aspect-video bg-cosmic-indigo/10 dark:bg-cosmic-indigo/70"></div>
                    <div className="p-2 text-center text-xs text-cosmic-indigo/80 dark:text-white/80">
                      मीडिया कवरेज {item}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

