const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  userName: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Password hash middleware.

UserSchema.pre("save", async function (next) {
  const user = this;

  // Generate salt only if password is modified
  if (user.isModified("password")) {
    const salt = await bcrypt.genSalt(10);

    // Hash the password using the generated salt
    const hash = await bcrypt.hash(user.password, salt);

    // Set the hashed password
    user.password = hash;
  }

  next();
});

// Helper method for validating user's password.

UserSchema.methods.comparePassword = async function comparePassword(
  candidatePassword
) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err; // Re-throw the error
  }
};

module.exports = mongoose.model("User", UserSchema);
