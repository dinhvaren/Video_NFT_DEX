import mongoose from 'mongoose';
import slugify from 'slugify';
import mongooseDelete from 'mongoose-delete';

const Schema = mongoose.Schema;
const User = new Schema({
    idUser: { type: String , maxLength: 255 },
    AccountAddress: { type: String, maxLength: 255 },
    slug: { type: String, slug: "name" , unique: true},

}, {timestamps: true});
// User.pre('save', async function (next) {
//     if (!this.slug) {
//         let newSlug = slugify(this.name, { lower: true, strict: true });
//         let existingUser = await mongoose.model('User').findOne({ slug: newSlug });

//         let counter = 1;
//         while (existingUser) {
//             newSlug = `${slugify(this.name, { lower: true, strict: true })}-${counter}`;
//             existingUser = await mongoose.model('User').findOne({ slug: newSlug });
//             counter++;
//         }

//         this.slug = newSlug;
//     }
//     next();
// });

User.plugin(mongooseDelete, {
    deletedAt: true,
    overrideMethods: 'all' });
export default mongoose.model('User', User);
