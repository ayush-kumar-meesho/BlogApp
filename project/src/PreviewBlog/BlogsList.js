import { useHistory, Link } from "react-router-dom";
import "./BlogsList.css";
import Button from "../UI/Button";
import React from "react";
const BlogsList = (props) => {
  const history = useHistory();
  const handleClickOnCard = (id) => {
    history.push(`/blogs/${id}`);
  };
  const reactions = ["👍", "🎉", "❤️", "🚀", "👀"];
  let blogContent = [];
  props.blogs.map((blog) => {
    if (blog.blog.length > 195) {
      let tempContent = blog.blog.slice(0, 188);
      blogContent.push(tempContent);
    } else {
      blogContent.push(blog.blog);
    }
    return "";
  });
  const themes = [];
  for (let i = 0; i < props.blogs.length; i++) {
    const singleTheme = [];
    for (let j = 0; j < 6; j++) {
      if (props.blogs[i].theme[j].isSelected) {
        singleTheme.push(props.blogs[i].theme[j].name);
      }
    }
    themes.push(singleTheme);
  }
  const blogReactions = [];
  for (let i = 0; i < props.blogs.length; i++) {
    const singleReaction = [];
    for (let j = 0; j < 5; j++) {
      if (props.blogs[i].reactions[j] !== 0) {
        singleReaction.push({
          reactionEmoji: reactions[j],
          count: props.blogs[i].reactions[j],
        });
      }
    }
    blogReactions.push(singleReaction);
  }
  return (
    <div className="blogList">
      <h2 className="header">
        <u>Uploaded Blogs</u>
      </h2>
      <ul>
        {props.blogs.map((blog, index) => (
          <li key={index}>
            <b>
              <u>{blog.title}</u>
            </b>
            <p id="author_time">
              <i>{`by ${blog.author} on ${blog.time.slice(3)}`}</i>
            </p>
            <div id="blogList_theme">
              {themes[index].map((th) => (
                <div className="themes_blog">{th}</div>
              ))}
            </div>
            <div id="content">
              {blogContent[index]}{" "}
              {blog.blog.length > 195 && (
                <Link to={`/blogs/${blog.id}`} className="link">
                  ...see more
                </Link>
              )}
            </div>
            <div id="reactions">
              {blogReactions[index].map((reaction, index) => {
                return (
                  <div
                    key={`${props.blogs.id}${index}`}
                    className="reaction_div"
                  >{`  ${reaction.reactionEmoji} ${reaction.count}   `}</div>
                );
              })}
            </div>
            <Button onClick={() => handleClickOnCard(blog.id)}>
              View Blog
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlogsList;
