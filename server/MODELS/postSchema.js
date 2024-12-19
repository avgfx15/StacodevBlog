import mongoose from 'mongoose';

// Declare the Schema of the Mongo model
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: 'uncategorized',
    },
    postImage: {
      type: String,
      default:
        'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserSchema',
    },
  },
  { timestamps: true }
);

//Export the model
const PostSchema = mongoose.model('Post', postSchema);

export default PostSchema;
