import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: mongoose.ObjectId,
      ref: "categories",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    shipping: {
      type: Boolean,
    },
  },
  { timestamps: true,
      toJSON: {
          transform: function (doc, ret) {
              ret.id = ret._id;
              delete ret.__v;
          },
      },
  }
);

// // Set the id field to be an alias of _id
// productSchema.virtual('id').get(function() {
//     return this._id.toHexString();
// });
//
// productSchema.set('toJSON', {
//     virtuals: true,
// });

export default mongoose.model("products", productSchema);
