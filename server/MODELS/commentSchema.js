import { mongoose } from 'mongoose'; // Erase if already required

// Declare the Schema of the Mongo model
const commentSchema = new mongoose.Schema(
  {
    commentText: {
      type: String,
      required: true,
    },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    likes: {
      type: Array,
      default: [],
    },
    noOfLikes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

//Export the model
const CommentSchema = mongoose.model('Comment', commentSchema);

export default CommentSchema;
