const { Schema, model, Types } = require('mongoose');

const foodSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, enum: ['burger', 'pizza', 'other'], required: true },
    description: { type: String },
    price: { type: Number, required: true },
    imageUrl: { type: String }, // path or URL to the image
    available: { type: Boolean, default: true },
    author: {
        type: Types.ObjectId,
        ref: 'User'
    }
});

module.exports = model('Food', foodSchema);