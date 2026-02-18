const dummy = () => 1;

const totalLikes = (blogs = []) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs = []) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((prev, current) => (current.likes > prev.likes ? current : prev));

  return structuredClone(favorite);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
