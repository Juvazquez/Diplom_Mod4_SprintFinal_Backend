import mongoose from 'mongoose';

const rolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
      required: true
    },
    permissions: [ //es un array porq cada Role tiene varios permisos asociados
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Permission' //a quien hace referencia 
      }
    ]
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', rolesSchema);

export default Role;
