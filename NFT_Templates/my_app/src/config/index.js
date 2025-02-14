import mongoose from 'mongoose';

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/video_nft_dex');
        console.log('Connected!');
    } catch (error) {
        console.log('Failure!');
    }
}

export default {connect};