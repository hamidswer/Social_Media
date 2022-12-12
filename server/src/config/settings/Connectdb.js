import mongoose from "mongoose";
import dotenv from "dotenv";

const Connectdb = async () => {
  dotenv.config();
  await mongoose
    .connect(
      "mongodb+srv://hgfhghjgtyfghfytfhmjhi:zkvH6JdWqUpkr0Gf@cluster0.kqyfc.mongodb.net/Cluster0?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: false,
      }
    )
    .then(() => console.log("DB connection successful!"))
    .catch((error) => console.log(error));
};
export default Connectdb;
