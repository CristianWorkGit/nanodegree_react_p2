import { schema } from 'normalizr';

export const posts = new schema.Entity('posts');

export const category = new schema.Entity('categories', {}, { idAttribute: 'name' });
