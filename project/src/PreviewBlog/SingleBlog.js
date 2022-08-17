import "./SingleBlog.css";
import { useParams, useHistory } from "react-router-dom";
import Button from "../UI/Button";
import { useState } from "react";
const SingleBlog = (props) => {
  const history = useHistory();
  let { id } = useParams();
  const blogList = props.blogs.filter((blog) => {
    return blog.id.toString() === id.toString();
  });

  const blog = blogList[0];
  let theme = [];
  for (let i = 0; i < 6; i++) {
    if (blog.theme[i].isSelected) {
      theme.push(blog.theme[i].name);
    }
  }
  const [reactionsCount, updateReactionCount] = useState(blog.reactions);
  const reactions = ["👍", "🎉", "❤️", "🚀", "👀"];
  const reactionChangeHandler = (e) => {
    const updated = [...reactionsCount];
    updated[e.target.id]++;
    updateReactionCount(updated);
    props.setReaction(updated, id);
  };
  const onEditHandler = () => {
    history.push(`/blog/edit/${id}`);
  };

  return (
    <div className="SingleBlog">
      <h1 id="header">
        <u>{blog.title}</u>
      </h1>
      <div className="text">{`by "${blog.author}" created at ${blog.time}`}</div>
      <div>
        <b>Reader</b>- {blog.reader}
      </div>
      <div>
        {theme.map((th) => (
          <div className="singleBlog_theme">{th}</div>
        ))}
      </div>
      <div className="content">{blog.blog}</div>
      <div id="img">
        <img src={blog.image} width={200} height={200} alt={blog.title} />
      </div>
      <div id="button">
        {reactions.map((reaction, index) => (
          <button
            onClick={reactionChangeHandler}
            id={index}
            style={{ display: "inline" }}
            key={index}
            className="reactionButton"
          >
            {reaction} - {reactionsCount[index]}
          </button>
        ))}
      </div>

      <br />
      <Button onClick={onEditHandler}>Edit</Button>
    </div>
  );
};
export default SingleBlog;
