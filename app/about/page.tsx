"use client"

import Image from "next/image"
import Link from "next/link"
import { ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
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
              <Button variant="ghost" size="default" className="font-bold text-orange-500">
                About
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" size="default">
                Contact
              </Button>
            </Link>
          </nav>
          <ThemeToggle />
        </div>
      </header>

      {/* About Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200 mb-4">
            About FoodFlow
          </Badge>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
            Bringing Delicious Food to Your Doorstep
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            FoodFlow is your go-to platform for discovering the best local restaurants and enjoying fast, reliable food delivery. We partner with top-rated eateries to ensure every meal is fresh, hot, and delicious.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/delivery-bike.png" alt="Fast Delivery" width={40} height={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Lightning Fast Delivery</h3>
            <p className="text-muted-foreground">
              Our optimized delivery network ensures your food arrives in 30 minutes or less, every time.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Image src="/chef-hat.png" alt="Top Restaurants" width={40} height={40} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Curated Restaurants</h3>
            <p className="text-muted-foreground">
              We handpick the best local restaurants, so you always get quality meals from trusted chefs.
            </p>
          </Card>
        </div>

        <Card className="max-w-2xl mx-auto bg-gradient-to-r from-orange-500 to-amber-500 text-white">
          <CardHeader>
            <CardTitle>Our Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">
              At FoodFlow, we believe everyone deserves great food, delivered with care. Our mission is to connect people with their favorite flavors, support local businesses, and make every meal a moment to savor.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}