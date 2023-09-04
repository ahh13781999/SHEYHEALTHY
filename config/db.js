const { connect } = require("mongoose")

const connectDB = (uri) => {
  return connect(uri)
    .then(() => console.log("SUCCESSFULLY CONNECTED TO DATABASE"))
    .catch((err) => console.log(err))
}

module.exports = connectDB
