const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const modelName = 'Comments';
const schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    required: true,
    default: nanoid,
  },
  userId: {
    type: String,
    ref: 'Users',
    required: true,
    index: true,
  },
  hashTags: {
    type: [String],
  },
  mentions: {
    type: [String],
  },
  text: {
    type: String,
  },
  timestamp: {
    type: Number,
    required: true,
    default: Date.now(),
  },
}, {
  timestamps: {
    createdAt: 'timestamp',
    updatedAt: false,
    currentTime: () => Date.now(),
  },
  collection: 'comments',
  autoIndex: true,
});

schema.pre('save', (next) => {
  // eslint-disable-next-line no-underscore-dangle
  this._id = this.id;
  next();
});

schema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    // eslint-disable-next-line no-underscore-dangle,no-param-reassign
    delete ret._id;
  },
});

module.exports = {
  modelName,
  schema,
};
