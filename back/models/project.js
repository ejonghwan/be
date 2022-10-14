import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

const ProjectSchema = new mongoose.Schema(
    {
        constructorUser: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },
        instanceUser: [{
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            name: { type: String, required: true, }  
        },],
        rank: [
            { a: { _id: Types.ObjectId, ref: 'user' } },
            { b: { _id: Types.ObjectId, ref: 'user' } },
            { c: { _id: Types.ObjectId, ref: 'user' } },
            { d: { _id: Types.ObjectId, ref: 'user' }, default: true }
        ],
        userCount: { type: Number, required: true, default: 0, },
        title: { type: String, required: true, },
        content: { type: String, required: true, },
        write: [{ _id: { type: Types.ObjectId, ref: 'write' } }],
        public: { type: Boolean, required: true, },
        category: { type: Types.ObjectId, ref: 'category' },
    },
    { timestamps: true }
)


export default mongoose.model("project", ProjectSchema)