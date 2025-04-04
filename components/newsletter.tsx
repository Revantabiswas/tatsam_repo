"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Newsletter() {
  const newsletterRef = useRef<HTMLDivElement>(null)
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (newsletterRef.current) {
      // Animate the paper boat
      gsap.to(".paper-boat", {
        y: -20,
        rotation: 5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Animate the lotus petals
      gsap.to(".lotus-petal", {
        scale: 1.1,
        duration: 1.5,
        stagger: 0.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Animation for transformation
      gsap.to(".newsletter-form", {
        opacity: 0,
        y: -20,
        duration: 0.5,
        onComplete: () => {
          gsap.to(".confirmation-lotus", {
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "back.out(1.7)",
          })
        },
      })
    }
  }

  return (
    <section id="newsletter" className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            श्रुति संवाद <span className="text-xl font-normal">(Stay Connected)</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80">
            Subscribe to receive spiritual insights, event updates, and wisdom teachings
          </p>
        </div>

        <div ref={newsletterRef} className="mx-auto max-w-2xl">
          {!isSubmitted ? (
            <div className="newsletter-form relative rounded-lg bg-gradient-to-r from-cosmic-indigo/10 to-sacred-saffron/10 p-8">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 transform">
                <div className="paper-boat h-16 w-24">
                  <div className="h-full w-full rounded-b-lg bg-white shadow-md"></div>
                  <div className="absolute left-1/2 top-0 h-8 w-8 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-sacred-saffron"></div>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-cosmic-indigo">Join Our Spiritual Journey</h3>
                  <p className="mt-2 text-cosmic-indigo/70">
                    Receive monthly newsletters with spiritual insights, event updates, and wisdom teachings.
                  </p>
                </div>

                <div className="flex space-x-2">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border-cosmic-indigo/20 focus:border-sacred-saffron"
                    required
                  />
                  <Button type="submit" className="bg-sacred-saffron text-white hover:bg-sacred-saffron/90">
                    Subscribe
                  </Button>
                </div>

                <p className="text-center text-xs text-cosmic-indigo/60">
                  By subscribing, you agree to receive our newsletter. You can unsubscribe at any time.
                </p>
              </form>
            </div>
          ) : (
            <div className="confirmation-lotus opacity-0 scale-0 text-center">
              <div className="mx-auto mb-6 h-32 w-32 relative">
                {/* Lotus flower */}
                {Array.from({ length: 8 }).map((_, i) => {
                  const angle = i * 45 * (Math.PI / 180)
                  const x = 50 * Math.cos(angle)
                  const y = 50 * Math.sin(angle)

                  return (
                    <div
                      key={i}
                      className="lotus-petal absolute left-1/2 top-1/2 h-16 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-t from-sacred-saffron to-wisdom-gold"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${angle + Math.PI / 2}rad)`,
                      }}
                    ></div>
                  )
                })}
                <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-wisdom-gold"></div>
              </div>

              <h3 className="text-2xl font-bold text-cosmic-indigo">Thank You for Subscribing!</h3>
              <p className="mt-4 text-cosmic-indigo/80">
                Your spiritual journey with us begins now. Check your inbox for a confirmation email.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

