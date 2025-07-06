import type { Block, Field } from 'payload'

import { link } from '@/fields/link'

// const linkField: Field[] = [link({})]

export const LinksBlock: Block = {
  slug: 'links',
  interfaceName: 'LinksBlock',
  fields: [
    {
      name: 'links',
      type: 'array',
      admin: {
        initCollapsed: true,
      },
      // fields: linkField,
      fields: [link({})],
    },
  ],
}
