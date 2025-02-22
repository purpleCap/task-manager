import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tasks: [{
        type: Schema.Types.ObjectId,
        ref: 'Task'}
    ],
},
{ timestamps: true});

export default mongoose.model('User', userSchema);;