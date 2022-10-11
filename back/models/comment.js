import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const CommentSchema = new mongoose.Schema(
    {
        user: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        write: { _id: { type: Types.ObjectId, ref: 'write' } },
        content: { type: String, required: true,  },
        recomments: [{ _id: { type: Types.ObjectId, ref: 'recomment' } }],
        recommentCount: { type: Number, required: true, default: 0, },
        isLive: { type: Boolean, default: false,},
        public: { type: Boolean, default: false,},
        like: { type: Number, default: 0, },
        likeCount: { type: Number, required: true, default: 0, },
    },
    { timestamps: true }
)


export default mongoose.model("comment", CommentSchema)