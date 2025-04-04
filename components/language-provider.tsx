"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Language = "en" | "hi"

type LanguageContextType = {
  language: Language
  setLanguage: (language: Language) => void
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({
  children,
  defaultLanguage = "en",
  storageKey = "tatsam-language",
}: {
  children: React.ReactNode
  defaultLanguage?: Language
  storageKey?: string
}) {
  const [language, setLanguage] = useState<Language>(defaultLanguage)

  useEffect(() => {
    const savedLanguage = localStorage.getItem(storageKey) as Language | null
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [storageKey])

  useEffect(() => {
    localStorage.setItem(storageKey, language)
  }, [language, storageKey])

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}