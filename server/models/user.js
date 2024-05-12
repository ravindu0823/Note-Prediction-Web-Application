import pkg from "mongoose";
const { Schema, model, models } = pkg;
import bcrypt from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

//(Full Name, username, password, Contact Number, Address, NIC)

const UserSchema = new Schema({
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

  image: {
    type: String,
  },

  status: {
    type: String,
    default: "Active",
  },
});

//  Hash the password
UserSchema.methods.generateHash = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate the password
UserSchema.methods.validPassword = (password, dbPassword) => {
  return bcrypt.compareSync(password, dbPassword);
};

// Validate the username
UserSchema.plugin(mongooseUniqueValidator, {
  message: "Username already exists. Duplicate key",
});

const User = models.Users || model("Users", UserSchema);

export default User;
