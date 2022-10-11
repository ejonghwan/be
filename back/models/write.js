import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const WriteSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        project: { _id: { type: Types.ObjectId, ref: 'project' } },
        title: { type: String, required: true,  },
        content: { type: String, required: true,  },
        images: [{ _id: { type: Types.ObjectId, ref: 'image' } }],
        comments: [{ _id: { type: Types.ObjectId, ref: 'comment' } }],
        commentCount: { type: Number, required: true, default: 0, },
        isLive: { type: Boolean, default: false,},
        public: { type: Boolean, default: false,},
        like: { type: Number, default: 0, },
        likeCount: { type: Number, required: true, default: 0, },
    },
    { timestamps: true }
)


export default mongoose.model("write", WriteSchema)