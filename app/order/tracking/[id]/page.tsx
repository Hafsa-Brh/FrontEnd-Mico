"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Clock, Truck, ChefHat, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { ThemeToggle } from "@/components/theme-toggle"

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [orderStatus, setOrderStatus] = useState("confirmed")
  const [progress, setProgress] = useState(25)

  const order = {
    id: params.id,
    status: orderStatus,
    restaurant: {
      name: "Bella Italia",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Downtown",
    },
    items: [
      { name: "Spaghetti Carbonara", quantity: 1, price: 16.99 },
      { name: "Bruschetta", quantity: 2, price: 8.99 },
    ],
    total: 37.95,
    estimatedDelivery: "25-35 min",
    deliveryAddress: "456 Oak Avenue, Apt 2B",
    driver: {
      name: "Mike Johnson",
      phone: "+1 (555) 987-6543",
      rating: 4.9,
    },
  }

  const statusSteps = [
    { key: "confirmed", label: "Order Confirmed", icon: CheckCircle, completed: true },
    { key: "preparing", label: "Preparing", icon: ChefHat, completed: orderStatus !== "confirmed" },
    {
      key: "ready",
      label: "Ready for Pickup",
      icon: Clock,
      completed: ["ready", "picked_up", "delivered"].includes(orderStatus),
    },
    {
      key: "picked_up",
      label: "Out for Delivery",
      icon: Truck,
      completed: ["picked_up", "delivered"].includes(orderStatus),
    },
    { key: "delivered", label: "Delivered", icon: CheckCircle, completed: orderStatus === "delivered" },
  ]

  // Simulate order status updates
  useEffect(() => {
    const statusProgression = [
      { status: "confirmed", progress: 25, delay: 2000 },
      { status: "preparing", progress: 50, delay: 8000 },
      { status: "ready", progress: 75, delay: 5000 },
      { status: "picked_up", progress: 90, delay: 10000 },
      { status: "delivered", progress: 100, delay: 0 },
    ]

    let timeoutId: NodeJS.Timeout

    const updateStatus = (index: number) => {
      if (index < statusProgression.length) {
        const { status, progress: newProgress, delay } = statusProgression[index]
        setOrderStatus(status)
        setProgress(newProgress)

        if (delay > 0) {
          timeoutId = setTimeout(() => updateStatus(index + 1), delay)
        }
      }
    }

    updateStatus(0)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-500"
      case "preparing":
        return "bg-orange-500"
      case "ready":
        return "bg-yellow-500"
      case "picked_up":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusMessage = () => {
    switch (orderStatus) {
      case "confirmed":
        return "Your order has been confirmed and sent to the restaurant."
      case "preparing":
        return "The restaurant is preparing your delicious meal."
      case "ready":
        return "Your order is ready and waiting for pickup."
      case "picked_up":
        return "Your order is on its way! The driver will arrive soon."
      case "delivered":
        return "Your order has been delivered! Enjoy your meal!"
      default:
        return "Processing your order..."
    }
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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Order Tracking</h1>
            <p className="text-muted-foreground">Order #{order.id}</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Status */}
            <div className="lg:col-span-2 space-y-6">
              {/* Status Progress */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Order Status</CardTitle>
                    <Badge className={`${getStatusColor(orderStatus)} text-white`}>
                      {statusSteps.find((step) => step.key === orderStatus)?.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Progress</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>

                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const StepIcon = step.icon
                      return (
                        <div key={step.key} className="flex items-center space-x-4">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              step.completed
                                ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            <StepIcon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                            >
                              {step.label}
                            </p>
                            {step.key === orderStatus && (
                              <p className="text-sm text-muted-foreground mt-1">{getStatusMessage()}</p>
                            )}
                          </div>
                          {step.completed && <CheckCircle className="w-5 h-5 text-green-500" />}
                        </div>
                      )
                    })}
                  </div>

                  {orderStatus === "picked_up" && (
                    <Card className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20 border-orange-200 dark:border-orange-800">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-amber-500 rounded-full flex items-center justify-center">
                            <Truck className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">Your driver is {order.driver.name}</p>
                            <p className="text-sm text-muted-foreground">Rating: ⭐ {order.driver.rating}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Phone className="w-4 h-4 mr-2" />
                            Call
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </CardContent>
              </Card>

              {/* Restaurant Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Restaurant Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-lg">{order.restaurant.name}</h3>
                      <div className="flex items-center space-x-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="w-4 h-4" />
                        <span>{order.restaurant.address}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4 mr-2" />
                      Call Restaurant
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <div>
                          <span className="font-medium">{item.name}</span>
                          <span className="text-muted-foreground ml-2">x{item.quantity}</span>
                        </div>
                        <span>${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Delivery Address</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                    <span>{order.deliveryAddress}</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Estimated Delivery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5 text-muted-foreground" />
                    <span>{order.estimatedDelivery}</span>
                  </div>
                </CardContent>
              </Card>

              {orderStatus === "delivered" && (
                <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 border-green-200 dark:border-green-800">
                  <CardContent className="p-6 text-center">
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">Order Delivered!</h3>
                    <p className="text-muted-foreground mb-4">
                      Hope you enjoyed your meal! Please rate your experience.
                    </p>
                    <Button className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                      Rate Order
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
