import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export function Reviews({ reviews }) {
  return (
    <>
      <h3 className="text-xl font-semibold mb-2">Customer Reviews</h3>
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border-b pb-4">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="font-semibold">{review.author}</span>
            </div>
            <p>{review.text}</p>
          </div>
        ))}
      </div>
      <Button className="mt-4">Write a Review</Button>
    </>
  );
}
