"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  description: string
  image: string
  category: "events" | "workshops" | "competitions" | "celebrations"
}

export default function Gallery() {
  const galleryRef = useRef<HTMLDivElement>(null)
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [filter, setFilter] = useState<string>("all")

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "शब्दोत्सव 2024",
      description: "तत्सम् का वार्षिक साहित्यिक महोत्सव, जिसमें 20+ कॉलेजों के 500+ प्रतिभागियों ने भाग लिया।",
      image: "/placeholder.svg?height=600&width=800",
      category: "events",
    },
    {
      id: 2,
      title: "काव्य संध्या",
      description: "प्रसिद्ध कवि कुमार विश्वास के साथ एक शाम, जहां उन्होंने अपनी कविताओं का पाठ किया।",
      image: "/placeholder.svg?height=600&width=800",
      category: "events",
    },
    {
      id: 3,
      title: "कहानी लेखन कार्यशाला",
      description: "प्रसिद्ध लेखक मनोज कुमार पांडेय द्वारा आयोजित दो दिवसीय कहानी लेखन कार्यशाला।",
      image: "/placeholder.svg?height=600&width=800",
      category: "workshops",
    },
    {
      id: 4,
      title: "अंतर-कॉलेज वाद-विवाद प्रतियोगिता",
      description: "दिल्ली-NCR के विभिन्न कॉलेजों के बीच हिंदी वाद-विवाद प्रतियोगिता।",
      image: "/placeholder.svg?height=600&width=800",
      category: "competitions",
    },
    {
      id: 5,
      title: "हिंदी दिवस समारोह",
      description: "हिंदी दिवस के अवसर पर आयोजित विशेष कार्यक्रम और प्रतियोगिताएँ।",
      image: "/placeholder.svg?height=600&width=800",
      category: "celebrations",
    },
    {
      id: 6,
      title: "कविता पाठ प्रतियोगिता",
      description: "छात्रों द्वारा स्वरचित कविताओं का पाठ और प्रतियोगिता।",
      image: "/placeholder.svg?height=600&width=800",
      category: "competitions",
    },
    {
      id: 7,
      title: "साहित्य यात्रा",
      description: "दिल्ली के ऐतिहासिक और साहित्यिक स्थलों की यात्रा।",
      image: "/placeholder.svg?height=600&width=800",
      category: "events",
    },
    {
      id: 8,
      title: "नए सदस्य स्वागत समारोह",
      description: "तत्सम् में नए सदस्यों का स्वागत समारोह और परिचय कार्यक्रम।",
      image: "/placeholder.svg?height=600&width=800",
      category: "celebrations",
    },
  ]

  const filteredItems = filter === "all" ? galleryItems : galleryItems.filter((item) => item.category === filter)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (galleryRef.current) {
      // Animate gallery section heading
      gsap.fromTo(
        ".gallery-heading",
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
            trigger: galleryRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate gallery filter buttons
      gsap.fromTo(
        ".gallery-filters",
        {
          y: 30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
          ease: "power3.out",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate gallery items
      const animateGalleryItems = () => {
        gsap.fromTo(
          ".gallery-item",
          {
            scale: 0.8,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: ".gallery-grid",
              start: "top 80%",
            },
          },
        )
      }

      animateGalleryItems()

      // Re-animate when filter changes
      return () => {
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
      }
    }
  }, [filter])

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const navigateImage = (direction: "next" | "prev") => {
    if (!selectedImage) return

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedImage.id)
    let newIndex

    if (direction === "next") {
      newIndex = (currentIndex + 1) % filteredItems.length
    } else {
      newIndex = (currentIndex - 1 + filteredItems.length) % filteredItems.length
    }

    setSelectedImage(filteredItems[newIndex])
  }

  return (
    <section
      id="gallery"
      className="relative py-20 bg-gradient-to-b from-white to-cosmic-indigo/5 dark:from-cosmic-indigo/95 dark:to-cosmic-indigo/90"
    >
      <div ref={galleryRef} className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="gallery-heading mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            हमारी <span className="text-sacred-saffron">गैलरी</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            तत्सम् के कार्यक्रमों और गतिविधियों की झलकियाँ
          </p>
        </div>

        <div className="gallery-filters mb-8 flex flex-wrap justify-center gap-4">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            className={
              filter === "all"
                ? "bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-sacred-saffron dark:hover:bg-sacred-saffron/90"
                : ""
            }
            onClick={() => setFilter("all")}
          >
            सभी
          </Button>
          <Button
            variant={filter === "events" ? "default" : "outline"}
            className={
              filter === "events"
                ? "bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-sacred-saffron dark:hover:bg-sacred-saffron/90"
                : ""
            }
            onClick={() => setFilter("events")}
          >
            कार्यक्रम
          </Button>
          <Button
            variant={filter === "workshops" ? "default" : "outline"}
            className={
              filter === "workshops"
                ? "bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-sacred-saffron dark:hover:bg-sacred-saffron/90"
                : ""
            }
            onClick={() => setFilter("workshops")}
          >
            कार्यशालाएँ
          </Button>
          <Button
            variant={filter === "competitions" ? "default" : "outline"}
            className={
              filter === "competitions"
                ? "bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-sacred-saffron dark:hover:bg-sacred-saffron/90"
                : ""
            }
            onClick={() => setFilter("competitions")}
          >
            प्रतियोगिताएँ
          </Button>
          <Button
            variant={filter === "celebrations" ? "default" : "outline"}
            className={
              filter === "celebrations"
                ? "bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-sacred-saffron dark:hover:bg-sacred-saffron/90"
                : ""
            }
            onClick={() => setFilter("celebrations")}
          >
            समारोह
          </Button>
        </div>

        <div className="gallery-grid grid gap-3 sm:gap-4 md:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <div
                  className="gallery-item group relative cursor-pointer overflow-hidden rounded-lg"
                  onClick={() => openLightbox(item)}
                >
                  <div className="aspect-square overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={800}
                      height={600}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                  <div className="absolute bottom-0 left-0 p-2 sm:p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <h3 className="text-sm sm:text-lg font-bold line-clamp-1">{item.title}</h3>
                    <p className="text-xs sm:text-sm">{item.category}</p>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-xl dark:bg-cosmic-indigo/90">
                  <div className="relative aspect-video">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <p className="mt-2 text-cosmic-indigo/80 dark:text-white/80">{item.description}</p>
                  </div>
                  <button
                    className="absolute right-4 top-4 rounded-full bg-white/80 p-1 text-cosmic-indigo transition-colors hover:bg-white hover:text-sacred-saffron dark:bg-cosmic-indigo/80 dark:text-white dark:hover:bg-cosmic-indigo dark:hover:text-sacred-saffron"
                    onClick={closeLightbox}
                  >
                    <X className="h-6 w-6" />
                  </button>
                  <button
                    className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-cosmic-indigo transition-colors hover:bg-white hover:text-sacred-saffron dark:bg-cosmic-indigo/80 dark:text-white dark:hover:bg-cosmic-indigo dark:hover:text-sacred-saffron"
                    onClick={() => navigateImage("prev")}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </button>
                  <button
                    className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 text-cosmic-indigo transition-colors hover:bg-white hover:text-sacred-saffron dark:bg-cosmic-indigo/80 dark:text-white dark:hover:bg-cosmic-indigo dark:hover:text-sacred-saffron"
                    onClick={() => navigateImage("next")}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </button>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button className="bg-sacred-saffron text-white hover:bg-sacred-saffron/90">और फोटो देखें</Button>
        </div>
      </div>
    </section>
  )
}

