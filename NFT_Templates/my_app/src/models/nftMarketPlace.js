import mongoose from 'mongoose';
import slugify from 'slugify';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const NFTMarketPalce = new Schema({
    idUser: { type: String , maxLength: 255 },
    AccountAddress: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name" , unique: true},

}, {timestamps: true});
// NFTMarketPalce.pre('save', async function (next) {
//     if (!this.slug) {
//         let newSlug = slugify(this.name, { lower: true, strict: true });
//         let existingNFTMarketPalce = await mongoose.model('NFTMarketPalce').findOne({ slug: newSlug });

//         let counter = 1;
//         while (existingNFTMarketPalce) {
//             newSlug = `${slugify(this.name, { lower: true, strict: true })}-${counter}`;
//             existingNFTMarketPalce = await mongoose.model('NFTMarketPalce').findOne({ slug: newSlug });
//             counter++;
//         }

//         this.slug = newSlug;
//     }
//     next();
// });

NFTMarketPalce.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all' });
export default mongoose.model('NFTMarketPalce', NFTMarketPalce);
