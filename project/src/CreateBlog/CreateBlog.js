import "./CreateBlog.css";
import UploadImage from "./UploadImage";
import React, { useState } from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
function CreateBlog(props) {
  const [errorMessage, setErrorMessage] = useState();
  const [image, setImage] = useState(null);
  const onSaveHandler = (img) => {
    setImage(img);
  };
  const [title, setTitle] = useState("");
  const titleChangeHandler = (e) => {
    if (e.target.value.length > 30) {
      setErrorMessage(
        "Please enter a title with a maximum length of 30 letters! "
      );
      props.openModalHandler();
    } else if (containsSpecialChars(e.target.value)) {
      setErrorMessage(
        "Please enter a title without using any special characters! "
      );
      props.openModalHandler();
    } else {
      setTitle(e.target.value);
    }
  };
  const [author, setAuthor] = useState("");
  const authorChangeHandler = (e) => {
    setAuthor(e.target.value);
  };
  const [theme, setTheme] = useState([
    { name: "Adventure", isSelected: false },
    { name: "Comedy", isSelected: false },
    { name: "Thriller", isSelected: false },
    { name: "Science Fiction", isSelected: false },
    { name: "Romance", isSelected: false },
    { name: "Miscellaneous", isSelected: false },
  ]);
  const onThemeHandler = (e) => {
    const updatedTheme = [...theme];
    theme[e.target.id].isSelected = !theme[e.target.id].isSelected;
    setTheme(updatedTheme);
  };

  const [reader, setReader] = useState("");
  const onReaderHandler = (e) => {
    setReader(e.target.value);
  };
  const [blog, setBlog] = useState();
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
      reactions: [0, 0, 0, 0, 0],
      time: Date().toLocaleString().substring(0, 24),
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
      props.onBlogSave(data);
      props.onFormCloseHandler();
      setTitle("");
      setAuthor("");
      setBlog("");
      setReader("null");
      setImage(null);
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
      <div className="create-Blog">
        <form onSubmit={submitHandler}>
          <h2 className="create-blog">
            <u>Add a New Blog</u>
          </h2>
          <label>Title :</label>
          <br />
          <input
            type="text"
            required
            onChange={titleChangeHandler}
            value={title}
            placeholder=" Write your title here."
          />
          <br></br>
          <label>Author :</label>
          <br />
          <select onChange={authorChangeHandler} value={author}>
            <option value="">Please select an Author :-</option>
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
              />
              {` ${t.name} `}
            </div>
          ))}
          <br></br>
          <label>Level :</label>
          <input
            type="radio"
            value="Beginner"
            name="fav_language"
            onChange={onReaderHandler}
          />
          <label className="radio-label">{" Beginner "}</label>
          <input
            type="radio"
            value="Intermediate"
            name="fav_language"
            onChange={onReaderHandler}
          />
          <label className="radio-label">{" Intermediate "}</label>
          <input
            type="radio"
            value="Advanced"
            name="fav_language"
            onChange={onReaderHandler}
          />
          <label className="radio-label">{" Advanced "}</label>
          <br></br>
          <label id="blog-content">Write your blog below!</label>
          <br />
          <textarea
            placeholder="Start typing...(Min. length: 50 Characters)"
            onChange={onblogChangeHandler}
            value={blog}
            required
          ></textarea>
          <div id="image">
            <UploadImage saveFiles={onSaveHandler} required></UploadImage>
          </div>
          {image !== null && (
            <div>
              <img src={image} alt={title} width="200" height="200" />
            </div>
          )}
          <div className="button1">
            <Button type="submit">Save</Button>
          </div>
          <br></br>
        </form>
      </div>
    </React.Fragment>
  );
}

export default CreateBlog;
