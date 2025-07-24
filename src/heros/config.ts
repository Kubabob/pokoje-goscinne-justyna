import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  IndentFeature,
} from '@payloadcms/richtext-lexical'

import {
  TextColorFeature,
  TextSizeFeature,
  TextLetterSpacingFeature,
  TextLineHeightFeature,
  TextFontFamilyFeature,
} from 'payload-lexical-typography'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'lowImpact',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
      required: true,
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => {
          return [
            // ...rootFeatures,
            ...defaultFeatures,
            // HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            TextColorFeature({
              colors: ['#FFFFFF', '#000000', '#FF0000', '#00FF00', '#0000FF'],
            }),
            TextSizeFeature(),
            TextLetterSpacingFeature(),
            TextLineHeightFeature(),
            TextFontFamilyFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      // admin: {
      //   condition: (_, { type } = {}) => ['highImpact', 'mediumImpact'].includes(type),
      // },
      relationTo: 'media',
      // required: true,
    },
  ],
  label: false,
}
