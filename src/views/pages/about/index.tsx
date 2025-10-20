"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Users, Target, Zap, Heart } from "lucide-react"
import Image from "next/image"

// Mock team members data - Replace with API call later
const teamMembers = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Founder & CEO",
    bio: "Visionary leader with 15+ years in tech entrepreneurship",
    image: "/professional-woman-ceo.jpg",
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "CTO",
    bio: "Full-stack engineer passionate about scalable architecture",
    image: "/professional-man-developer.jpg",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Head of Design",
    bio: "Creative designer focused on user-centered experiences",
    image: "/professional-woman-designer.jpg",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Head of Operations",
    bio: "Operations expert ensuring smooth business growth",
    image: "/professional-man-operations.jpg",
  },
]

// Mock company values
const values = [
  {
    icon: Target,
    title: "Customer First",
    description: "We prioritize customer needs and satisfaction in every decision we make.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "We constantly push boundaries and embrace new technologies and ideas.",
  },
  {
    icon: Heart,
    title: "Integrity",
    description: "We operate with transparency and honesty in all our business dealings.",
  },
  {
    icon: Users,
    title: "Community",
    description: "We believe in building strong relationships with our team and customers.",
  },
]

export default function AboutPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null)

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 to-background py-20 md:py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge className="mb-4 inline-block" variant="secondary">
              About Our Company
            </Badge>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl text-balance">
              Building the Future Together
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground md:text-xl">
              We&apos;re on a mission to revolutionize how people connect, shop, and share their stories online.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/blog">Read Our Blog</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-2">
            {/* Mission */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Mission</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  To create a seamless digital marketplace that empowers sellers and delights buyers, fostering a
                  community where quality products and exceptional service thrive.
                </p>
                <p className="text-muted-foreground">
                  We believe in democratizing e-commerce, making it accessible to businesses of all sizes while
                  maintaining the highest standards of quality and customer satisfaction.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Our Vision</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  To become the world&apos;s most trusted online marketplace, where innovation meets integrity and every
                  transaction creates value for all stakeholders.
                </p>
                <p className="text-muted-foreground">
                  We envision a future where technology enables meaningful connections between people, transcending
                  geographical boundaries and creating opportunities for growth.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="bg-muted/50 py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Core Values</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              These principles guide every decision we make and shape our company culture.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon
              return (
                <Card key={value.title} className="flex flex-col">
                  <CardHeader>
                    <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Meet Our Team</h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Talented individuals united by a shared vision to transform the digital marketplace.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {teamMembers.map((member) => (
              <Card
                key={member.id}
                className="overflow-hidden transition-all duration-300 hover:shadow-lg"
                onMouseEnter={() => setHoveredMember(member.id)}
                onMouseLeave={() => setHoveredMember(null)}
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <Image
                    width={100}
                    height={100}
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="h-full w-full object-cover transition-transform duration-300"
                    style={{
                      transform: hoveredMember === member.id ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{member.name}</CardTitle>
                  <CardDescription className="font-medium text-primary">{member.role}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { label: "Active Sellers", value: "50K+" },
              { label: "Products Listed", value: "2M+" },
              { label: "Happy Customers", value: "500K+" },
              { label: "Countries Served", value: "45+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="mb-2 text-4xl font-bold md:text-5xl">{stat.value}</div>
                <p className="text-sm opacity-90">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Join Our Community</h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Whether you&apos;re a seller looking to grow your business or a buyer seeking quality products, we&apos;d love to have
            you join us.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/shop">
                Explore Shops <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
