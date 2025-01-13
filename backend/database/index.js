import mongoose from 'mongoose';

const connectDB = async () => {
    await mongoose.connect(process.env.DB).then(()=>{
        console.log('DB Connected');
    }).catch(err=>console.log(err));
}

export default connectDB;