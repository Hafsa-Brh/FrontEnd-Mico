"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Star, Clock, MapPin, Plus, Minus, ShoppingCart, ChefHat, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeToggle } from "@/components/theme-toggle"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
}

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState("menu")

  const restaurant = {
    id: params.id,
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "/placeholder.svg?height=300&width=800",
    description:
      "Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    hours: "11:00 AM - 10:00 PM",
    priceRange: "$$",
  }

  const menuCategories = [
    {
      id: "appetizers",
      name: "Appetizers",
      items: [
        {
          id: "bruschetta",
          name: "Bruschetta",
          description: "Toasted bread topped with fresh tomatoes, basil, and garlic",
          price: 8.99,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "calamari",
          name: "Fried Calamari",
          description: "Crispy squid rings served with marinara sauce",
          price: 12.99,
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: "pasta",
      name: "Pasta",
      items: [
        {
          id: "carbonara",
          name: "Spaghetti Carbonara",
          description: "Classic pasta with eggs, cheese, pancetta, and black pepper",
          price: 16.99,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "bolognese",
          name: "Tagliatelle Bolognese",
          description: "Fresh pasta with slow-cooked meat sauce",
          price: 18.99,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "pesto",
          name: "Penne Pesto",
          description: "Penne pasta with homemade basil pesto and pine nuts",
          price: 15.99,
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
    {
      id: "pizza",
      name: "Pizza",
      items: [
        {
          id: "margherita",
          name: "Margherita",
          description: "Fresh mozzarella, tomato sauce, and basil",
          price: 14.99,
          image: "/placeholder.svg?height=150&width=200",
        },
        {
          id: "pepperoni",
          name: "Pepperoni",
          description: "Classic pepperoni with mozzarella and tomato sauce",
          price: 16.99,
          image: "/placeholder.svg?height=150&width=200",
        },
      ],
    },
  ]

  const addToCart = (item: any) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: string) => {
    setCart((prevCart) => {
      return prevCart.reduce((acc, cartItem) => {
        if (cartItem.id === itemId) {
          if (cartItem.quantity > 1) {
            acc.push({ ...cartItem, quantity: cartItem.quantity - 1 })
          }
        } else {
          acc.push(cartItem)
        }
        return acc
      }, [] as CartItem[])
    })
  }

  const getItemQuantity = (itemId: string) => {
    const item = cart.find((cartItem) => cartItem.id === itemId)
    return item ? item.quantity : 0
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/restaurants">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-amber-500 rounded-lg flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl">FoodFlow</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/cart">
              <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart ({getTotalItems()})
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Restaurant Hero */}
      <div className="relative h-64 md:h-80">
        <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="container mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{restaurant.rating}</span>
                <span>({restaurant.reviewCount} reviews)</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{restaurant.deliveryTime}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="w-4 h-4" />
                <span>Delivery: ${restaurant.deliveryFee}</span>
              </div>
              <Badge variant="secondary">{restaurant.cuisine}</Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="menu" className="space-y-8">
                {menuCategories.map((category) => (
                  <div key={category.id}>
                    <h2 className="text-2xl font-bold mb-4">{category.name}</h2>
                    <div className="grid gap-4">
                      {category.items.map((item) => (
                        <Card key={item.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex">
                              <div className="flex-1 p-6">
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="font-semibold text-lg">{item.name}</h3>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-red-500"
                                  >
                                    <Heart className="w-4 h-4" />
                                  </Button>
                                </div>
                                <p className="text-muted-foreground mb-4">{item.description}</p>
                                <div className="flex items-center justify-between">
                                  <span className="text-xl font-bold">${item.price}</span>
                                  <div className="flex items-center space-x-2">
                                    {getItemQuantity(item.id) > 0 ? (
                                      <div className="flex items-center space-x-2">
                                        <Button variant="outline" size="icon" onClick={() => removeFromCart(item.id)}>
                                          <Minus className="w-4 h-4" />
                                        </Button>
                                        <span className="w-8 text-center">{getItemQuantity(item.id)}</span>
                                        <Button variant="outline" size="icon" onClick={() => addToCart(item)}>
                                          <Plus className="w-4 h-4" />
                                        </Button>
                                      </div>
                                    ) : (
                                      <Button
                                        onClick={() => addToCart(item)}
                                        className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600"
                                      >
                                        <Plus className="w-4 h-4 mr-2" />
                                        Add
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="w-32 h-32 relative">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </TabsContent>

              <TabsContent value="info" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About {restaurant.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{restaurant.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Address</h4>
                        <p className="text-muted-foreground">{restaurant.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Phone</h4>
                        <p className="text-muted-foreground">{restaurant.phone}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Hours</h4>
                        <p className="text-muted-foreground">{restaurant.hours}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Price Range</h4>
                        <p className="text-muted-foreground">{restaurant.priceRange}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              ))}
                            </div>
                            <span className="font-semibold">John Doe</span>
                            <span className="text-sm text-muted-foreground">2 days ago</span>
                          </div>
                          <p className="text-muted-foreground">
                            Amazing food and great service! The pasta was perfectly cooked and the flavors were
                            incredible.
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.name}</h4>
                          <p className="text-sm text-muted-foreground">${item.price} each</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="w-8 h-8"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button variant="outline" size="icon" className="w-8 h-8" onClick={() => addToCart(item)}>
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    <div className="border-t pt-4 space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>${getTotalPrice().toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Delivery Fee</span>
                        <span>${restaurant.deliveryFee}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>${(getTotalPrice() + restaurant.deliveryFee).toFixed(2)}</span>
                      </div>
                    </div>

                    <Link href="/checkout">
                      <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                        Proceed to Checkout
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
