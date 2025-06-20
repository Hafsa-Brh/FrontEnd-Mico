"use client"

import Link from "next/link"
import { ChefHat, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">FoodFlow</span>
          </Link>
          <nav className="flex items-center space-x-2">
            <Link href="/restaurants">
              <Button variant="ghost" size="default">
                Restaurants
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" size="default">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="default" className="font-bold text-orange-500">
                Contact
              </Button>
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* Contact Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 mb-4">
            Contact Us
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            We're Here to Help!
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Have a question, suggestion, or need support? Reach out to the FoodFlow team and we’ll get back to you as soon as possible.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="mailto:support@foodflow.com" className="text-orange-600 hover:underline">
                support@foodflow.com
              </a>
            </CardContent>
          </Card>
          <Card className="p-6 text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <Phone className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <a href="tel:+15551234567" className="text-orange-600 hover:underline">
                +1 (555) 123-4567
              </a>
            </CardContent>
          </Card>
          <Card className="p-6 text-center">
            <CardHeader>
              <div className="flex justify-center mb-2">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent>
              123 Main Street<br />
              Downtown, City, Country
            </CardContent>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Send Us a Message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                required
              />
              <textarea
                placeholder="Your Message"
                className="w-full px-4 py-2 border rounded focus:outline-none"
                rows={4}
                required
              />
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
              >
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}