import type { Block } from 'payload'

export const MapBlock: Block = {
  slug: 'mapBlock',
  interfaceName: 'MapBlock',
  fields: [
    {
      name: 'mapLinkText',
      type: 'text',
      label: 'MapLinkText',
      required: true,
    },
    {
      name: 'location',
      type: 'point',
      label: 'Location',
      required: true,
    },
    {
      name: 'width',
      type: 'number',
      label: 'Width',
      defaultValue: 425,
    },
    {
      name: 'height',
      type: 'number',
      label: 'Height',
      defaultValue: 350,
    },
  ],
}
