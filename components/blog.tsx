"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar, MessageCircle, Share2 } from "lucide-react"
import Image from "next/image"

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  author: {
    name: string
    avatar: string
  }
  image: string
  comments: number
}

export default function Blog() {
  const blogRef = useRef<HTMLDivElement>(null)

  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Understanding the Concept of Maya in Advaita Vedanta",
      excerpt:
        "Explore the profound concept of Maya (illusion) and how it shapes our perception of reality according to Advaita Vedanta philosophy.",
      date: "May 15, 2025",
      author: {
        name: "Dr. Aditya Sharma",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      comments: 12,
    },
    {
      id: 2,
      title: "The Practice of Self-Inquiry: Who Am I?",
      excerpt:
        "A deep dive into the transformative practice of self-inquiry (Atma Vichara) as taught by Ramana Maharshi and its relevance today.",
      date: "April 28, 2025",
      author: {
        name: "Priya Patel",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      comments: 8,
    },
    {
      id: 3,
      title: "Integrating Vedantic Wisdom in Modern Life",
      excerpt:
        "Practical ways to apply the timeless teachings of Vedanta in our daily lives, relationships, and work in the contemporary world.",
      date: "April 10, 2025",
      author: {
        name: "Rajiv Malhotra",
        avatar: "/placeholder.svg?height=100&width=100",
      },
      image: "/placeholder.svg?height=400&width=600",
      comments: 15,
    },
  ]

  useEffect(() => {
    if (blogRef.current) {
      // Animate blog cards with palm-leaf manuscript effect
      gsap.fromTo(
        ".blog-card",
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
            trigger: blogRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate ink drops in comment section
      gsap.fromTo(
        ".ink-drop",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 0.7,
          duration: 0.5,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: blogRef.current,
            start: "top 70%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="blog" className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            वेदवाक्यम् <span className="text-xl font-normal">(Our Blog)</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80">
            Insights and reflections on Vedantic philosophy and spiritual practice
          </p>
        </div>

        <div ref={blogRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Card key={post.id} className="blog-card overflow-hidden transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
              </div>

              <CardHeader className="relative">
                <div className="absolute -top-6 left-4 flex items-center space-x-2">
                  <Avatar className="border-2 border-white">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="bg-cosmic-indigo text-white">
                      {post.author.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="rounded-md bg-white p-1 text-sm shadow-md">
                    <p className="font-medium text-cosmic-indigo">{post.author.name}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center space-x-2 text-sm text-cosmic-indigo/70">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>

                <CardTitle className="text-xl font-bold text-cosmic-indigo">{post.title}</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-cosmic-indigo/80">{post.excerpt}</p>
              </CardContent>

              <CardFooter className="flex items-center justify-between border-t border-cosmic-indigo/10 p-4">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-sm text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments} Comments</span>
                  </button>

                  <button className="flex items-center space-x-1 text-sm text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron">
                    <Share2 className="h-4 w-4" />
                    <span>Share</span>
                  </button>
                </div>

                <Button variant="ghost" className="text-cosmic-indigo hover:text-sacred-saffron">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="relative mt-8">
          {/* Ink drops decoration */}
          {Array.from({ length: 5 }).map((_, i) => {
            const size = Math.random() * 20 + 10
            const left = Math.random() * 100

            return (
              <div
                key={i}
                className="ink-drop absolute rounded-full bg-cosmic-indigo/20"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  left: `${left}%`,
                  top: `${i * 10}px`,
                }}
              ></div>
            )
          })}

          <div className="mt-12 flex justify-center">
            <Button className="bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90">View All Posts</Button>
          </div>
        </div>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-2">
            <div className="flex flex-col justify-center space-y-6">
              <h3 className="text-3xl font-bold tracking-wider">Subscribe to Our Newsletter</h3>
              <p className="text-lg text-cosmic-indigo/80">
                Stay updated with our latest articles, events, and spiritual insights delivered directly to your inbox.
              </p>
              <div className="flex max-w-md space-x-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-md border border-cosmic-indigo/20 px-4 py-2 focus:border-sacred-saffron focus:outline-none"
                />
                <Button className="bg-sacred-saffron text-white hover:bg-sacred-saffron/90">Subscribe</Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <h4 className="text-xl font-bold">Popular Categories</h4>
                <ul className="space-y-2">
                  {["Advaita Vedanta", "Meditation", "Sanskrit", "Bhagavad Gita", "Upanishads"].map((category, i) => (
                    <li key={i}>
                      <a href="#" className="text-cosmic-indigo/80 transition-colors hover:text-sacred-saffron">
                        {category}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold">Recent Comments</h4>
                <div className="space-y-3">
                  {[
                    { author: "Arjun S.", text: "This article changed my perspective on meditation..." },
                    { author: "Meera J.", text: "I've been practicing self-inquiry as suggested..." },
                    { author: "Vikram M.", text: "The explanation of Maya was very clear and helpful..." },
                  ].map((comment, i) => (
                    <div key={i} className="text-sm">
                      <p className="font-medium text-sacred-saffron">{comment.author}</p>
                      <p className="text-cosmic-indigo/70">{comment.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

