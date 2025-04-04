"use client"

import React, { useEffect } from "react"
import { gsap } from "gsap"
import { useTranslation } from "@/lib/translations"

interface FooterProps {
  onEnterLink: () => void
  onLeaveLink: () => void
}

export default function Footer({ onEnterLink, onLeaveLink }: FooterProps) {
  const { t } = useTranslation()

  useEffect(() => {
    // Animate footer elements
    gsap.fromTo(
      ".footer-content",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
  }, [])

  return (
    <footer className="bg-cosmic-indigo text-white">
      <div className="footer-content container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* First column */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('brand')}</h3>
            <p className="mb-4 text-white/80">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-white/80 transition-colors hover:text-wisdom-gold"
                onMouseEnter={onEnterLink}
                onMouseLeave={onLeaveLink}
              >
                {/* Social icons would go here */}
              </a>
            </div>
          </div>
          
          {/* Quick Links column */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#hero" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('home')}
                </a>
              </li>
              <li>
                <a 
                  href="#about" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('about')}
                </a>
              </li>
              <li>
                <a 
                  href="#events" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('events')}
                </a>
              </li>
              <li>
                <a 
                  href="#team" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('team')}
                </a>
              </li>
              <li>
                <a 
                  href="#publications" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('publications')}
                </a>
              </li>
              <li>
                <a 
                  href="#gallery" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('gallery')}
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  className="text-white/80 transition-colors hover:text-wisdom-gold"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  {t('contact')}
                </a>
              </li>
            </ul>
          </div>
          
          {/* Latest Events column */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('latestEvents')}</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="#" 
                  className="group flex items-start space-x-3"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-sacred-saffron/20"></div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-wisdom-gold">{t('eventTitle1')}</h4>
                    <p className="text-sm text-white/70">{t('eventDate1')}</p>
                  </div>
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="group flex items-start space-x-3"
                  onMouseEnter={onEnterLink}
                  onMouseLeave={onLeaveLink}
                >
                  <div className="h-16 w-16 shrink-0 overflow-hidden rounded-md bg-sacred-saffron/20"></div>
                  <div>
                    <h4 className="font-medium text-white group-hover:text-wisdom-gold">{t('eventTitle2')}</h4>
                    <p className="text-sm text-white/70">{t('eventDate2')}</p>
                  </div>
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contact column */}
          <div>
            <h3 className="mb-4 text-xl font-bold">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-map-pin mt-1 shrink-0 text-wisdom-gold"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                <span className="text-white/80">{t('address')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-phone mt-1 shrink-0 text-wisdom-gold"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                <span className="text-white/80">{t('phone')}</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-mail mt-1 shrink-0 text-wisdom-gold"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                <span className="text-white/80">{t('email')}</span>
              </li>
            </ul>
            
            <div className="mt-6">
              <h4 className="mb-2 font-medium">{t('subscribeNewsletter')}</h4>
              <div className="flex space-x-2">
                <input 
                  type="email" 
                  placeholder={t('yourEmail')} 
                  className="w-full rounded-md border border-white/20 bg-white/10 px-3 py-2 text-white placeholder:text-white/50 focus:border-wisdom-gold focus:outline-none"
                />
                <button className="rounded-md bg-sacred-saffron px-4 py-2 text-white transition-colors hover:bg-sacred-saffron/90">
                  {t('send')}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-12 border-t border-white/20 pt-8 text-center">
          <p className="text-white/60">
            {t('copyright').replace('{year}', new Date().getFullYear().toString())}
          </p>
        </div>
      </div>
    </footer>
  )
}

