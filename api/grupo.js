import mogoose from 'mongoose';

const grupoSchema = new mogoose.Schema({
    nombre: {type: String, required: true,},
    num_users: {type: Number, required: true,},
},{
    versionKey: false,
});
const Grupo = mogoose.model('Grupo', grupoSchema);
export default Grupo;
