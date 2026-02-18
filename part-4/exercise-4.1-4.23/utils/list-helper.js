const dummy = () => 1;

const totalLikes = (blogs = []) => blogs.reduce((sum, blog) => sum + blog.likes, 0);

const favoriteBlog = (blogs = []) => {
  if (blogs.length === 0) return null;

  const favorite = blogs.reduce((prev, current) => (current.likes > prev.likes ? current : prev));

  return structuredClone(favorite);
};

const mostBlogs = (blogs = []) => {
  if (blogs.length === 0) return null;

  const authorGroups = Object.groupBy(blogs, (blog) => blog.author);

  const mostBlogsAuthor = Object.keys(authorGroups).reduce((prev, current) =>
    authorGroups[current].length > authorGroups[prev].length ? current : prev,
  );

  return {
    author: mostBlogsAuthor,
    blogs: authorGroups[mostBlogsAuthor].length,
  };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
