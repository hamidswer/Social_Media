import express from "express";
import User from "../controllers/user/UserController.js";
import UpdateUser from "../controllers/user/UpdateUserController.js";
import DeleteUser from "../controllers/user/DeleteUserController.js";
import FollowUser from "../controllers/user/FollowUserController.js";
import UnfollowUser from "../controllers/user/UnfollowUserController.js";
import RandomUsers from "../controllers/user/RandomUsersController.js";
import Protected from "../helpers/user/Protected.js";
import SearchUser from "../controllers/user/SearchUserController.js";
import ValidUserId from "../middleware/user/ValidUserId.js";
const router = express.Router();

// get => get - random users
router.get("/", RandomUsers);

router.post("/search/", SearchUser);

//update => put to follow
router.put("/follow", FollowUser);

//update => put to unfollow
router.put("/unfollow", UnfollowUser);
// get => get - get a user exist
router.get("/:id", User);

//update => put - update user information
router.put("/:id", UpdateUser);

// delete => delete - a user
router.delete("/:id", ValidUserId, DeleteUser);

export default router;
