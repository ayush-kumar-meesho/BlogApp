import UploadImage from "../CreateBlog/UploadImage";
import React, { useState } from "react";
import "./EditBlog.css";
import Button from "../UI/Button";
import { useParams, useHistory } from "react-router-dom";
import Modal from "../UI/Modal";
function EditBlog(props) {
  const history = useHistory();
  const [errorMessage, setErrorMessage] = useState();
  let { id } = useParams();
  let eBlog = props.blogs.filter(
    (blog) => blog.id.toString() === id.toString()
  )[0];
  const [image, setImage] = useState(eBlog.image);
  const onSaveHandler = (img) => {
    setImage(img);
  };
  const [title, setTitle] = useState(eBlog.title);
  const titleChangeHandler = (e) => {
    if (e.target.value.length > 30 || containsSpecialChars(e.target.value)) {
      setErrorMessage(
        "Please enter a title with a maximum length of 30 letters and without using any special characters! "
      );
      props.openModalHandler();
    } else {
      setTitle(e.target.value);
    }
  };
  const [author, setAuthor] = useState(eBlog.author);
  const authorChangeHandler = (e) => {
    setAuthor(e.target.value);
  };
  const [theme, setTheme] = useState(eBlog.theme);

  const onThemeHandler = (e) => {
    const updatedTheme = [...theme];
    theme[e.target.id].isSelected = !theme[e.target.id].isSelected;
    setTheme(updatedTheme);
  };
  const [reader, setReader] = useState(eBlog.reader);
  const onReaderHandler = (e) => {
    setReader(e.target.value);
  };
  const [blog, setBlog] = useState(eBlog.blog);
  const onblogChangeHandler = (e) => {
    setBlog(e.target.value);
  };
  function containsSpecialChars(str) {
    //eslint-disable-next-line
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return specialChars.test(str);
  }
  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: title,
      author: author,
      theme: theme,
      reader: reader,
      blog: blog,
      image: image,
      reactions: eBlog.reactions,
      time: eBlog.time,
      id: parseInt(id),
    };
    let isthemeSelected = false;
    for (var i = 0; i < 6; i++) {
      isthemeSelected = isthemeSelected || theme[i].isSelected;
    }
    if (author === "") {
      setErrorMessage(`Please select an author!`);
      props.openModalHandler();
    } else if (isthemeSelected === false) {
      setErrorMessage(`Please select atleast one theme!`);
      props.openModalHandler();
    } else if (reader === "") {
      setErrorMessage(`Please select the level of Reader!`);
      props.openModalHandler();
    } else if (blog.length < 50) {
      setErrorMessage(
        `Please write the blog content greater than 50 characters!`
      );
      props.openModalHandler();
    } else {
      props.getUpdatedBlog(data);
      history.push(`/blogs/${data.id}`);
    }
  };
  return (
    <React.Fragment>
      <Modal
        show={props.showModal}
        onCancel={props.closeModalHandler}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={props.closeModalHandler}>Close</Button>}
      >
        {errorMessage}
      </Modal>
      <div className="edit-Blog">
        <form onSubmit={submitHandler}>
          <h3>Edit blog</h3>
          <label>Title :</label>
          <br></br>
          <input
            type="text"
            required
            onChange={titleChangeHandler}
            value={title}
          ></input>
          <br></br>
          <label>Author :</label>
          <br></br>
          <select onChange={authorChangeHandler} value={author}>
            <option value="Dan Brown">Dan Brown</option>
            <option value="JK Rowling">JK Rowling</option>
            <option value="Stephan King">Stephan King</option>
          </select>
          <br></br>
          <label>Theme :</label>
          {theme.map((t, index) => (
            <div style={{ display: "inline" }} id={index} key={index}>
              <input
                type="checkbox"
                name={t.name}
                value={t.name}
                onChange={onThemeHandler}
                id={index}
                checked={t.isSelected}
              />
              {t.name}
            </div>
          ))}
          <br></br>
          <label>Level : </label>
          <input
            type="radio"
            value="Beginner"
            name="fav_language"
            onChange={onReaderHandler}
            required
            checked={"Beginner" === reader}
          />
          Beginner
          <input
            type="radio"
            value="Intermediate"
            name="fav_language"
            onChange={onReaderHandler}
            checked={"Intermediate" === reader}
          />
          Intermediate
          <input
            type="radio"
            value="Advanced"
            name="fav_language"
            onChange={onReaderHandler}
            checked={"Advanced" === reader}
          />
          Advanced
          <br></br>
          <textarea
            placeholder="Write your blog here!"
            rows={10}
            cols={50}
            onChange={onblogChangeHandler}
            value={blog}
          ></textarea>
          <br></br>
          <div id="image">
            <UploadImage saveFiles={onSaveHandler}></UploadImage>
            <br></br>
            <p>
              <b>Uploaded Image</b>
              <br />
              <img src={image} alt={eBlog.title} width="200" height="200" />
            </p>
          </div>
          <div id="button1">
            <Button type="submit" onClick={submitHandler} className="save">
              Save
            </Button>
          </div>
          <br></br>
        </form>
      </div>
    </React.Fragment>
  );
}

export default EditBlog;
