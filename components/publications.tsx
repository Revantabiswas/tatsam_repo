"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, MessageCircle, Share2, BookOpen } from "lucide-react"
import Image from "next/image"

interface PublicationsProps {
  onEnterLink: () => void
  onLeaveLink: () => void
  onEnterButton: () => void
  onLeaveButton: () => void
}

interface Publication {
  id: number
  title: string
  excerpt: string
  date: string
  author: {
    name: string
    avatar: string
  }
  image: string
  category: string
  comments: number
}

export default function Publications({ onEnterLink, onLeaveLink, onEnterButton, onLeaveButton }: PublicationsProps) {
  const publicationsRef = useRef<HTMLDivElement>(null)

  const publications: Publication[] = [
    {
      id: 1,
      title: "आधुनिक हिंदी कविता की चुनौतियां",
      excerpt:
        "आज के डिजिटल युग में हिंदी कविता किस प्रकार अपनी पहचान बना रही है और किन चुनौतियों का सामना कर रही है, इस पर एक विस्तृत विश्लेषण।",
      date: "15 मई, 2024",
      author: {
        name: "अनुराग शर्मा",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      category: "कविता",
      comments: 12,
    },
    {
      id: 2,
      title: "हिंदी साहित्य में प्रेमचंद का योगदान",
      excerpt: "मुंशी प्रेमचंद के साहित्य का आधुनिक परिप्रेक्ष्य में मूल्यांकन और उनकी रचनाओं की प्रासंगिकता पर एक शोधपरक लेख।",
      date: "28 अप्रैल, 2024",
      author: {
        name: "प्रियंका गुप्ता",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      category: "शोध",
      comments: 8,
    },
    {
      id: 3,
      title: "तकनीकी युग में हिंदी भाषा का भविष्य",
      excerpt: "इंटरनेट और सोशल मीडिया के युग में हिंदी भाषा किस प्रकार विकसित हो रही है और इसके भविष्य की संभावनाओं पर विचार।",
      date: "10 अप्रैल, 2024",
      author: {
        name: "विकास मेहता",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      category: "विचार",
      comments: 15,
    },
    {
      id: 4,
      title: "छायावाद से नई कविता तक का सफर",
      excerpt: "हिंदी कविता के विकास में छायावाद से लेकर नई कविता तक के आंदोलनों का तुलनात्मक अध्ययन और उनका प्रभाव।",
      date: "5 मार्च, 2024",
      author: {
        name: "नेहा सिंह",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      category: "कविता",
      comments: 10,
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (publicationsRef.current) {
      // Animate section heading
      gsap.fromTo(
        ".publications-heading",
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
            trigger: publicationsRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate publication cards with palm-leaf manuscript effect
      gsap.fromTo(
        ".publication-card",
        {
          rotationX: 90,
          y: 50,
          opacity: 0,
        },
        {
          rotationX: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".publications-grid",
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section
      id="publications"
      className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white dark:from-cosmic-indigo/90 dark:to-cosmic-indigo/95"
    >
      <div ref={publicationsRef} className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="publications-heading mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            हमारे <span className="text-sacred-saffron">प्रकाशन</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            तत्सम् के सदस्यों द्वारा लिखित लेख, कविताएँ और शोध कार्य
          </p>
        </div>

        <div className="publications-grid grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {publications.map((publication) => (
            <Card
              key={publication.id}
              className="publication-card overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={publication.image || "/placeholder.svg"}
                  alt={publication.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
                <div className="absolute right-2 top-2 rounded-full bg-sacred-saffron px-3 py-1 text-xs font-medium text-white">
                  {publication.category}
                </div>
              </div>

              <CardHeader className="relative">
                <div className="absolute -top-6 left-4 flex items-center space-x-2">
                  <Avatar className="border-2 border-white dark:border-cosmic-indigo/80">
                    <AvatarImage src={publication.author.avatar} alt={publication.author.name} />
                    <AvatarFallback className="bg-cosmic-indigo text-white dark:bg-sacred-saffron">
                      {publication.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-md bg-white p-1 text-sm shadow-md dark:bg-cosmic-indigo/70">
                    <p className="font-medium">{publication.author.name}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2 text-sm text-cosmic-indigo/70 dark:text-white/70">
                  <Calendar className="h-4 w-4" />
                  <span>{publication.date}</span>
                </div>

                <CardTitle className="text-xl font-bold line-clamp-2">{publication.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-cosmic-indigo/80 dark:text-white/80 line-clamp-3">{publication.excerpt}</p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-cosmic-indigo/10 p-4 dark:border-white/10">
                <div className="flex items-center space-x-4">
                  <button
                    className="flex items-center space-x-1 text-sm text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
                    onMouseEnter={onEnterLink}
                    onMouseLeave={onLeaveLink}
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span>{publication.comments} टिप्पणियाँ</span>
                  </button>

                  <button
                    className="flex items-center space-x-1 text-sm text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
                    onMouseEnter={onEnterLink}
                    onMouseLeave={onLeaveLink}
                  >
                    <Share2 className="h-4 w-4" />
                    <span>शेयर</span>
                  </button>
                </div>

                <Button
                  variant="ghost"
                  className="text-cosmic-indigo hover:text-sacred-saffron dark:text-white dark:hover:text-sacred-saffron"
                  onMouseEnter={onEnterButton}
                  onMouseLeave={onLeaveButton}
                >
                  पूरा पढ़ें
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl font-bold tracking-wider">हमारी पत्रिका</h3>
              <p className="text-lg text-cosmic-indigo/80 dark:text-white/80">
                'शब्द-लहरी' तत्सम् की त्रैमासिक पत्रिका है, जिसमें छात्रों की रचनाएँ, साहित्यिक समीक्षाएँ और विशेष आलेख प्रकाशित किए जाते
                हैं।
              </p>
              <div className="flex space-x-4">
                <div className="relative h-40 w-32 overflow-hidden rounded-lg shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-b from-sacred-saffron/20 to-cosmic-indigo/20 dark:from-sacred-saffron/30 dark:to-cosmic-indigo/30"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <BookOpen className="mb-2 h-8 w-8 text-sacred-saffron" />
                    <h4 className="text-sm font-bold">शब्द-लहरी</h4>
                    <p className="mt-1 text-xs">अंक 12, 2024</p>
                  </div>
                </div>
                <div className="relative h-40 w-32 overflow-hidden rounded-lg shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-b from-wisdom-gold/20 to-cosmic-indigo/20 dark:from-wisdom-gold/30 dark:to-cosmic-indigo/30"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <BookOpen className="mb-2 h-8 w-8 text-wisdom-gold" />
                    <h4 className="text-sm font-bold">शब्द-लहरी</h4>
                    <p className="mt-1 text-xs">अंक 11, 2023</p>
                  </div>
                </div>
                <div className="relative h-40 w-32 overflow-hidden rounded-lg shadow-md">
                  <div className="absolute inset-0 bg-gradient-to-b from-cosmic-indigo/20 to-sacred-saffron/20 dark:from-cosmic-indigo/30 dark:to-sacred-saffron/30"></div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                    <BookOpen className="mb-2 h-8 w-8 text-cosmic-indigo dark:text-white" />
                    <h4 className="text-sm font-bold">शब्द-लहरी</h4>
                    <p className="mt-1 text-xs">अंक 10, 2023</p>
                  </div>
                </div>
              </div>
              <Button
                className="w-fit bg-sacred-saffron text-white hover:bg-sacred-saffron/90"
                onMouseEnter={onEnterButton}
                onMouseLeave={onLeaveButton}
              >
                सभी अंक देखें
              </Button>
            </div>

            <div className="rounded-lg bg-gradient-to-r from-sacred-saffron/10 to-wisdom-gold/10 p-8 dark:from-sacred-saffron/20 dark:to-wisdom-gold/20">
              <h3 className="mb-6 text-2xl font-bold">अपनी रचना भेजें</h3>
              <p className="mb-6 text-cosmic-indigo/80 dark:text-white/80">
                यदि आप अपनी कविता, कहानी, लेख या अन्य साहित्यिक रचना हमारी पत्रिका में प्रकाशित करवाना चाहते हैं, तो हमें भेज सकते हैं।
              </p>
              <div className="space-y-4">
                <div className="rounded-lg bg-white p-4 dark:bg-cosmic-indigo/50">
                  <h4 className="mb-2 text-lg font-semibold text-sacred-saffron">प्रकाशन के लिए दिशानिर्देश</h4>
                  <ul className="space-y-1 text-sm text-cosmic-indigo/80 dark:text-white/80">
                    <li>• रचना मौलिक और अप्रकाशित होनी चाहिए</li>
                    <li>• शब्द सीमा: कविता (50-200 शब्द), कहानी (1000-2000 शब्द), लेख (800-1500 शब्द)</li>
                    <li>• रचना के साथ अपना नाम, कक्षा और संपर्क विवरण अवश्य दें</li>
                    <li>• रचना हिंदी यूनिकोड में टाइप की हुई होनी चाहिए</li>
                  </ul>
                </div>

                <div className="rounded-lg bg-white p-4 dark:bg-cosmic-indigo/50">
                  <h4 className="mb-2 text-lg font-semibold text-sacred-saffron">भेजने का तरीका</h4>
                  <p className="text-sm text-cosmic-indigo/80 dark:text-white/80">
                    अपनी रचना{" "}
                    <a
                      href="mailto:submissions@tatsam.nsut.ac.in"
                      className="text-sacred-saffron underline"
                      onMouseEnter={onEnterLink}
                      onMouseLeave={onLeaveLink}
                    >
                      submissions@tatsam.nsut.ac.in
                    </a>{" "}
                    पर ईमेल करें या हमारे ऑनलाइन फॉर्म के माध्यम से जमा करें।
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <Button
                  className="w-full bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90 dark:bg-white dark:text-cosmic-indigo dark:hover:bg-white/90"
                  onMouseEnter={onEnterButton}
                  onMouseLeave={onLeaveButton}
                >
                  रचना जमा करें
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

