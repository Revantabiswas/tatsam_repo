"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

interface PhilosophyCard {
  id: number
  sanskrit: string
  hindi: string
  english: string
}

export default function AboutUs() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const philosophyCards: PhilosophyCard[] = [
    {
      id: 1,
      sanskrit: "अहं ब्रह्मास्मि",
      hindi: "मैं ब्रह्म हूँ",
      english: "I am Brahman (the Ultimate Reality)",
    },
    {
      id: 2,
      sanskrit: "तत्त्वमसि",
      hindi: "वह तुम हो",
      english: "That thou art",
    },
    {
      id: 3,
      sanskrit: "प्रज्ञानं ब्रह्म",
      hindi: "प्रज्ञान ही ब्रह्म है",
      english: "Consciousness is Brahman",
    },
    {
      id: 4,
      sanskrit: "अयमात्मा ब्रह्म",
      hindi: "यह आत्मा ब्रह्म है",
      english: "This Self is Brahman",
    },
  ]

  useEffect(() => {
    if (timelineRef.current) {
      // Animate the timeline
      gsap.fromTo(
        ".timeline-node",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
          },
        },
      )

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
    }
  }, [])

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <section id="about" className="relative py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">अहं ब्रह्मास्मि</h2>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80">
            A digital yagna (sacrifice) where every interaction represents the dissolution of duality
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div ref={timelineRef} className="relative flex flex-col items-center space-y-12 py-8">
            <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-gradient-to-b from-sacred-saffron via-wisdom-gold to-cosmic-indigo timeline-line"></div>

            {[
              { year: "1990", title: "Foundation", desc: "Establishment of Tatsam Society" },
              { year: "2000", title: "Growth", desc: "Expanded to multiple cities" },
              { year: "2010", title: "Digital Presence", desc: "Launched online platform" },
              { year: "2020", title: "Global Reach", desc: "International chapters established" },
            ].map((item, index) => (
              <div key={index} className="relative z-10 flex w-full items-center">
                <div className={`w-1/2 pr-8 text-right ${index % 2 !== 0 ? "order-2" : ""}`}>
                  <h3 className="text-xl font-bold text-sacred-saffron">{item.year}</h3>
                  <h4 className="text-lg font-medium">{item.title}</h4>
                  <p className="text-sm text-cosmic-indigo/70">{item.desc}</p>
                </div>

                <div className="timeline-node relative h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-sacred-saffron to-wisdom-gold shadow-lg">
                  <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
                </div>

                <div className={`w-1/2 pl-8 ${index % 2 === 0 ? "order-2" : ""}`}>
                  {index % 2 === 0 && (
                    <>
                      <h3 className="text-xl font-bold text-sacred-saffron">{item.year}</h3>
                      <h4 className="text-lg font-medium">{item.title}</h4>
                      <p className="text-sm text-cosmic-indigo/70">{item.desc}</p>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {philosophyCards.map((card) => (
              <Card
                key={card.id}
                className={`group overflow-hidden transition-all duration-500 hover:shadow-lg ${
                  expandedCard === card.id ? "col-span-2 row-span-2" : ""
                }`}
                onClick={() => toggleCard(card.id)}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col space-y-4">
                    <div className="text-center">
                      <h3 className="text-2xl font-bold text-sacred-saffron">{card.sanskrit}</h3>
                      <div
                        className={`mt-2 transition-all duration-300 ${expandedCard === card.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                      >
                        <p className="text-lg text-cosmic-indigo/80">{card.hindi}</p>
                        <p className="mt-1 text-sm text-cosmic-indigo/60">{card.english}</p>
                      </div>
                    </div>

                    {expandedCard === card.id && (
                      <div className="mt-4 animate-fade-in">
                        <p className="text-cosmic-indigo/80">
                          This profound teaching from the Upanishads reminds us that our true nature is one with the
                          ultimate reality. The individual self (Atman) is identical with the universal self (Brahman).
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl font-bold tracking-wider">Our Philosophy</h3>
              <p className="text-lg text-cosmic-indigo/80">
                Tatsam is founded on the principles of Advaita Vedanta, the non-dualistic school of Hindu philosophy. We
                believe in the oneness of all existence and the dissolution of the perceived separation between the
                individual self and the universal consciousness.
              </p>
              <p className="text-lg text-cosmic-indigo/80">
                Through our activities, events, and teachings, we aim to help individuals realize their true nature and
                experience the profound truth of "अहं ब्रह्मास्मि" (I am Brahman).
              </p>
            </div>

            <div className="relative h-80 overflow-hidden rounded-lg md:h-auto">
              <div className="absolute inset-0 bg-gradient-to-r from-cosmic-indigo/20 to-sacred-saffron/20"></div>
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="Spiritual gathering"
                width={800}
                height={600}
                className="h-full w-full object-cover"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cosmic-indigo/80 to-transparent p-6 text-white">
                <h4 className="text-xl font-bold">Spiritual Gatherings</h4>
                <p className="text-sm">Join us in our journey towards self-realization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

