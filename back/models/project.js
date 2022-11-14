import mongoose from 'mongoose';

const { Types } = mongoose.Schema;

// 221114 초대기능 다 했고 이제 목표치 날짜값 어떻게 넣을지만 만들면됨

/* 
 달력은 프로젝트마다 있는거고 
 날짜값은 개개인마다도 있어야함 
*/

const ProjectSchema = new mongoose.Schema(
    {
        constructorUser: {
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
            rank: { type: String, required: true, default: 'a'},
        },
        // instanceUser: [{
        //     _id: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: 'user'},
        //     rank: { type: String, required: true, default: 'e'} 
        // },],
        userCount: { type: Number, required: true, default: 0, },
        title: { type: String, required: true, },
        content: { type: String, required: true, },
        writes: [{ type: Types.ObjectId, ref: 'write' }],
        projectPublic: { type: Boolean, required: true, default: true, },
        categorys: [{ type: String, ref: 'category' }],
        projectImages: [{ 
            _id: { type: Types.ObjectId, ref: 'image' }, 
            key: { type: String, required: true } 
        }],
        joinUser: [{
            _id: { type: Types.ObjectId, ref: 'user', required: true, index: true, },
            state: { type: Boolean, required: true, default: false },
            rank: { type: String, required: true, default: 'e'} 
        }]
        
    },
    { timestamps: true }
)



const Project = mongoose.model("project", ProjectSchema)
export default Project;