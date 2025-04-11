import slugify from 'slugify';
import mongoose from 'mongoose';

const advertSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, unique: true },
  description: { type: String, required: true },
  mainImage: { type: String, required: true },
  price: { type: Number, required: true },
  transaction: { type: String, required: true },
  status: { type: String, required: true },

  product_type: { type: String, required: true },
  universe: { type: String, required: true },
  condition: { type: String, required: true },
  collection: { type: String }, // Ojooooo!!!! Es un nombre reservado en Mongoose y podría petar en el futuro, pero por ahora todo ok

  isVisible: { type: Boolean, default: true },                       // Ojo!!
  product_type: { type: String, required: true },
  universe: { type: String, required: true },
  condition: { type: String, required: true },
  collection: { type: String },

  brand: { type: String },
  tags: [String],
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

});

// Generación de slug

  images: [String],
});

// Generación del slug

advertSchema.pre('save', function(next) {
  this.slug = slugify(this.title, { lower: true, strict: true });
  next();
});

const Advert = mongoose.model('Advert', advertSchema);
export default Advert;
