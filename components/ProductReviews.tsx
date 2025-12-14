"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, ThumbsUp, ThumbsDown, Flag, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Review {
  id: string
  userName: string
  userAvatar?: string
  rating: number
  title: string
  comment: string
  date: string
  verified: boolean
  helpful: number
  notHelpful: number
  images?: string[]
}

interface ProductReviewsProps {
  productId: string
  rating: number
  reviewCount: number
}

export default function ProductReviews({ productId, rating, reviewCount }: ProductReviewsProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [sortBy, setSortBy] = useState("newest")
  const [filterRating, setFilterRating] = useState("all")
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReview, setNewReview] = useState({
    rating: 5,
    title: "",
    comment: "",
  })
  const { toast } = useToast()

  useEffect(() => {
    // Mock reviews data
    const mockReviews: Review[] = [
      {
        id: "1",
        userName: "Sarah Johnson",
        rating: 5,
        title: "Absolutely amazing sound quality!",
        comment:
          "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is exactly as advertised. I use them daily for work calls and music. Highly recommend!",
        date: "2024-01-15",
        verified: true,
        helpful: 12,
        notHelpful: 1,
      },
      {
        id: "2",
        userName: "Mike Chen",
        rating: 4,
        title: "Great headphones, minor comfort issue",
        comment:
          "Sound quality is excellent and the ANC works really well. My only complaint is that they can feel a bit tight after wearing for several hours. Otherwise, very satisfied with the purchase.",
        date: "2024-01-10",
        verified: true,
        helpful: 8,
        notHelpful: 2,
      },
      {
        id: "3",
        userName: "Emily Rodriguez",
        rating: 5,
        title: "Perfect for travel",
        comment:
          "I bought these for a long international flight and they were perfect. The noise cancellation made the flight so much more comfortable. The case is also very well designed.",
        date: "2024-01-08",
        verified: true,
        helpful: 15,
        notHelpful: 0,
      },
      {
        id: "4",
        userName: "David Kim",
        rating: 3,
        title: "Good but not great",
        comment:
          "They're decent headphones but I expected more for the price. The sound is good but not exceptional. The build quality feels solid though.",
        date: "2024-01-05",
        verified: false,
        helpful: 3,
        notHelpful: 7,
      },
      {
        id: "5",
        userName: "Lisa Wang",
        rating: 5,
        title: "Best purchase I've made this year",
        comment:
          "I'm a music producer and these headphones are fantastic for both casual listening and professional work. The frequency response is very balanced and the comfort is excellent.",
        date: "2024-01-02",
        verified: true,
        helpful: 20,
        notHelpful: 1,
      },
    ]
    setReviews(mockReviews)
  }, [productId])

  const handleSubmitReview = () => {
    if (!newReview.title.trim() || !newReview.comment.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Title and comment are required.",
        variant: "destructive",
      })
      return
    }

    const review: Review = {
      id: Date.now().toString(),
      userName: "You",
      rating: newReview.rating,
      title: newReview.title,
      comment: newReview.comment,
      date: new Date().toISOString().split("T")[0],
      verified: true,
      helpful: 0,
      notHelpful: 0,
    }

    setReviews((prev) => [review, ...prev])
    setNewReview({ rating: 5, title: "", comment: "" })
    setShowWriteReview(false)

    toast({
      title: "Review submitted!",
      description: "Thank you for your feedback.",
    })
  }

  const filteredReviews = reviews.filter((review) => {
    if (filterRating === "all") return true
    return review.rating === Number.parseInt(filterRating)
  })

  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "highest":
        return b.rating - a.rating
      case "lowest":
        return a.rating - b.rating
      case "helpful":
        return b.helpful - a.helpful
      default:
        return 0
    }
  })

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: (reviews.filter((r) => r.rating === rating).length / reviews.length) * 100,
  }))

  return (
    <div className="space-y-8">
      {/* Review Summary */}
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="text-4xl font-bold">{rating}</div>
            <div>
              <div className="flex items-center mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${i < Math.floor(rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600">Based on {reviewCount} reviews</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ rating, count, percentage }) => (
            <div key={rating} className="flex items-center gap-3">
              <span className="text-sm w-8">{rating}★</span>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <span className="text-sm text-gray-600 w-8">{count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Write Review Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <Button
          onClick={() => setShowWriteReview(!showWriteReview)}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
        >
          Write a Review
        </Button>
      </div>

      {/* Write Review Form */}
      {showWriteReview && (
        <Card>
          <CardContent className="p-6">
            <h4 className="text-lg font-semibold mb-4">Write Your Review</h4>
            <div className="space-y-4">
              <div>
                <Label>Rating</Label>
                <div className="flex items-center gap-2 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                      className="p-1"
                    >
                      <Star
                        className={`h-6 w-6 ${
                          star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="review-title">Review Title</Label>
                <Input
                  id="review-title"
                  value={newReview.title}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, title: e.target.value }))}
                  placeholder="Summarize your experience"
                />
              </div>

              <div>
                <Label htmlFor="review-comment">Your Review</Label>
                <Textarea
                  id="review-comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
                  placeholder="Share your thoughts about this product..."
                  rows={4}
                />
              </div>

              <div className="flex gap-3">
                <Button onClick={handleSubmitReview}>Submit Review</Button>
                <Button variant="outline" onClick={() => setShowWriteReview(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="highest">Highest Rating</SelectItem>
            <SelectItem value="lowest">Lowest Rating</SelectItem>
            <SelectItem value="helpful">Most Helpful</SelectItem>
          </SelectContent>
        </Select>

        <Select value={filterRating} onValueChange={setFilterRating}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Ratings</SelectItem>
            <SelectItem value="5">5 Stars</SelectItem>
            <SelectItem value="4">4 Stars</SelectItem>
            <SelectItem value="3">3 Stars</SelectItem>
            <SelectItem value="2">2 Stars</SelectItem>
            <SelectItem value="1">1 Star</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {sortedReviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{review.userName}</span>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                          Verified Purchase
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{review.date}</span>
                    </div>
                  </div>
                </div>

                <Button variant="ghost" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>

              <h4 className="font-semibold mb-2">{review.title}</h4>
              <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-600">Was this helpful?</span>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    {review.helpful}
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    {review.notHelpful}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedReviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-600">No reviews match your current filters.</p>
        </div>
      )}
    </div>
  )
}
