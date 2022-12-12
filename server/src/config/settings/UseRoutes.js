import AuthRoute from "../../api/routes/AuthRoute.js";
import UserRoute from "../../api/routes/UserRouter.js";
import PostRoute from "../../api/routes/PostRoute.js";
import CommentRoute from "../../api/routes/CommentRoute.js";
import ImageRoute from "../../api/routes/ImageRoute.js";
import videoRoute from "../../api/routes/VideoRoute.js";
import ImportUsers from "./ImportUsers.js";
import NotificationRoute from "../../api/routes/NotificationRoute.js";
const UseRoutes = (app) => {
  app.use("/auth", AuthRoute);
  app.use("/user", UserRoute);
  app.use("/post", PostRoute);
  app.use("/comment", CommentRoute);
  app.use("/upload/image/", ImageRoute);
  app.use("/upload/video", videoRoute);
  app.use("/notification", NotificationRoute);

  // app.use("/import/users", ImportUsers);
};
export default UseRoutes;
