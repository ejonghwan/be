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
        writes: [{ type: Types.ObjectId, ref: 'write' }],
        projectPublic: { type: Boolean, required: true, default: true, },
        categorys: [{ type: String, ref: 'category' }],
        projectImages: [
            { _id: { type: Types.ObjectId, ref: 'image' }, key: { type: String, required: true } }
        ]
        
    },
    { timestamps: true }
)


const Project = mongoose.model("project", ProjectSchema)
export default Project;