import type { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'testimonials',
      type: 'array',
      fields: [
        {
          name: 'author',
          type: 'text',
          required: true,
        },
        {
          name: 'testimonial',
          type: 'richText',
          required: true,
        },
      ],
    },
  ],
}
