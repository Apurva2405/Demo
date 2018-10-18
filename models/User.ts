import { Schema, model } from 'mongoose';

let UserSchema : Schema = new Schema({
    createdAt: Date,
    updatedAt: Date,
    name: {
        type: String,
        required: true
       
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    },
    salary: {
        type: Number,
        required: true
    }
});

export default model('User', UserSchema);