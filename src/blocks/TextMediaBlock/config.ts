import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { linkButton } from '@/fields/linkButton'

export const TextMediaBlock: Block = {
  slug: 'textMediaBlock',
  interfaceName: 'TextMediaBlock',
  fields: [
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'mediaPosition',
      type: 'select',
      defaultValue: 'right',
      options: [
        {
          label: 'Right',
          value: 'right',
        },
        {
          label: 'Left',
          value: 'left',
        },
      ],
    },
    {
      name: 'head',
      type: 'text',
      // type: 'richText',
      // editor: lexicalEditor({
      //   features: ({ rootFeatures }) => {
      //     return [
      //       ...rootFeatures
      //     ]
      //   }
      // })
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures]
        },
      }),
    },
    {
      name: 'enableButton',
      type: 'checkbox',
    },
    linkButton({
      overrides: {
        admin: {
          condition: (_data, siblingData) => {
            return Boolean(siblingData?.enableButton)
          },
        },
      },
    }),
  ],
}
