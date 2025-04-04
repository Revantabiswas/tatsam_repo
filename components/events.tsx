"use client"

import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface EventProps {
  onEnterButton: () => void
  onLeaveButton: () => void
}

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  category: "upcoming" | "annual" | "workshops" | "competitions"
}

export default function Events({ onEnterButton, onLeaveButton }: EventProps) {
  const eventsRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)

  const events: Event[] = [
    {
      id: 1,
      title: "शब्दोत्सव 2025",
      date: "फरवरी 15-17, 2025",
      time: "सुबह 10:00 - शाम 6:00",
      location: "NSUT मुख्य सभागार",
      description: "तत्सम् का वार्षिक साहित्यिक महोत्सव, जिसमें कविता पाठ, वाद-विवाद, कहानी लेखन और अन्य प्रतियोगिताएँ शामिल हैं।",
      image: "/placeholder.svg?height=300&width=400",
      category: "upcoming",
    },
    {
      id: 2,
      title: "काव्य संध्या",
      date: "नवंबर 20, 2024",
      time: "शाम 5:00 - 8:00",
      location: "NSUT ओपन एयर थिएटर",
      description: "प्रसिद्ध कवि कुमार विश्वास के साथ एक शाम, जहां वे अपनी कविताओं का पाठ करेंगे और छात्रों से बातचीत करेंगे।",
      image: "/placeholder.svg?height=300&width=400",
      category: "upcoming",
    },
    {
      id: 3,
      title: "हिंदी लेखन कार्यशाला",
      date: "अक्टूबर 5-6, 2024",
      time: "दोपहर 2:00 - शाम 5:00",
      location: "ब्लॉक VI, कमरा 302",
      description: "प्रसिद्ध लेखक मनोज कुमार पांडेय द्वारा आयोजित दो दिवसीय कहानी लेखन कार्यशाला।",
      image: "/placeholder.svg?height=300&width=400",
      category: "workshops",
    },
    {
      id: 4,
      title: "अंतर-कॉलेज वाद-विवाद प्रतियोगिता",
      date: "सितंबर 25, 2024",
      time: "सुबह 11:00 - शाम 4:00",
      location: "NSUT सेमिनार हॉल",
      description:
        "दिल्ली-NCR के विभिन्न कॉलेजों के बीच हिंदी वाद-विवाद प्रतियोगिता, विषय: 'आधुनिक युग में हिंदी साहित्य की प्रासंगिकता'।",
      image: "/placeholder.svg?height=300&width=400",
      category: "competitions",
    },
    {
      id: 5,
      title: "शब्दोत्सव 2024",
      date: "फरवरी 18-20, 2024",
      time: "सुबह 10:00 - शाम 6:00",
      location: "NSUT मुख्य सभागार",
      description: "तत्सम् का वार्षिक साहित्यिक महोत्सव, जिसमें 20+ कॉलेजों के 500+ प्रतिभागियों ने भाग लिया।",
      image: "/placeholder.svg?height=300&width=400",
      category: "annual",
    },
    {
      id: 6,
      title: "हिंदी दिवस समारोह",
      date: "सितंबर 14, 2024",
      time: "सुबह 10:00 - दोपहर 1:00",
      location: "NSUT मुख्य सभागार",
      description: "हिंदी दिवस के अवसर पर विशेष कार्यक्रम, जिसमें निबंध लेखन, कविता पाठ और वाद-विवाद प्रतियोगिताएँ शामिल हैं।",
      image: "/placeholder.svg?height=300&width=400",
      category: "upcoming",
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (eventsRef.current) {
      // Animate section heading
      gsap.fromTo(
        ".events-heading",
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
            trigger: eventsRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate tabs
      gsap.fromTo(
        ".events-tabs",
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
            trigger: eventsRef.current,
            start: "top 80%",
          },
        },
      )
    }

    if (carouselRef.current) {
      // Create horizontal scroll effect for featured events
      const cards = carouselRef.current.querySelectorAll(".event-card")

      gsap.fromTo(
        cards,
        {
          x: (i) => i * 100 + 200,
          opacity: 0,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: carouselRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  const nextSlide = () => {
    const upcomingEvents = events.filter((event) => event.category === "upcoming")
    setActiveSlide((prev) => (prev + 1) % upcomingEvents.length)
  }

  const prevSlide = () => {
    const upcomingEvents = events.filter((event) => event.category === "upcoming")
    setActiveSlide((prev) => (prev - 1 + upcomingEvents.length) % upcomingEvents.length)
  }

  const handleRegister = (id: number) => {
    console.log(`Register for event ${id}`)
    // Animation for the button
    gsap.to(`#register-btn-${id}`, {
      scale: 1.2,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    })
  }

  return (
    <section
      id="events"
      className="relative py-20 bg-gradient-to-b from-white to-cosmic-indigo/5 dark:from-cosmic-indigo/95 dark:to-cosmic-indigo/90"
    >
      <div className="container mx-auto px-4">
        <div ref={eventsRef} className="mb-16 text-center">
          <h2 className="events-heading mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            हमारे <span className="text-sacred-saffron">कार्यक्रम</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            साहित्य, संस्कृति और भाषा को समर्पित विविध कार्यक्रम और प्रतियोगिताएँ
          </p>
        </div>

        <div className="mb-12">
          <h3 className="mb-6 text-2xl font-bold">आगामी कार्यक्रम</h3>

          <div ref={carouselRef} className="relative">
            <div className="overflow-hidden">
              <div
                className="flex flex-col md:flex-row transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {events
                  .filter((event) => event.category === "upcoming")
                  .map((event) => (
                    <div key={event.id} className="event-card w-full p-4 md:w-1/2 lg:w-1/3">
                      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl text-sacred-saffron">{event.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">{event.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            id={`register-btn-${event.id}`}
                            className="w-full bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
                            onClick={() => handleRegister(event.id)}
                            onMouseEnter={onEnterButton}
                            onMouseLeave={onLeaveButton}
                          >
                            रजिस्टर करें
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>

            <Button
              variant="outline"
              size="icon"
              className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-cosmic-indigo/50 hidden md:flex"
              onClick={prevSlide}
              onMouseEnter={onEnterButton}
              onMouseLeave={onLeaveButton}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="icon"
              className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 backdrop-blur-sm dark:bg-cosmic-indigo/50 hidden md:flex"
              onClick={nextSlide}
              onMouseEnter={onEnterButton}
              onMouseLeave={onLeaveButton}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>

            {/* Mobile navigation dots */}
            <div className="flex justify-center mt-4 space-x-2 md:hidden">
              {events
                .filter((event) => event.category === "upcoming")
                .map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 w-2 rounded-full ${
                      index === activeSlide ? "bg-sacred-saffron" : "bg-cosmic-indigo/20 dark:bg-white/20"
                    }`}
                    onClick={() => setActiveSlide(index)}
                  />
                ))}
            </div>
          </div>
        </div>

        <div className="events-tabs">
          <Tabs defaultValue="all" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-cosmic-indigo/10 dark:bg-white/10">
                <TabsTrigger value="all">सभी कार्यक्रम</TabsTrigger>
                <TabsTrigger value="annual">वार्षिक उत्सव</TabsTrigger>
                <TabsTrigger value="workshops">कार्यशालाएँ</TabsTrigger>
                <TabsTrigger value="competitions">प्रतियोगिताएँ</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => (
                  <Card
                    key={event.id}
                    className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={event.image || "/placeholder.svg"}
                        alt={event.title}
                        width={400}
                        height={300}
                        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl text-sacred-saffron">{event.title}</CardTitle>
                      <CardDescription>
                        <div className="flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                          <Calendar className="h-4 w-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                          <Clock className="h-4 w-4" />
                          <span>{event.time}</span>
                        </div>
                        <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                          <MapPin className="h-4 w-4" />
                          <span>{event.location}</span>
                        </div>
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">{event.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Button
                        id={`register-btn-${event.id}`}
                        className="w-full bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
                        onClick={() => handleRegister(event.id)}
                        onMouseEnter={onEnterButton}
                        onMouseLeave={onLeaveButton}
                      >
                        {event.category === "annual" ? "विवरण देखें" : "रजिस्टर करें"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {["annual", "workshops", "competitions"].map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {events
                    .filter((event) => event.category === category)
                    .map((event) => (
                      <Card
                        key={event.id}
                        className="overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30"
                      >
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={event.image || "/placeholder.svg"}
                            alt={event.title}
                            width={400}
                            height={300}
                            className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                        </div>
                        <CardHeader>
                          <CardTitle className="text-xl text-sacred-saffron">{event.title}</CardTitle>
                          <CardDescription>
                            <div className="flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <Calendar className="h-4 w-4" />
                              <span>{event.date}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <Clock className="h-4 w-4" />
                              <span>{event.time}</span>
                            </div>
                            <div className="mt-1 flex items-center gap-2 text-cosmic-indigo/70 dark:text-white/70">
                              <MapPin className="h-4 w-4" />
                              <span>{event.location}</span>
                            </div>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">{event.description}</p>
                        </CardContent>
                        <CardFooter>
                          <Button
                            id={`register-btn-${event.id}`}
                            className="w-full bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
                            onClick={() => handleRegister(event.id)}
                            onMouseEnter={onEnterButton}
                            onMouseLeave={onLeaveButton}
                          >
                            {category === "annual" ? "विवरण देखें" : "रजिस्टर करें"}
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  )
}

