import mongoose from 'mongoose';

const quoteRequestSchema = new mongoose.Schema(
  {
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    company: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
    },
    status: {
      type: String,
      enum: ['pending', 'contacted', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);

export default QuoteRequest;
