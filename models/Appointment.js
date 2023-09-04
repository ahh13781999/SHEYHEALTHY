const { Schema, model } = require("mongoose")

const AppointmentSchema = new Schema(
  {
    userId: {
      type: Schema.ObjectId,
      ref: "User",
      required: true,
    },
    doctorId: {
      type: Schema.ObjectId,
      ref: "Doctor",
      required: true,
    },
    userInfo: {
      type: Object,
      required: true,
    },
    doctorInfo: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
)

module.exports = model("Appointment", AppointmentSchema)
