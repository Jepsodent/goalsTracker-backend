import mongoose from "mongoose";


const goalSchema = mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String},
    isComplete: {type:Boolean, default: false},
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})


const Goal = mongoose.model.Goal || mongoose.model("Goal", goalSchema);

export default Goal;


