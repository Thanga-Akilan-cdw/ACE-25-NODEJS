import mongoose from "mongoose";

const postSchema = mongoose.Schema({
    employeeID: Number,
    title: String,
    location: String,
    contentLink: String,
    caption: String,
    postedOn: {type: Date, default: Date.now()},
    likesCount: Number,
    likes: {type:[{employeeID: Number}], default:[]},
    comments: [{employeeID: Number, content: String, commentedOn: {type: Date, default: Date.now()}}]
})

postSchema.index({ title: "text", location:"text", caption: "text"});

export const Post = mongoose.model("Post", postSchema);