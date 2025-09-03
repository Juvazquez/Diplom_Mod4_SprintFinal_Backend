import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "El nombre del perfil es obligatorio"],
    trim: true,
    minlength: [2, "El nombre debe tener al menos 2 caracteres"],
    maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
  },
  avatar: {
    type: String,
    required: [true, "El avatar es obligatorio"],
    trim: true,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i.test(v);
      },
      message: (props) => `${props.value} no es una URL válida para avatar`,
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;
