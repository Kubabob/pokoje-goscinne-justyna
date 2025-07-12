import type { Block } from 'payload'

export const MediaBlock: Block = {
  slug: 'mediaBlock',
  interfaceName: 'MediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'enableCustomCaption',
      type: 'checkbox',
    },
    {
      name: 'customCaptionType',
      type: 'select',
      defaultValue: 'below',
      options: [
        { label: 'Below', value: 'below' },
        { label: 'OnTop', value: 'onTop' },
      ],
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableCustomCaption)
        },
      },
    },
    {
      name: 'customCaption',
      type: 'text',
      admin: {
        condition: (_data, siblingData) => {
          return Boolean(siblingData?.enableCustomCaption)
        },
      },
    },
  ],
}
