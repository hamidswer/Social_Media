const hasContent = (data) => {
  if (data.desc.length === 0) {
    return false;
  } else {
    return true;
  }
};
export default hasContent;
