import mongoose from "mongoose";
mongoose.Promise = global.Promise;

const UserSchema = mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profilePicture: {
      type: String,
    },
    coverPicture: {
      type: String,
    },
    about: {
      type: String,
    },
    livesIn: {
      type: String,
    },
    worksAt: {
      type: String,
    },
    relationship: {
      type: String,
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    imported: String,
    notification: {
      type: [
        {
          activity: String,
          userId: String,
          postId: String,
          commentId: String,
          commentPostId: String,
          name: String,
          profilePicture: String,
          time: { type: Date, default: Date.now },
        },
      ],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const UserSchemaVirtual = UserSchema.virtual("fullname");
UserSchemaVirtual.get(function () {
  return this.firstname + " " + this.lastname;
});

UserSchemaVirtual.set(function (name) {
  let split = name.split(" ");
  this.firstname = split[0];
  this.lastname = split[1];
});

const UserModel = mongoose.models.Users || mongoose.model("Users", UserSchema);
export default UserModel;
