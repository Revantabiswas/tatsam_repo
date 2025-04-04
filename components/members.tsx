"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface Member {
  id: number
  name: string
  role: string
  avatar: string
  karmaPoints: number
}

export default function Members() {
  const chakraRef = useRef<HTMLDivElement>(null)
  const treeRef = useRef<HTMLDivElement>(null)

  const members: Member[] = [
    {
      id: 1,
      name: "Arjun Sharma",
      role: "Meditation Guide",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 850,
    },
    {
      id: 2,
      name: "Priya Patel",
      role: "Yoga Instructor",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 720,
    },
    {
      id: 3,
      name: "Rahul Verma",
      role: "Sanskrit Scholar",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 650,
    },
    {
      id: 4,
      name: "Ananya Singh",
      role: "Philosophy Teacher",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 920,
    },
    {
      id: 5,
      name: "Vikram Mehta",
      role: "Event Coordinator",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 580,
    },
    {
      id: 6,
      name: "Meera Joshi",
      role: "Community Leader",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 810,
    },
    {
      id: 7,
      name: "Karan Malhotra",
      role: "Spiritual Guide",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 750,
    },
    {
      id: 8,
      name: "Neha Gupta",
      role: "Volunteer Coordinator",
      avatar: "/placeholder.svg?height=100&width=100",
      karmaPoints: 680,
    },
  ]

  useEffect(() => {
    if (chakraRef.current) {
      // Rotate the chakra of members
      gsap.to(chakraRef.current, {
        rotation: 360,
        duration: 60,
        repeat: -1,
        ease: "none",
      })

      // Animate member avatars
      const avatars = chakraRef.current.querySelectorAll(".member-avatar")
      avatars.forEach((avatar, i) => {
        gsap.to(avatar, {
          y: -10,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        })
      })
    }

    if (treeRef.current) {
      // Animate the tree growth based on scroll
      gsap.fromTo(
        treeRef.current,
        { scaleY: 0.3, opacity: 0.5 },
        {
          scaleY: 1,
          opacity: 1,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: treeRef.current,
            start: "top 80%",
            end: "bottom 20%",
            scrub: true,
          },
        },
      )

      // Animate the leaves
      const leaves = treeRef.current.querySelectorAll(".tree-leaf")
      leaves.forEach((leaf, i) => {
        gsap.fromTo(
          leaf,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.5,
            delay: 0.1 * i,
            ease: "back.out(1.7)",
            scrollTrigger: {
              trigger: treeRef.current,
              start: "top 70%",
            },
          },
        )
      })
    }
  }, [])

  return (
    <section id="members" className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            साधक सभा <span className="text-xl font-normal">(Members' Corner)</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80">
            Our community of seekers on the path to self-realization
          </p>
        </div>

        <div className="grid gap-16 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center">
            <div ref={chakraRef} className="relative h-80 w-80">
              {members.map((member, index) => {
                const angle = index * 45 * (Math.PI / 180)
                const radius = 120
                const x = radius * Math.cos(angle)
                const y = radius * Math.sin(angle)

                return (
                  <div
                    key={member.id}
                    className="member-avatar absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                  >
                    <Avatar className="h-16 w-16 border-2 border-wisdom-gold transition-all duration-300 hover:scale-110 hover:border-sacred-saffron">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback className="bg-cosmic-indigo text-white">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute left-1/2 top-full mt-2 w-max -translate-x-1/2 text-center">
                      <p className="whitespace-nowrap text-sm font-medium">{member.name}</p>
                      <p className="text-xs text-cosmic-indigo/70">{member.role}</p>
                    </div>
                  </div>
                )
              })}

              <div className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sacred-saffron to-wisdom-gold p-1">
                <div className="flex h-full w-full items-center justify-center rounded-full bg-white">
                  <span className="text-2xl font-bold text-cosmic-indigo">ॐ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h3 className="mb-4 text-2xl font-bold">Karma Points System</h3>
              <p className="text-cosmic-indigo/80">
                Our members earn Karma Points through participation in events, volunteering, and contributing to the
                community. These points represent your spiritual growth and service to others.
              </p>
            </div>

            <div className="relative h-64">
              <div ref={treeRef} className="absolute bottom-0 left-1/2 h-full w-64 -translate-x-1/2 transform-gpu">
                {/* Tree trunk */}
                <div className="absolute bottom-0 left-1/2 h-full w-8 -translate-x-1/2 rounded-t-full bg-gradient-to-t from-cosmic-indigo/80 to-sacred-saffron/80"></div>

                {/* Tree branches */}
                {[30, 60, 90, 120, 150].map((top, i) => (
                  <div
                    key={i}
                    className="absolute left-1/2 h-2 w-40 -translate-x-1/2 bg-sacred-saffron/70"
                    style={{ top: `${top}px`, width: `${140 - i * 15}px` }}
                  ></div>
                ))}

                {/* Tree leaves */}
                {Array.from({ length: 20 }).map((_, i) => {
                  const size = Math.random() * 10 + 10
                  const left = Math.random() * 200 - 100
                  const top = Math.random() * 160

                  return (
                    <div
                      key={i}
                      className="tree-leaf absolute rounded-full bg-wisdom-gold/80"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        left: `calc(50% + ${left}px)`,
                        top: `${top}px`,
                      }}
                    ></div>
                  )
                })}
              </div>

              {/* Karma points labels */}
              {[
                { points: 1000, label: "Enlightenment", top: 10 },
                { points: 750, label: "Wisdom", top: 70 },
                { points: 500, label: "Awareness", top: 130 },
                { points: 250, label: "Beginner", top: 190 },
              ].map((level, i) => (
                <div key={i} className="absolute left-0 flex items-center" style={{ top: `${level.top}px` }}>
                  <div className="h-0.5 w-12 bg-cosmic-indigo/30"></div>
                  <div className="ml-2">
                    <p className="text-xs font-medium text-cosmic-indigo">{level.points}</p>
                    <p className="text-xs text-cosmic-indigo/70">{level.label}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-cosmic-indigo/70">Total Members</p>
                    <p className="text-3xl font-bold text-sacred-saffron">120+</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="text-center">
                    <p className="text-sm text-cosmic-indigo/70">Active Members</p>
                    <p className="text-3xl font-bold text-sacred-saffron">85</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Button className="bg-cosmic-indigo text-white hover:bg-cosmic-indigo/90">Join Our Community</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

