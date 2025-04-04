"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Feather, Heart, Music } from "lucide-react"
import Image from "next/image"

interface Activity {
  id: number
  title: string
  description: string
  image: string
  category: "meditation" | "study" | "service" | "cultural"
  icon: React.ReactNode
}

export default function Activities() {
  const activitiesRef = useRef<HTMLDivElement>(null)

  const activities: Activity[] = [
    {
      id: 1,
      title: "Daily Meditation Sessions",
      description: "Join our guided meditation sessions focused on self-inquiry and awareness.",
      image: "/placeholder.svg?height=300&width=400",
      category: "meditation",
      icon: <Feather className="h-6 w-6" />,
    },
    {
      id: 2,
      title: "Vedanta Study Groups",
      description: "Weekly gatherings to study and discuss classical Vedantic texts and their modern applications.",
      image: "/placeholder.svg?height=300&width=400",
      category: "study",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      id: 3,
      title: "Community Service Initiatives",
      description:
        "Regular service activities including food distribution, education support, and environmental projects.",
      image: "/placeholder.svg?height=300&width=400",
      category: "service",
      icon: <Heart className="h-6 w-6" />,
    },
    {
      id: 4,
      title: "Cultural Performances",
      description: "Classical music, dance, and theatrical performances exploring spiritual themes.",
      image: "/placeholder.svg?height=300&width=400",
      category: "cultural",
      icon: <Music className="h-6 w-6" />,
    },
  ]

  useEffect(() => {
    if (activitiesRef.current) {
      // Animate activity cards
      gsap.fromTo(
        ".activity-card",
        {
          scale: 0.9,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: activitiesRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section id="activities" className="relative py-20 bg-gradient-to-b from-white to-cosmic-indigo/5">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold tracking-wider md:text-5xl">Our Activities</h2>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80">
            Explore the various ways we engage with spiritual practice and community
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <div className="mb-8 flex justify-center">
            <TabsList className="bg-cosmic-indigo/10">
              <TabsTrigger value="all">All Activities</TabsTrigger>
              <TabsTrigger value="meditation">Meditation</TabsTrigger>
              <TabsTrigger value="study">Study</TabsTrigger>
              <TabsTrigger value="service">Service</TabsTrigger>
              <TabsTrigger value="cultural">Cultural</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all">
            <div ref={activitiesRef} className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {activities.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
              ))}
            </div>
          </TabsContent>

          {["meditation", "study", "service", "cultural"].map((category) => (
            <TabsContent key={category} value={category}>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {activities
                  .filter((activity) => activity.category === category)
                  .map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        <div className="mt-20">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="col-span-1 md:col-span-2">
              <h3 className="mb-6 text-3xl font-bold tracking-wider">Activity Calendar</h3>
              <div className="grid gap-4">
                {[
                  { day: "Monday", activities: ["Morning Meditation (6-7 AM)", "Evening Yoga (6-7:30 PM)"] },
                  { day: "Tuesday", activities: ["Bhagavad Gita Study (7-8:30 PM)"] },
                  { day: "Wednesday", activities: ["Morning Meditation (6-7 AM)", "Sanskrit Class (6-7 PM)"] },
                  { day: "Thursday", activities: ["Upanishad Discussion (7-8:30 PM)"] },
                  { day: "Friday", activities: ["Morning Meditation (6-7 AM)", "Bhajan & Kirtan (7-8:30 PM)"] },
                  { day: "Saturday", activities: ["Community Service (10 AM-1 PM)", "Cultural Program (6-8 PM)"] },
                  { day: "Sunday", activities: ["Full Day Retreat (9 AM-4 PM)"] },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="flex rounded-lg border border-cosmic-indigo/10 p-4 transition-colors hover:bg-cosmic-indigo/5"
                  >
                    <div className="w-24 shrink-0 font-medium text-sacred-saffron">{item.day}</div>
                    <div className="flex-1">
                      <ul className="space-y-1">
                        {item.activities.map((activity, i) => (
                          <li key={i} className="text-cosmic-indigo/80">
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold tracking-wider">Special Events</h3>

              <div className="rounded-lg bg-gradient-to-br from-cosmic-indigo/10 to-sacred-saffron/10 p-6">
                <h4 className="mb-2 text-xl font-semibold text-sacred-saffron">Annual Spiritual Retreat</h4>
                <p className="mb-4 text-cosmic-indigo/80">
                  A week-long immersive experience in the Himalayas, focusing on deep meditation and self-discovery.
                </p>
                <div className="text-sm text-cosmic-indigo/70">
                  <p>Next Date: June 15-22, 2025</p>
                  <p>Location: Rishikesh Ashram</p>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-sacred-saffron/10 to-wisdom-gold/10 p-6">
                <h4 className="mb-2 text-xl font-semibold text-sacred-saffron">Vedanta Conference</h4>
                <p className="mb-4 text-cosmic-indigo/80">
                  A gathering of scholars and practitioners to discuss contemporary applications of Vedantic philosophy.
                </p>
                <div className="text-sm text-cosmic-indigo/70">
                  <p>Next Date: August 10-12, 2025</p>
                  <p>Location: Convention Center</p>
                </div>
              </div>

              <div className="rounded-lg bg-gradient-to-br from-wisdom-gold/10 to-cosmic-indigo/10 p-6">
                <h4 className="mb-2 text-xl font-semibold text-sacred-saffron">Cultural Festival</h4>
                <p className="mb-4 text-cosmic-indigo/80">
                  A celebration of Indian spiritual and cultural traditions through music, dance, and art.
                </p>
                <div className="text-sm text-cosmic-indigo/70">
                  <p>Next Date: October 5, 2025</p>
                  <p>Location: Community Center</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ActivityCard({ activity }: { activity: Activity }) {
  return (
    <Card className="activity-card overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={activity.image || "/placeholder.svg"}
          alt={activity.title}
          width={400}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-indigo/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-4 text-white">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sacred-saffron">
            {activity.icon}
          </div>
          <h3 className="text-lg font-bold">{activity.title}</h3>
        </div>
      </div>
      <CardContent className="p-4">
        <p className="text-sm text-cosmic-indigo/80">{activity.description}</p>
      </CardContent>
    </Card>
  )
}

