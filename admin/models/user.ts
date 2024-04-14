import pkg from "mongoose";
const { Schema, model, models } = pkg;
import bcrypt from "bcrypt";
import mongooseUniqueValidator from "mongoose-unique-validator";

interface IUser extends Document {
  fullName: string;
  email: string;
  userName: string;
  password: string;
  generateHash: (password: string) => string;
  validPassword: (password: string, dbPassword: string) => boolean;
}

const UserSchema = new Schema<IUser>({
  fullName: {
    type: String,
    required: [true, "Please enter fullName"],
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
UserSchema.methods.generateHash = (password: string) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
};

// Validate the password
UserSchema.methods.validPassword = (password: string, dbPassword: string) => {
  return bcrypt.compareSync(password, dbPassword);
};

// Validate the username
UserSchema.plugin(mongooseUniqueValidator, {
  message: "Username already exists. Duplicate key",
});

const User =
  (models.Users as pkg.Model<IUser>) || model<IUser>("Users", UserSchema);

export default User;
