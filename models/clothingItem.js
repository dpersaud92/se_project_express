import mongoose from "mongoose";
import validator from "validator";

const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  isDarkBackground: {
    type: Boolean,
    default: false,
  }, // ✅ this comma was missing

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: [],
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ClothingItem = mongoose.model("ClothingItem", clothingItemSchema);

export default ClothingItem;
