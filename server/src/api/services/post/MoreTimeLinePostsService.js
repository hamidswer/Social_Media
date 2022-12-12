const MoreTimeLinePostsService = async (session) => {
  session.numberOfRequest += 1;
  let posts = session.posts;
  let postsLength = posts.length;
  let resPosts = "No more Posts";
  if (postsLength < 10) {
    return { responseStatus: 500, data: "No more posts." };
  } else {
    if (session.numberOfRequest === 1) {
      if (postsLength < 20) {
        resPosts = posts.slice(10, postsLength);
        return { responseStatus: 200, data: resPosts };
      } else {
        resPosts = posts.slice(10, 20);
        return { responseStatus: 200, data: resPosts };
      }
    } else if (session.numberOfRequest === 2) {
      if (postsLength < 20) {
        return { responseStatus: 500, data: "No more posts." };
      } else if (postsLength < 30) {
        resPosts = posts.slice(20, postsLength);
        return { responseStatus: 200, data: resPosts };
      } else {
        resPosts = posts.slice(20, 30);
        return { responseStatus: 200, data: resPosts };
      }
    } else {
      return { responseStatus: 500, data: "No more Posts!" };
    }
  }
};
export default MoreTimeLinePostsService;
