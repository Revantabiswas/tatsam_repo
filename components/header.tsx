"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { LanguageToggle } from "@/components/language-toggle"
import { useTranslation } from "@/lib/translations"

interface HeaderProps {
  onEnterLink: () => void
  onLeaveLink: () => void
  onEnterButton: () => void
  onLeaveButton: () => void
}

export default function Header({ onEnterLink, onLeaveLink, onEnterButton, onLeaveButton }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const { setTheme, theme } = useTheme()
  const { t } = useTranslation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    // Animate header elements
    gsap.fromTo(
      ".header-logo",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 },
    )

    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.5,
      },
    )

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      if (isMenuOpen) setIsMenuOpen(false)
    }
  }

  return (
    <header
      ref={headerRef}
      className={`fixed left-0 right-0 top-0 z-30 transition-all duration-300 ${
        isScrolled ? "bg-white/90 py-3 shadow-md backdrop-blur-md dark:bg-cosmic-indigo/90" : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="header-logo flex items-center space-x-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gradient-to-br from-sacred-saffron to-wisdom-gold p-0.5">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-white dark:bg-cosmic-indigo">
              <span className="text-xl font-bold text-sacred-saffron">त</span>
            </div>
          </div>
          <h1 className="text-xl font-bold tracking-wider">
            तत्सम् <span className="text-xs font-normal">NSUT</span>
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-8 md:flex">
          {[
            { name: t("होम"), id: "hero" },
            { name: t("परिचय"), id: "about" },
            { name: t("कार्यक्रम"), id: "events" },
            { name: t("टीम"), id: "team" },
            { name: t("उपलब्धियां"), id: "achievements" },
            { name: t("प्रकाशन"), id: "publications" },
            { name: t("गैलरी"), id: "gallery" },
            { name: t("संपर्क"), id: "contact" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="nav-item group relative text-sm font-medium tracking-wider transition-colors hover:text-sacred-saffron"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              {String(item.name)}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-sacred-saffron transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-sacred-saffron/10 hover:text-sacred-saffron"
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeaveButton}
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <LanguageToggle onEnterButton={onEnterButton} onLeaveButton={onLeaveButton} />

          <Button
            variant="ghost"
            size="icon"
            className="rounded-full hover:bg-sacred-saffron/10 hover:text-sacred-saffron md:hidden"
            onClick={toggleMenu}
            onMouseEnter={onEnterButton}
            onMouseLeave={onLeaveButton}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex flex-col bg-white p-4 dark:bg-cosmic-indigo md:hidden">
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full hover:bg-sacred-saffron/10 hover:text-sacred-saffron"
              onClick={toggleMenu}
              onMouseEnter={onEnterButton}
              onMouseLeave={onLeaveButton}
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col items-center justify-center space-y-6">
            {[
              { name: t("होम"), id: "hero" },
              { name: t("परिचय"), id: "about" },
              { name: t("कार्यक्रम"), id: "events" },
              { name: t("टीम"), id: "team" },
              { name: t("उपलब्धियां"), id: "achievements" },
              { name: t("प्रकाशन"), id: "publications" },
              { name: t("गैलरी"), id: "gallery" },
              { name: t("संपर्क"), id: "contact" },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-xl font-medium tracking-wider transition-colors hover:text-sacred-saffron"
                onMouseEnter={onEnterLink}
                onMouseLeave={onLeaveLink}
              >
                {String(item.name)}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}

