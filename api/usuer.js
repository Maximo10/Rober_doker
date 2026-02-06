import mogoose from 'mongoose';

const userSchema = new mogoose.Schema({
    name: {type: String,required: true,},
    email: {type: String,required: true,unique: true,},
    edad: {type: Number},
},{
    versionKey: false,
});
const User = mogoose.model('User', userSchema);
export default User;