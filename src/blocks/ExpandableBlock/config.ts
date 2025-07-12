import type { Block } from 'payload'

export const ExpandableBlock: Block = {
  slug: 'expandableBlock',
  interfaceName: 'ExpandableBlock',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Outside',
          fields: [
            {
              name: 'enableMedia',
              type: 'checkbox',
            },
            {
              name: 'mediaItems',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  type: 'upload',
                  relationTo: 'media',
                  required: true,
                },
              ],
              admin: {
                condition: (_, siblingData) => {
                  return Boolean(siblingData?.enableMedia)
                },
              },
            },
            {
              name: 'title',
              type: 'text',
              required: true,
            },
            {
              name: 'enableButton',
              type: 'checkbox',
            },
            {
              name: 'buttonText',
              type: 'richText',
              required: true,
              admin: {
                condition: (_, siblingData) => {
                  return Boolean(siblingData?.enableButton)
                },
              },
            },
          ],
        },
        {
          name: 'inside',
          label: 'Inside',
          fields: [
            {
              name: 'content',
              type: 'richText',
            },
          ],
        },
      ],
    },
  ],
}
