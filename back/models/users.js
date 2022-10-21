import mongoose from "mongoose";

const { Types } = mongoose.Schema;


const UserSchema = mongoose.Schema({
    // 소문자로 이뤄진 6~15 공백없이 
    id: { type: String, require: true, unique: true, minlength: 4, maxlength: 15, trim: true, lowercase: true,}, /* 8 ~15 소문자 공백제거  */
    email: { type: String, require: true, unique: true, trim: true,},
    name: { type: String, require: true, minlength: 1, maxlength: 15, trim: true,}, /* minlength: 6, maxlength: 15, */
    password: { type: String, require: true, trim: true,}, /* 8 ~ 15공백제거  */
    phoneNumber: { type: String, trim: true, maxlength: 20},
    gender: { type: String, require: true, },
    birthday: { type: String, trim: true, maxlength: 8},
    token: { type: String, unique: true, require: true, },
    question: { 
        questionType: { type: String, require: true },
        result: { type: String, require: true, minlength: 1, maxlength: 15, trim: true, lowercase: true, },  /* 소문자 1 ~ 15공백제거  */
     },
     profileImage: { type: Types.ObjectId, ref: 'image' },
     projects: [{
        _id: { type: Types.ObjectId, ref: 'project'},
        date: [{ type: String, }],
     }],
     writes: [{ type: Types.ObjectId, ref: 'write'}],
     comments: [{ type: Types.ObjectId, ref: 'comment'}],
     recomments: [{ type: Types.ObjectId, ref: 'recomment'}],
     likePost: [{ type: Types.ObjectId, ref: 'write' }]
}, {
    timestamps: true,
})


const User = mongoose.model('user', UserSchema)
export default User;