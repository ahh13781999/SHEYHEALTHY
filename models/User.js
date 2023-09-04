const { Schema, model } = require("mongoose")
const { genSalt, hash, compare } = require("bcryptjs")

const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isDoctor: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    seenNotifications: {
      type: Array,
      default: [],
    },
    unseenNotifications: {
      type: Array,
      default: [],
    },
  },
  {
    timestamps: true,
  }
)

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return
  const salt = await genSalt(10)
  this.password = await hash(this.password, salt)
})

UserSchema.methods.VerifyPassword = async function (UserEnteredPassword) {
  const IsPasswordCorrect = await compare(UserEnteredPassword, this.password)
  return IsPasswordCorrect
}

module.exports = model("User", UserSchema)
