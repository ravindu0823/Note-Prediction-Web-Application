import pkg from "mongoose";
const { Schema, model, models } = pkg;
import bcrypt from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

const AdminSchema = new Schema({
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
AdminSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Validate the password
AdminSchema.methods.validPassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

// Apply the uniqueValidator plugin to AdminSchema
AdminSchema.plugin(mongooseUniqueValidator, {
  message: "Username already exists. Duplicate key",
});

// Create a Model
const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;
