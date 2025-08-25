import {
  lexicalEditor,
  HeadingFeature,
  FixedToolbarFeature,
  InlineToolbarFeature,
  BlocksFeature,
} from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'
import { FormBlock } from '../Form/config'

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
              label: 'Media items',
              type: 'collapsible',
              fields: [
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
                },
              ],
              admin: {
                condition: (_, siblingData) => {
                  return Boolean(siblingData?.enableMedia)
                },
              },
            },
            {
              name: 'mediaSize',
              type: 'group',
              fields: [
                {
                  name: 'height',
                  type: 'number',
                },
                {
                  name: 'width',
                  type: 'number',
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
              editor: lexicalEditor({
                features: ({ defaultFeatures }) => {
                  return [
                    ...defaultFeatures,
                    // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    BlocksFeature({ blocks: [FormBlock] }),
                  ]
                },
              }),
            },
          ],
        },
      ],
    },
  ],
}
