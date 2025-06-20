"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Star, Clock, MapPin, ChefHat } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ThemeToggle } from "@/components/theme-toggle"

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisine, setSelectedCuisine] = useState("all")
  const [sortBy, setSortBy] = useState("rating")

  const restaurants = [
    {
      id: 1,
      name: "Bella Italia",
      cuisine: "Italian",
      rating: 4.8,
      reviewCount: 324,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      distance: "1.2 km",
      priceRange: "$$",
    },
    {
      id: 2,
      name: "Dragon Palace",
      cuisine: "Chinese",
      rating: 4.6,
      reviewCount: 256,
      deliveryTime: "30-40 min",
      deliveryFee: 1.99,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      distance: "2.1 km",
      priceRange: "$",
    },
    {
      id: 3,
      name: "Burger House",
      cuisine: "American",
      rating: 4.7,
      reviewCount: 189,
      deliveryTime: "20-30 min",
      deliveryFee: 2.49,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      distance: "0.8 km",
      priceRange: "$$",
    },
    {
      id: 4,
      name: "Sushi Zen",
      cuisine: "Japanese",
      rating: 4.9,
      reviewCount: 412,
      deliveryTime: "35-45 min",
      deliveryFee: 3.99,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      distance: "3.2 km",
      priceRange: "$$$",
    },
    {
      id: 5,
      name: "Taco Fiesta",
      cuisine: "Mexican",
      rating: 4.5,
      reviewCount: 167,
      deliveryTime: "25-35 min",
      deliveryFee: 1.99,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
      distance: "1.8 km",
      priceRange: "$",
    },
    {
      id: 6,
      name: "Le Bistro",
      cuisine: "French",
      rating: 4.8,
      reviewCount: 298,
      deliveryTime: "40-50 min",
      deliveryFee: 4.99,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
      distance: "2.7 km",
      priceRange: "$$$",
    },
  ]

  const cuisines = ["all", "Italian", "Chinese", "American", "Japanese", "Mexican", "French"]

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCuisine = selectedCuisine === "all" || restaurant.cuisine === selectedCuisine
    return matchesSearch && matchesCuisine
  })

  const sortedRestaurants = [...filteredRestaurants].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating
      case "deliveryTime":
        return Number.parseInt(a.deliveryTime) - Number.parseInt(b.deliveryTime)
      case "deliveryFee":
        return a.deliveryFee - b.deliveryFee
      default:
        return 0
    }
  })

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

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/auth/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link href="/cart">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                Cart (0)
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Restaurants</h1>
          <p className="text-muted-foreground">Discover amazing food from local restaurants</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search restaurants or cuisines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex gap-4">
              <Select value={selectedCuisine} onValueChange={setSelectedCuisine}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent>
                  {cuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine === "all" ? "All Cuisines" : cuisine}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Rating</SelectItem>
                  <SelectItem value="deliveryTime">Delivery Time</SelectItem>
                  <SelectItem value="deliveryFee">Delivery Fee</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {sortedRestaurants.length} restaurant{sortedRestaurants.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Restaurant Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedRestaurants.map((restaurant) => (
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
                <div className="absolute top-3 right-3 bg-black/50 text-white px-2 py-1 rounded text-sm">
                  {restaurant.priceRange}
                </div>
              </div>

              <CardContent className="p-6">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                      <p className="text-sm text-muted-foreground">{restaurant.cuisine}</p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{restaurant.rating}</span>
                      <span className="text-xs text-muted-foreground">({restaurant.reviewCount})</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{restaurant.deliveryTime}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{restaurant.distance}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Delivery: ${restaurant.deliveryFee}</span>
                    <Link href={`/restaurant/${restaurant.id}`}>
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                      >
                        View Menu
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {sortedRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No restaurants found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  )
}
