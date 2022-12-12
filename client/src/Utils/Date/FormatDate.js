const FormatDate = (date) => {
  const newDate = new Date(date);
  const postSeconds = newDate.getTime();
  const todaySeconds = new Date().getTime();
  let difference;
  if (postSeconds < todaySeconds) {
    difference = Math.round((todaySeconds - postSeconds) / 1000);
  } else {
    difference = 0;
  }
  let timeAgo;
  if (difference > 86400) {
    let days = Math.round(difference / 86400);
    timeAgo = days > 1 ? days + " days ago" : days + " day ago";
  } else if (difference > 3600) {
    let hours = Math.round(difference / 3600);
    timeAgo = hours > 1 ? hours + " hours ago" : hours + " hour ago";
  } else if (difference > 60) {
    let minutes = Math.round(difference / 60);
    timeAgo = minutes > 1 ? minutes + " minutes ago" : minutes + " minute ago";
  } else {
    switch (difference) {
      case 0:
        timeAgo = "now";
        break;
      case 1:
        timeAgo = "a second ago";
        break;
      default:
        timeAgo = difference + " seconds ago";
    }
  }
  return timeAgo;
};
export default FormatDate;
