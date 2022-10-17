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
        rank: { 
            a: { type: Types.ObjectId, ref: 'user', required: true, },
            b: { type: Types.ObjectId, ref: 'user' },
            c: { type: Types.ObjectId, ref: 'user' },
            d: { type: Types.ObjectId, ref: 'user' }
         },
        userCount: { type: Number, required: true, default: 0, },
        title: { type: String, required: true, },
        content: { type: String, required: true, },
        write: [{ type: Types.ObjectId, ref: 'write' }],
        projectPublic: { type: Boolean, required: true, default: true, },
        category: [{ type: Types.ObjectId, ref: 'category' }],
    },
    { timestamps: true }
)


const Project = mongoose.model("project", ProjectSchema)
export default Project;