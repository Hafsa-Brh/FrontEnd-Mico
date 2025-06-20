"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Star, Clock, Truck, Shield, Users, ChefHat, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"

export default function HomePage() {
  const [email, setEmail] = useState("")

  const featuredRestaurants = [
    {
      id: 1,
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/84/d7/23/bella-italia-queensway.jpg?w=900&h=500&s=1", // <-- image goes here
      featured: true,
    },
    {
      id: 2,
      name: "Dragon Palace",
      cuisine: "Chinese",
      rating: 4.6,
      deliveryTime: "30-40 min",
      image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/31/76/3d/interior.jpg?w=700&h=400&s=1", // <-- image goes here
      featured: true,
    },
    {
      id: 3,
      name: "Burger House",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "20-30 min",
      image: "https://mir-s3-cdn-cf.behance.net/project_modules/source/c205f121370803.5630015f2f667.jpg", // <-- image goes here
      featured: true,
    },
  ]

  const stats = [
    { label: "Active Restaurants", value: "10K+", icon: ChefHat },
    { label: "Happy Customers", value: "500K+", icon: Users },
    { label: "Orders Delivered", value: "2M+", icon: Truck },
    { label: "Cities Covered", value: "50+", icon: Smartphone },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
              <ChefHat className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">FoodFlow</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/restaurants" className="text-muted-foreground hover:text-foreground transition-colors">
              Restaurants
            </Link>
            <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About
            </Link>
            <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20" />
        <div className="container mx-auto px-4 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                  🚀 Now delivering in 50+ cities
                </Badge>
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Delicious food,{" "}
                  <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-transparent">
                    delivered fast
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Order from your favorite restaurants and get fresh, hot meals delivered to your doorstep in minutes.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/restaurants" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                  >
                    Order Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/restaurant/register">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Partner with us
                  </Button>
                </Link>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-orange-400 to-amber-400 border-2 border-background"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">500K+ happy customers</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">4.8</span>
                  <span className="text-sm text-muted-foreground">(12K reviews)</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <Image
                  src="https://thumbs.dreamstime.com/b/person-using-mobile-app-to-order-food-delivery-emphasizing-convenience-demand-services-illustration-generative-ai-272266324.jpg"
                  alt="Delicious food delivered"
                  width={500}
                  height={600}
                  className="w-full h-auto rounded-xl shadow-lg border border-orange-100"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400/20 to-amber-400/20 blur-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center mx-auto">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">Featured Restaurants</h2>
            <p className="text-xl text-muted-foreground">Discover amazing food from top-rated restaurants</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants.map((restaurant) => (
              <Card key={restaurant.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative">
                  <Image
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    width={300}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {restaurant.featured && (
                    <Badge className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-amber-500">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{restaurant.rating}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{restaurant.cuisine}</span>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    <Link href={`/restaurant/${restaurant.id}`}>
                      <Button className="w-full mt-4" variant="outline">
                        View Menu
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/restaurants">
              <Button size="lg" variant="outline">
                View All Restaurants
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">Why Choose FoodFlow?</h2>
            <p className="text-xl text-muted-foreground">Experience the future of food delivery</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Truck className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Fast Delivery</h3>
              <p className="text-muted-foreground">
                Get your food delivered in 30 minutes or less with our optimized delivery network.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Secure Payments</h3>
              <p className="text-muted-foreground">
                Your payments are protected with bank-level security and multiple payment options.
              </p>
            </Card>

            <Card className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Quality Food</h3>
              <p className="text-muted-foreground">
                We partner with the best restaurants to ensure you get fresh, delicious meals every time.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
            <CardContent className="p-12 text-center">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">Stay Updated</h2>
              <p className="text-xl mb-8 opacity-90">Get notified about new restaurants, exclusive deals, and more!</p>

              <div className="max-w-md mx-auto flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white text-black"
                />
                <Button variant="secondary" className="bg-white text-orange-500 hover:bg-gray-100">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                  <ChefHat className="w-5 h-5 text-white" />
                </div>
                <span className="font-bold text-xl">FoodFlow</span>
              </Link>
              <p className="text-muted-foreground">Delivering happiness, one meal at a time.</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Company</h3>
              <div className="space-y-2">
                <Link href="/about" className="block text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
                <Link href="/careers" className="block text-muted-foreground hover:text-foreground">
                  Careers
                </Link>
                <Link href="/press" className="block text-muted-foreground hover:text-foreground">
                  Press
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Support</h3>
              <div className="space-y-2">
                <Link href="/help" className="block text-muted-foreground hover:text-foreground">
                  Help Center
                </Link>
                <Link href="/contact" className="block text-muted-foreground hover:text-foreground">
                  Contact Us
                </Link>
                <Link href="/safety" className="block text-muted-foreground hover:text-foreground">
                  Safety
                </Link>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold">Legal</h3>
              <div className="space-y-2">
                <Link href="/privacy" className="block text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="block text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="block text-muted-foreground hover:text-foreground">
                  Cookie Policy
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 FoodFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
