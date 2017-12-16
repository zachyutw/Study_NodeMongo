const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const PostSchema = require('./post');
const UserSchema = new Schema({
    name: {
        type:String,
        validate:{
            validator:(name)=> name.length > 2,
            message: 'Name must be longer than 2 characters'
        },
        required: [true, 'Name is required'] 
    },
    blogPosts:[{
        type: Schema.Types.ObjectId,
        ref: 'blogPost'
    }],
    likes:{ 
        type:Number,
        default:0
    }
    , posts:[PostSchema]
});
UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

//all middleware need a next to tell run next event
UserSchema.pre('remove',function(next){
    //this === joe
    const BlogPost = mongoose.model('blogPost');
    //use $in mongo operator
    BlogPost.remove({_id:{$in:this.blogPosts}})
        .then(()=> next());
})
const User = mongoose.model('user',UserSchema);
module.exports = User;