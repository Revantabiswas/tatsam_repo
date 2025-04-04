"use client"

import { useEffect, useRef, useState } from "react"
import Lenis from "@studio-freight/lenis"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Events from "@/components/events"
import Team from "@/components/team"
import Achievements from "@/components/achievements"
import Publications from "@/components/publications"
import Gallery from "@/components/gallery"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import MouseFollower from "@/components/mouse-follower"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)
  const mainRef = useRef<HTMLDivElement>(null)
  const [cursorText, setCursorText] = useState("")
  const [cursorVariant, setCursorVariant] = useState("default")

  useEffect(() => {
    // Initialize smooth scrolling with Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 2,
    })

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => {
      clearTimeout(timer)
      lenis.destroy()
    }
  }, [])

  useEffect(() => {
    if (!isLoading && mainRef.current) {
      // Simple fade-in animation for sections
      const sections = mainRef.current.querySelectorAll("section")

      sections.forEach((section) => {
        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("animate-fade-in")
                observer.unobserve(entry.target)
              }
            })
          },
          { threshold: 0.1 },
        )

        observer.observe(section)
      })
    }
  }, [isLoading])

  const enterButton = () => {
    setCursorText("Click")
    setCursorVariant("text")
  }

  const leaveButton = () => {
    setCursorText("")
    setCursorVariant("default")
  }

  const enterLink = () => {
    setCursorVariant("link")
  }

  const leaveLink = () => {
    setCursorVariant("default")
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-cosmic-indigo">
        <div className="relative flex flex-col items-center">
          <div className="relative h-32 w-32 animate-pulse">
            <div className="absolute inset-0 rounded-full bg-sacred-saffron opacity-20"></div>
            <div className="absolute inset-2 flex items-center justify-center rounded-full bg-sacred-saffron">
              <span className="text-4xl font-bold text-white">त</span>
            </div>
          </div>
          <h1 className="mt-6 text-5xl font-bold text-white tracking-widest">TATSAM</h1>
        </div>
      </div>
    )
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="tatsam-theme">
      <LanguageProvider defaultLanguage="en" storageKey="tatsam-language">
        <div className="relative min-h-screen overflow-x-hidden bg-white text-cosmic-indigo dark:bg-cosmic-indigo/95 dark:text-white">
          <MouseFollower variant={cursorVariant} text={cursorText} />
          <Header
            onEnterLink={enterLink}
            onLeaveLink={leaveLink}
            onEnterButton={enterButton}
            onLeaveButton={leaveButton}
          />
          <main ref={mainRef} className="relative z-10">
            <Hero onEnterButton={enterButton} onLeaveButton={leaveButton} />
            <About />
            <Events onEnterButton={enterButton} onLeaveButton={leaveButton} />
            <Team onEnterLink={enterLink} onLeaveLink={leaveLink} />
            <Achievements />
            <Publications
              onEnterLink={enterLink}
              onLeaveLink={leaveLink}
              onEnterButton={enterButton}
              onLeaveButton={leaveButton}
            />
            <Gallery />
            <Contact onEnterButton={enterButton} onLeaveButton={leaveButton} />
          </main>
          <Footer onEnterLink={enterLink} onLeaveLink={leaveLink} />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  )
}