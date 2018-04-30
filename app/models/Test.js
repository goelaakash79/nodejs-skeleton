/**
 * Test mongo schema
 */
import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  _id: String,
  name: {
    type: String,
    required: true,
  },
  createdAt: Date,
  updatedAt: Date,
});

testSchema.pre('save', function(next) {
  if (this.isNew && !this._id) {
    this._id = mongoose.Types.ObjectId().toString()
  }
  next();
})

testSchema.statics = {
  add: function add(data) {
    return new Promise((resolve, reject) => {
      this.create(data).then(res => resolve(res))
        .catch((err) => {
          return reject(err);
        });
    });
  }
};

const Test = mongoose.model('test', testSchema);

export default Test;

