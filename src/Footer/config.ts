import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'
import { CallToAction } from '@/blocks/CallToAction/config'
import { Content } from '@/blocks/Content/config'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'layout',
      type: 'blocks',
      blocks: [Content, CallToAction],
      required: true,
      admin: {
        initCollapsed: false,
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
