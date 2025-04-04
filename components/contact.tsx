"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Facebook, Instagram, Mail, MapPin, Phone, Twitter } from "lucide-react"

interface ContactProps {
  onEnterButton: () => void
  onLeaveButton: () => void
}

export default function Contact({ onEnterButton, onLeaveButton }: ContactProps) {
  const contactRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (contactRef.current) {
      // Animate contact section heading
      gsap.fromTo(
        ".contact-heading",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate contact info and form
      gsap.fromTo(
        ".contact-info",
        {
          x: -50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".contact-form",
        {
          x: 50,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contactRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate social icons
      gsap.fromTo(
        ".social-icon",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".social-icons",
            start: "top 90%",
          },
        },
      )
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Form submitted:", formData)

    // Animation for form submission
    if (formRef.current) {
      gsap.to(formRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setIsSubmitted(true)
          gsap.fromTo(".success-message", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5 })
        },
      })
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white dark:from-cosmic-indigo/90 dark:to-cosmic-indigo/95"
    >
      <div ref={contactRef} className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="contact-heading mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            हमसे <span className="text-sacred-saffron">संपर्क</span> करें
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            प्रश्न, सुझाव या सहयोग के लिए हमसे संपर्क करें
          </p>
        </div>

        <div className="grid gap-8 md:gap-12 md:grid-cols-2">
          <div className="contact-info space-y-6 sm:space-y-8">
            <div>
              <h3 className="mb-4 text-2xl font-bold">संपर्क जानकारी</h3>
              <ul className="space-y-4">
                <li className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sacred-saffron/10 text-sacred-saffron dark:bg-sacred-saffron/20">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">पता</h4>
                    <p className="text-cosmic-indigo/80 dark:text-white/80">
                      तत्सम् कार्यालय, छात्र गतिविधि केंद्र, NSUT, सेक्टर-3, द्वारका, नई दिल्ली - 110078
                    </p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sacred-saffron/10 text-sacred-saffron dark:bg-sacred-saffron/20">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">ईमेल</h4>
                    <p className="text-cosmic-indigo/80 dark:text-white/80">tatsam@nsut.ac.in</p>
                  </div>
                </li>
                <li className="flex items-start space-x-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sacred-saffron/10 text-sacred-saffron dark:bg-sacred-saffron/20">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">फोन</h4>
                    <p className="text-cosmic-indigo/80 dark:text-white/80">+91 98765 43210</p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-2xl font-bold">सोशल मीडिया</h3>
              <div className="social-icons flex space-x-4">
                <a
                  href="#"
                  className="social-icon flex h-12 w-12 items-center justify-center rounded-full bg-cosmic-indigo/10 text-cosmic-indigo transition-colors hover:bg-cosmic-indigo hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-cosmic-indigo"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="social-icon flex h-12 w-12 items-center justify-center rounded-full bg-cosmic-indigo/10 text-cosmic-indigo transition-colors hover:bg-cosmic-indigo hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-cosmic-indigo"
                >
                  <Twitter className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="social-icon flex h-12 w-12 items-center justify-center rounded-full bg-cosmic-indigo/10 text-cosmic-indigo transition-colors hover:bg-cosmic-indigo hover:text-white dark:bg-white/10 dark:text-white dark:hover:bg-white dark:hover:text-cosmic-indigo"
                >
                  <Instagram className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-sacred-saffron/10 to-wisdom-gold/10 p-4 sm:p-6 dark:from-sacred-saffron/20 dark:to-wisdom-gold/20">
              <h3 className="mb-4 text-xl font-bold">कार्यालय समय</h3>
              <ul className="space-y-2 text-cosmic-indigo/80 dark:text-white/80">
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span>सोमवार - शुक्रवार:</span>
                  <span>सुबह 10:00 - शाम 5:00</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span>शनिवार:</span>
                  <span>सुबह 10:00 - दोपहर 2:00</span>
                </li>
                <li className="flex flex-col sm:flex-row sm:justify-between">
                  <span>रविवार:</span>
                  <span>बंद</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="contact-form rounded-lg bg-white p-4 sm:p-8 shadow-md dark:bg-cosmic-indigo/30">
            {!isSubmitted ? (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                <h3 className="mb-4 text-2xl font-bold">संदेश भेजें</h3>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium">
                      नाम
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="border-cosmic-indigo/20 focus:border-sacred-saffron dark:border-white/20 dark:bg-cosmic-indigo/50 dark:focus:border-sacred-saffron"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium">
                      ईमेल
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="border-cosmic-indigo/20 focus:border-sacred-saffron dark:border-white/20 dark:bg-cosmic-indigo/50 dark:focus:border-sacred-saffron"
                    />
                  </div>

                  <div>
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      विषय
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="border-cosmic-indigo/20 focus:border-sacred-saffron dark:border-white/20 dark:bg-cosmic-indigo/50 dark:focus:border-sacred-saffron"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      संदेश
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      required
                      className="border-cosmic-indigo/20 focus:border-sacred-saffron dark:border-white/20 dark:bg-cosmic-indigo/50 dark:focus:border-sacred-saffron"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
                  onMouseEnter={onEnterButton}
                  onMouseLeave={onLeaveButton}
                >
                  संदेश भेजें
                </Button>
              </form>
            ) : (
              <div className="success-message flex h-full flex-col items-center justify-center space-y-6 text-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sacred-saffron/20 text-sacred-saffron">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                    <polyline points="22 4 12 14.01 9 11.01"></polyline>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">धन्यवाद!</h3>
                <p className="text-cosmic-indigo/80 dark:text-white/80">
                  आपका संदेश सफलतापूर्वक भेज दिया गया है। हम जल्द ही आपसे संपर्क करेंगे।
                </p>
                <Button
                  className="bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-white dark:text-cosmic-indigo dark:hover:bg-white/90"
                  onClick={() => setIsSubmitted(false)}
                  onMouseEnter={onEnterButton}
                  onMouseLeave={onLeaveButton}
                >
                  वापस जाएं
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

