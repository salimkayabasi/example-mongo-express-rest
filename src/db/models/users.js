const mongoose = require('mongoose');
const { nanoid } = require('nanoid');

const modelName = 'Users';
const schema = new mongoose.Schema({
  id: {
    type: String,
    unique: true,
    index: true,
    required: true,
    default: nanoid,
  },
  username: {
    type: String,
    required: true,
    index: true,
  },
  contact: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  profilePictureUrl: {
    type: String,
    required: true,
  },
  updatedAt: {
    type: Number,
    required: true,
    default: Date.now(),
  },
}, {
  timestamps: {
    createdAt: false,
    updatedAt: true,
    currentTime: () => Date.now(),
  },
  collection: 'users',
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
