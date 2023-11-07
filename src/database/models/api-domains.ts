import mongoose, { Document, Model, Schema } from 'mongoose';

interface DomainsDocument extends Document {
  allowedDomains: string[];
  secret: string;
}

const ApiD: Schema<DomainsDocument> = new mongoose.Schema({
  allowedDomains: [String],
  secret: String,
});


const Domains: Model<DomainsDocument> = mongoose.model('profiles', ApiD);
console.log('[Domains]: Started');
export default Domains;

