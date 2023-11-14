const schema = {
  type: 'object',
  properties: {
    title: { type: 'string', maxLength: 50 },
    text: { type: 'string', maxLength: 256 },
    genre: {
      type: 'string',
      enum: ['Politic', 'Business', 'Sport', 'Other']
    },
    isPrivate: { type: 'boolean' },
    author: { type: 'string', maxLength: 20 }
  },
  required: ['title', 'text', 'genre', 'isPrivate', 'author'],
  additionalProperties: false,
};

export default schema;