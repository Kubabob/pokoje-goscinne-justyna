import { BlockConfig } from '@payloadcms/plugin-form-builder/types'

export interface DateField extends BlockConfig {
    blockName?: string
    blockType: 'date'
    defaultValue?: string
    label?: string
    name: string
    required?: boolean
    width?: number
}
