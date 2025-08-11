// import type { Block } from 'payload'
// import {
//   FixedToolbarFeature,
//   HeadingFeature,
//   InlineToolbarFeature,
//   lexicalEditor,
//   IndentFeature,
// } from '@payloadcms/richtext-lexical'

// export const HeroBlock: Block = {
//   slug: 'heroBlock',
//   interfaceName: 'HeroBlock',
//   fields: [
//     {
//       name: 'richText',
//       type: 'richText',
//       editor: lexicalEditor({
//         features: ({ defaultFeatures }) => {
//           return [
//             ...defaultFeatures,
//             HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
//             FixedToolbarFeature(),
//             InlineToolbarFeature(),
//           ]
//         },
//       }),
//       label: false,
//     },
//   ],
// }
