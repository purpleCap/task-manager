import mongoose from "mongoose";
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ""
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
{ timestamps: true});

export default mongoose.model('Task', taskSchema);;