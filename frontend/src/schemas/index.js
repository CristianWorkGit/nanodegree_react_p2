
import { schema } from 'normalizr'

export const category = new schema.Entity('categories', {}, { idAttribute: 'name' })