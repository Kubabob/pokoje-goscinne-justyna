import type { Field, GroupField } from 'payload'

import { deepMerge } from 'payload'

export type LinkButtonAppearances = 'default' | 'orange'

export const appearanceOptions: Record<LinkButtonAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  orange: {
    label: 'Orange',
    value: 'orange',
  },
}

type LinkButtonType = (options?: {
  appearances?: LinkButtonAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const button: LinkButtonType = ({
  appearances,
  disableLabel = false,
  overrides = {},
} = {}) => {
  const linkButtonResult: GroupField = {
    name: 'linkButton',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: 'Internal link',
                value: 'reference',
              },
              {
                label: 'Custom URL',
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            admin: {
              style: {
                alignSelf: 'flex-end',
              },
              width: '50%',
            },
            label: 'Open in new tab',
          },
        ],
      },
    ],
  }

  const linkButtonTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
      },
      label: 'Document to link to',
      relationTo: ['pages', 'posts'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: 'Custom URL',
      required: true,
    },
  ]

  if (!disableLabel) {
    linkButtonTypes.map((linkButtonType) => ({
      ...linkButtonType,
      admin: {
        ...linkButtonType.admin,
        width: '50%',
      },
    }))

    linkButtonResult.fields.push({
      type: 'row',
      fields: [
        ...linkButtonTypes,
        {
          name: 'label',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Label',
          required: true,
        },
      ],
    })
  } else {
    linkButtonResult.fields = [...linkButtonResult.fields, ...linkButtonTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.orange]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkButtonResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the button should be rendered',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkButtonResult, overrides)
}
