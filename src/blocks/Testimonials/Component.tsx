import React from 'react'
import RichText from '@/components/RichText'

import type { TestimonialsBlock as TestimonialsBlockProps } from '@/payload-types'
import { Button } from '@/components/ui/button'

export const TestimonialsBlock: React.FC<TestimonialsBlockProps> = (props) => {
  const { testimonials } = props

  return (
    <div className="relative w-full py-12 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {testimonials && testimonials.length > 0 ? (
            <div className="testimonial-carousel">
              <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hidden">
                {testimonials.map((testimonial, index) => (
                  <div key={index} className="snap-center flex-shrink-0 w-full px-4 py-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <div className="mb-4">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i} className="text-yellow-500">
                            ★
                          </span>
                        ))}
                      </div>

                      {testimonial.testimonial && (
                        <blockquote className="text-gray-700 italic mb-4">
                          <RichText data={testimonial.testimonial} />
                        </blockquote>
                      )}

                      {testimonial.author && <h3 className="text-black">{testimonial.author}</h3>}

                      {/* <div className="flex items-center mt-4">
                        {testimonial.image && (
                          <div className="mr-4">
                            <img
                              src={testimonial.image.url}
                              alt={testimonial.image.alt || ''}
                              className="h-12 w-12 rounded-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="font-semibold">{testimonial.name}</div>
                          {testimonial.title && (
                            <div className="text-gray-500 text-sm">{testimonial.title}</div>
                          )}
                        </div>
                      </div> */}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center mt-6 gap-2">
                {testimonials.map((_, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="h-2 w-2 rounded-full p-0"
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">No testimonials available</div>
          )}
        </div>
      </div>
    </div>
  )
}
