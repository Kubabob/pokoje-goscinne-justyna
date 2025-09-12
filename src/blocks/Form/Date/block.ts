import type { Block } from 'payload'

export const Date: Block = {
    slug: 'date',
    fields: [
        {
            type: 'row',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    label: 'Name (lowercase, no special characters)',
                    required: true,
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'label',
                    type: 'text',
                    label: 'Label',
                    localized: true,
                    admin: {
                        width: '50%',
                    },
                },
            ],
        },
        {
            type: 'row',
            fields: [
                {
                    name: 'width',
                    type: 'number',
                    label: 'Field Width (percentage)',
                    admin: {
                        width: '50%',
                    },
                },
                {
                    name: 'defaultValue',
                    type: 'text',
                    label: 'Default Value',
                    localized: true,
                    admin: {
                        width: '50%',
                    },
                },
            ],
        },
        {
            name: 'required',
            type: 'checkbox',
            label: 'Required',
        },
    ],
    labels: {
        plural: 'Date Fields',
        singular: 'Date',
    },
}
