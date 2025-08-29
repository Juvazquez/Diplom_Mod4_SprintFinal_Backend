import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  name: { //puede ser en vez de name del permiso una key . Ej: PaisEliminar, PaisVer
    type: String,
    required: true,
    unique: true
  },
  description: { //descripcion para entender lo que hace el permiso
    type: String,
    required: true
  }
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
