import type { Field, GroupField } from 'payload'

import { deepMerge } from 'payload'

export type ButtonAppearances = 'default' | 'orange'

export const appearanceOptions: Record<ButtonAppearances, { label: string; value: string }> = {
  default: {
    label: 'Default',
    value: 'default',
  },
  orange: {
    label: 'Orange',
    value: 'orange',
  },
}

type ButtonType = (options?: {
  appearances?: ButtonAppearances[] | false
  disableLabel?: boolean
  overrides?: Partial<GroupField>
}) => Field

export const button: ButtonType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const buttonResult: GroupField = {
    name: 'button',
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

  const buttonTypes: Field[] = [
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
    buttonTypes.map((buttonType) => ({
      ...buttonType,
      admin: {
        ...buttonType.admin,
        width: '50%',
      },
    }))

    buttonResult.fields.push({
      type: 'row',
      fields: [
        ...buttonTypes,
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
    buttonResult.fields = [...buttonResult.fields, ...buttonTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.default, appearanceOptions.orange]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    buttonResult.fields.push({
      name: 'appearance',
      type: 'select',
      admin: {
        description: 'Choose how the button should be rendered',
      },
      defaultValue: 'default',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(buttonResult, overrides)
}
