import pkg from "mongoose";
const { Schema, model, models } = pkg;
import bcrypt from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

interface IAdmin extends Document {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  generateHash: (password: string) => string;
  validPassword: (password: string, dbPassword: string) => boolean;
}

const AdminSchema = new Schema<IAdmin>({
  fullName: {
    type: String,
    required: [true, "Please enter Full Name"],
  },
  userName: {
    type: String,
    required: [true, "Please enter userName"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
});

// Hash the password
AdminSchema.methods.generateHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Validate the password
AdminSchema.methods.validPassword = (password: string, dbPassword: string) => {
  return bcrypt.compareSync(password, dbPassword);
};

// Apply the uniqueValidator plugin to AdminSchema
AdminSchema.plugin(mongooseUniqueValidator, {
  message: "Username already exists. Duplicate key",
});

// Create a Model
const Admin =
  (models.Admin as pkg.Model<IAdmin>) || model<IAdmin>("Admin", AdminSchema);

export default Admin;
