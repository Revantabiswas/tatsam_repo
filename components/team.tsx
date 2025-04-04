"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface TeamProps {
  onEnterLink: () => void
  onLeaveLink: () => void
}

interface TeamMember {
  id: number
  name: string
  role: string
  year: string
  bio: string
  avatar: string
  social: {
    twitter?: string
    facebook?: string
    instagram?: string
    linkedin?: string
  }
}

export default function Team({ onEnterLink, onLeaveLink }: TeamProps) {
  const teamRef = useRef<HTMLDivElement>(null)

  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "अनुराग शर्मा",
      role: "अध्यक्ष",
      year: "बी.टेक. अंतिम वर्ष",
      bio: "हिंदी साहित्य और कविता के प्रति गहरी रुचि रखने वाले अनुराग पिछले 3 वर्षों से तत्सम् से जुड़े हैं और कई राष्ट्रीय स्तर की प्रतियोगिताओं में विजेता रहे हैं।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 2,
      name: "प्रियंका गुप्ता",
      role: "उपाध्यक्ष",
      year: "बी.टेक. तृतीय वर्ष",
      bio: "प्रियंका एक प्रतिभाशाली कवयित्री हैं और उन्होंने कई कविता संग्रहों में अपनी रचनाएँ प्रकाशित की हैं। वे तत्सम् की कार्यशालाओं का संचालन करती हैं।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        facebook: "#",
        linkedin: "#",
      },
    },
    {
      id: 3,
      name: "विकास मेहता",
      role: "सचिव",
      year: "बी.टेक. द्वितीय वर्ष",
      bio: "विकास एक उत्कृष्ट वक्ता और लेखक हैं। वे तत्सम् के सभी कार्यक्रमों के आयोजन और प्रबंधन की देखरेख करते हैं।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 4,
      name: "नेहा सिंह",
      role: "कोषाध्यक्ष",
      year: "बी.टेक. तृतीय वर्ष",
      bio: "नेहा संस्था के वित्तीय मामलों की देखरेख करती हैं और उन्हें हिंदी साहित्य के साथ-साथ वित्त में भी विशेषज्ञता है।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        instagram: "#",
      },
    },
    {
      id: 5,
      name: "आदित्य वर्मा",
      role: "प्रचार प्रमुख",
      year: "बी.टेक. द्वितीय वर्ष",
      bio: "आदित्य संस्था के सोशल मीडिया और प्रचार गतिविधियों का प्रबंधन करते हैं। उन्हें डिजिटल मार्केटिंग में विशेष रुचि है।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 6,
      name: "तनिष्का पटेल",
      role: "कार्यक्रम समन्वयक",
      year: "बी.टेक. द्वितीय वर्ष",
      bio: "तनिष्का संस्था के कार्यक्रमों और प्रतियोगिताओं का समन्वय करती हैं। वे एक प्रतिभाशाली कहानीकार भी हैं।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        facebook: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 7,
      name: "राहुल त्यागी",
      role: "तकनीकी प्रमुख",
      year: "बी.टेक. तृतीय वर्ष",
      bio: "राहुल संस्था की वेबसाइट और तकनीकी पहलुओं का प्रबंधन करते हैं। उन्हें प्रोग्रामिंग और हिंदी साहित्य दोनों में रुचि है।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        twitter: "#",
        instagram: "#",
        linkedin: "#",
      },
    },
    {
      id: 8,
      name: "अंजलि शर्मा",
      role: "सदस्यता प्रमुख",
      year: "बी.टेक. द्वितीय वर्ष",
      bio: "अंजलि नए सदस्यों के प्रवेश और प्रशिक्षण की देखरेख करती हैं। वे एक उत्कृष्ट वक्ता और संगठनकर्ता हैं।",
      avatar: "/placeholder.svg?height=200&width=200",
      social: {
        facebook: "#",
        instagram: "#",
      },
    },
  ]

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    if (teamRef.current) {
      // Animate team section heading
      gsap.fromTo(
        ".team-heading",
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
            trigger: teamRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate team cards
      gsap.fromTo(
        ".team-card",
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".team-grid",
            start: "top 80%",
          },
        },
      )

      // Animate team tabs
      gsap.fromTo(
        ".team-tabs",
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
            trigger: teamRef.current,
            start: "top 80%",
          },
        },
      )
    }
  }, [])

  return (
    <section
      id="team"
      className="relative py-20 bg-gradient-to-b from-cosmic-indigo/5 to-white dark:from-cosmic-indigo/90 dark:to-cosmic-indigo/95"
    >
      <div ref={teamRef} className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h2 className="team-heading mb-4 text-4xl font-bold tracking-wider md:text-5xl">
            हमारी <span className="text-sacred-saffron">टीम</span>
          </h2>
          <div className="mx-auto mb-6 h-1 w-24 bg-gradient-to-r from-sacred-saffron to-wisdom-gold"></div>
          <p className="mx-auto max-w-2xl text-lg text-cosmic-indigo/80 dark:text-white/80">
            तत्सम् के उत्साही और प्रतिभाशाली सदस्य जो संस्था को आगे बढ़ाते हैं
          </p>
        </div>

        <div className="team-tabs mb-12">
          <Tabs defaultValue="core" className="w-full">
            <div className="mb-8 flex justify-center">
              <TabsList className="bg-cosmic-indigo/10 dark:bg-white/10">
                <TabsTrigger value="core">मुख्य टीम</TabsTrigger>
                <TabsTrigger value="coordinators">समन्वयक</TabsTrigger>
                <TabsTrigger value="volunteers">स्वयंसेवक</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="core">
              <div className="team-grid grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.slice(0, 4).map((member) => (
                  <TeamMemberCard key={member.id} member={member} onEnterLink={onEnterLink} onLeaveLink={onLeaveLink} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="coordinators">
              <div className="team-grid grid gap-4 sm:gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {teamMembers.slice(4, 8).map((member) => (
                  <TeamMemberCard key={member.id} member={member} onEnterLink={onEnterLink} onLeaveLink={onLeaveLink} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="volunteers">
              <div className="text-center py-8">
                <p className="text-lg text-cosmic-indigo/80 dark:text-white/80">
                  तत्सम् के 50+ स्वयंसेवक विभिन्न कार्यक्रमों और गतिविधियों में सहायता करते हैं।
                </p>
                <p className="mt-4 text-lg text-cosmic-indigo/80 dark:text-white/80">स्वयंसेवक बनने के लिए हमसे संपर्क करें!</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-16 rounded-lg bg-gradient-to-r from-sacred-saffron/10 to-wisdom-gold/10 p-8 dark:from-sacred-saffron/20 dark:to-wisdom-gold/20">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-bold">टीम में शामिल हों</h3>
              <p className="text-cosmic-indigo/80 dark:text-white/80">
                यदि आप हिंदी साहित्य, कविता, लेखन या अन्य साहित्यिक गतिविधियों में रुचि रखते हैं, तो तत्सम् टीम आपका स्वागत करती है। हम
                नए विचारों और प्रतिभाओं का हमेशा स्वागत करते हैं।
              </p>
              <ul className="mt-4 space-y-2 text-cosmic-indigo/80 dark:text-white/80">
                <li className="flex items-start">
                  <span className="mr-2 text-sacred-saffron">•</span>
                  <span>नए सदस्यों के लिए वर्ष में दो बार प्रवेश प्रक्रिया</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sacred-saffron">•</span>
                  <span>विभिन्न विभागों में काम करने का अवसर</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sacred-saffron">•</span>
                  <span>अपनी प्रतिभा और कौशल विकसित करने का मंच</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2 text-sacred-saffron">•</span>
                  <span>प्रसिद्ध लेखकों और कवियों से मिलने का अवसर</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col justify-center space-y-4">
              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-cosmic-indigo/50">
                <h4 className="mb-2 text-xl font-semibold text-sacred-saffron">अगली प्रवेश प्रक्रिया</h4>
                <p className="text-cosmic-indigo/80 dark:text-white/80">
                  अगस्त 2024 में नए सत्र के लिए प्रवेश प्रक्रिया शुरू होगी। अपडेट के लिए हमारे सोशल मीडिया पेज फॉलो करें।
                </p>
              </div>

              <div className="rounded-lg bg-white p-6 shadow-md dark:bg-cosmic-indigo/50">
                <h4 className="mb-2 text-xl font-semibold text-sacred-saffron">संपर्क करें</h4>
                <p className="text-cosmic-indigo/80 dark:text-white/80">
                  अधिक जानकारी के लिए हमें{" "}
                  <a
                    href="mailto:tatsam@nsut.ac.in"
                    className="text-sacred-saffron underline"
                    onMouseEnter={onEnterLink}
                    onMouseLeave={onLeaveLink}
                  >
                    tatsam@nsut.ac.in
                  </a>{" "}
                  पर ईमेल करें या हमारे सोशल मीडिया पर संपर्क करें।
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

interface TeamMemberCardProps {
  member: TeamMember
  onEnterLink: () => void
  onLeaveLink: () => void
}

function TeamMemberCard({ member, onEnterLink, onLeaveLink }: TeamMemberCardProps) {
  return (
    <Card className="team-card overflow-hidden transition-all duration-300 hover:shadow-lg dark:bg-cosmic-indigo/30">
      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden bg-gradient-to-b from-cosmic-indigo/10 to-sacred-saffron/10 dark:from-cosmic-indigo/50 dark:to-sacred-saffron/30">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
          <Avatar className="h-24 w-24 sm:h-28 sm:w-28 md:h-32 md:w-32 border-4 border-white shadow-lg dark:border-cosmic-indigo/80">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback className="bg-cosmic-indigo text-2xl text-white dark:bg-sacred-saffron">
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>

      <CardContent className="p-4 sm:p-6 text-center">
        <h3 className="mb-1 text-lg sm:text-xl font-bold">{member.name}</h3>
        <p className="mb-1 text-sm font-medium text-sacred-saffron">{member.role}</p>
        <p className="mb-2 text-xs text-cosmic-indigo/70 dark:text-white/70">{member.year}</p>
        <p className="mb-4 text-xs sm:text-sm text-cosmic-indigo/80 dark:text-white/80 line-clamp-3">{member.bio}</p>

        <div className="flex justify-center space-x-4">
          {member.social.twitter && (
            <a
              href={member.social.twitter}
              className="text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
          {member.social.facebook && (
            <a
              href={member.social.facebook}
              className="text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <Facebook className="h-5 w-5" />
            </a>
          )}
          {member.social.instagram && (
            <a
              href={member.social.instagram}
              className="text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {member.social.linkedin && (
            <a
              href={member.social.linkedin}
              className="text-cosmic-indigo/70 transition-colors hover:text-sacred-saffron dark:text-white/70"
              onMouseEnter={onEnterLink}
              onMouseLeave={onLeaveLink}
            >
              <Linkedin className="h-5 w-5" />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

