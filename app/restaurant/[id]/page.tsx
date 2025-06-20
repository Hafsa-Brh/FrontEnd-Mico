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

// --- RESTAURANTS DATA ---
const restaurants = [
  {
    id: "1",
    name: "Bella Italia",
    cuisine: "Italian",
    rating: 4.8,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 2.99,
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/22/84/d7/23/bella-italia-queensway.jpg?w=900&h=500&s=1",
    description: "Authentic Italian cuisine with fresh ingredients and traditional recipes passed down through generations.",
    address: "123 Main Street, Downtown",
    phone: "+1 (555) 123-4567",
    hours: "11:00 AM - 10:00 PM",
    priceRange: "$$",
    menuCategories: [
      {
        id: "appetizers",
        name: "Appetizers",
        items: [
          {
            id: "bruschetta",
            name: "Bruschetta",
            description: "Toasted bread topped with fresh tomatoes, basil, and garlic",
            price: 8.99,
            image: "https://www.cucinabyelena.com/wp-content/uploads/2022/06/0Z4A2548-600x800.jpg",
          },
          {
            id: "calamari",
            name: "Fried Calamari",
            description: "Crispy squid rings served with marinara sauce",
            price: 12.99,
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpWjuv9S-RJVCeFbxHM9TJ3ZugqhfayqWoag&s",
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
            image: "https://www.cookingclassy.com/wp-content/uploads/2020/10/spaghetti-carbonara-01.jpg",
          },
          {
            id: "bolognese",
            name: "Tagliatelle Bolognese",
            description: "Fresh pasta with slow-cooked meat sauce",
            price: 18.99,
            image: "https://bakerbynature.com/wp-content/uploads/2024/10/bolognese-285.jpg",
          },
          {
            id: "pesto",
            name: "Penne Pesto",
            description: "Penne pasta with homemade basil pesto and pine nuts",
            price: 15.99,
            image: "https://hillskas.com/wp-content/uploads/2024/10/pesto-pasta.jpg",
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
            image: "https://thumbs.dreamstime.com/b/delicious-margherita-pizza-topped-fresh-mozzarella-basil-leaves-delicious-margherita-pizza-topped-fresh-mozzarella-375689605.jpg",
          },
          {
            id: "pepperoni",
            name: "Pepperoni",
            description: "Classic pepperoni with mozzarella and tomato sauce",
            price: 16.99,
            image: "https://img.freepik.com/premium-photo/classic-pepperoni-pizza-with-crispy-thin-crust-gooey-mozzarella-cheese-tangy-tomato-sauce-plenty-pepperoni-slices_1310094-103188.jpg",
          },
        ],
      },
    ],
  },
  {
    id: "4",
    name: "Sushi Zen",
    cuisine: "Japanese",
    rating: 4.9,
    reviewCount: 412,
    deliveryTime: "35-45 min",
    deliveryFee: 3.99,
    image: "https://static.wixstatic.com/media/6e2a1a_1632ed5e977047779e5f08d2ae851ac3~mv2.jpg/v1/fill/w_640,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/6e2a1a_1632ed5e977047779e5f08d2ae851ac3~mv2.jpg",
    description: "Fresh sushi and Japanese cuisine.",
    address: "456 Sushi Ave, Midtown",
    phone: "+1 (555) 987-6543",
    hours: "12:00 PM - 11:00 PM",
    priceRange: "$$$",
    menuCategories: [
      {
        id: "sushi",
        name: "Sushi",
        items: [
          {
            id: "salmon-nigiri",
            name: "Salmon Nigiri",
            description: "Fresh salmon over rice.",
            price: 5.99,
            image: "https://aisforappleau.com/wp-content/uploads/2023/07/how-to-make-sushi-salmon-nigiri-6-500x500.jpg",
          },
          {
            id: "tuna-sashimi",
            name: "Tuna Sashimi",
            description: "Fresh tuna served with wasabi and soy sauce.",
            price: 6.99,
            image: "https://aubreyskitchen.com/wp-content/uploads/2023/10/tuna-sashimi.jpg",
          },
          {
            id: "California-roll",
            name: "California Roll",
            description: "Crab meat, avocado, and cucumber rolled in sushi rice.",
            price: 8.99,
            image: "https://www.alyonascooking.com/wp-content/uploads/2018/05/caterpillar-roll-11.jpg",
          },
        ],
      },
      {
        id: "noodles",
        name: "Noodles",
        items: [
          {
            id: "ramen",
            name: "Ramen",
            description: "Japanese noodle soup with pork, nori, and green onions.",
            price: 10.99,
            image: "https://static.india.com/wp-content/uploads/2024/08/RAMEN-1.jpg##image/jpg",
          },
          {
            id: "udon",
            name: "Udon",
            description: "Thick wheat noodles in a savory broth with tempura.",
            price: 11.99,
            image: "https://sudachirecipes.com/wp-content/uploads/2023/10/ebiten-udon-thumbnail.jpg",
          },
        ],
      },
    ],
  },

  // Add these objects to your restaurants array
{
  id: "2",
  name: "Dragon Palace",
  cuisine: "Chinese",
  rating: 4.6,
  reviewCount: 256,
  deliveryTime: "30-40 min",
  deliveryFee: 1.99,
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/31/76/3d/interior.jpg?w=700&h=400&s=1",
  description: "Traditional Chinese dishes and dim sum in a cozy setting.",
  address: "789 Dragon St, Chinatown",
  phone: "+1 (555) 222-3333",
  hours: "10:00 AM - 11:00 PM",
  priceRange: "$$",
  menuCategories: [
    {
      id: "starters",
      name: "Starters",
      items: [
        {
          id: "spring-rolls",
          name: "Spring Rolls",
          description: "Crispy rolls stuffed with vegetables.",
          price: 5.99,
          image: "https://www.cubesnjuliennes.com/wp-content/uploads/2021/01/Veggie-Spring-Rolls.jpg",
        },
        {
          id: "dumplings",
          name: "Pork Dumplings",
          description: "Steamed dumplings filled with pork and chives.",
          price: 7.99,
          image: "https://christieathome.com/wp-content/uploads/2021/04/Pork-Chive-Dumplings-updated-5-b.jpg",
        },
      ],
    },
    {
      id: "main",
      name: "Main Dishes",
      items: [
        {
          id: "kung-pao-chicken",
          name: "Kung Pao Chicken",
          description: "Spicy stir-fried chicken with peanuts and vegetables.",
          price: 13.99,
          image: "https://i0.wp.com/kristineskitchenblog.com/wp-content/uploads/2023/09/kung-pao-chicken-15-2.jpg?fit=1400%2C2100&ssl=1",
        },
        {
          id: "sweet-sour-pork",
          name: "Sweet & Sour Pork",
          description: "Pork in a tangy sweet and sour sauce.",
          price: 12.99,
          image: "https://tasteasianfood.com/wp-content/uploads/2019/05/sweet-and-sour-pork-featured-image.jpg",
        },
      ],
    },
  ],
},
{
  id: "3",
  name: "Burger House",
  cuisine: "American",
  rating: 4.7,
  reviewCount: 189,
  deliveryTime: "20-30 min",
  deliveryFee: 2.49,
  image: "https://mir-s3-cdn-cf.behance.net/project_modules/source/c205f121370803.5630015f2f667.jpg",
  description: "Juicy burgers, crispy fries, and classic shakes.",
  address: "321 Burger Lane, Uptown",
  phone: "+1 (555) 444-5555",
  hours: "11:00 AM - 12:00 AM",
  priceRange: "$",
  menuCategories: [
    {
      id: "burgers",
      name: "Burgers",
      items: [
        {
          id: "classic-burger",
          name: "Classic Burger",
          description: "Beef patty, lettuce, tomato, onion, and house sauce.",
          price: 9.99,
          image: "https://www.iheartnaptime.net/wp-content/uploads/2023/05/Best-Hamburger-Recipe-I-Heart-Naptime-500x500.jpg",
        },
        {
          id: "cheese-burger",
          name: "Cheese Burger",
          description: "Beef patty, cheddar cheese, lettuce, tomato, onion.",
          price: 10.99,
          image: "https://images.eatsmarter.com/sites/default/files/styles/max_size/public/hamburger-with-cheese-onion-and-tomato-528370.jpg",
        },
      ],
    },
    {
      id: "sides",
      name: "Sides",
      items: [
        {
          id: "fries",
          name: "French Fries",
          description: "Crispy golden fries.",
          price: 3.99,
          image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3D5MyF_dDlegg_9lgz5XleXv4vNFxB1QqdA&s",
        },
      ],
    },
  ],
},
  // Add more restaurants here...
]

export default function RestaurantPage({ params }: { params: { id: string } }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [activeTab, setActiveTab] = useState("menu")

  // Find the restaurant by id
  const restaurant = restaurants.find(r => r.id === params.id)

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Restaurant not found.</h1>
      </div>
    )
  }

  const menuCategories = restaurant.menuCategories

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
