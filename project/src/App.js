import { useState } from "react";
import "./App.css";
import React from "react";
import EditBlog from "./EditBlog/EditBlog";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import SingleBlog from "./PreviewBlog/SingleBlog";
import HomePage from "./HomePage/HomePage";
import Header from "./HomePage/Header";
function App() {
  const [blogs, setBlogs] = useState(
    localStorage.getItem("Blogs") === null
      ? []
      : JSON.parse(localStorage.getItem("Blogs"))
  );
  const blogsSaveHandler = (data) => {
    data.id = blogs.length + 1;
    let addedBlog = [data, ...blogs];
    setBlogs(addedBlog);
    localStorage.setItem("Blogs", JSON.stringify(addedBlog));
  };
  const getUpdatedBlog = (data) => {
    let updatedBlogs = [...blogs];
    updatedBlogs[blogs.length - data.id] = data;
    setBlogs(updatedBlogs);
    localStorage.setItem("Blogs", JSON.stringify(updatedBlogs));
  };
  const reactionHandler = (r, id) => {
    const updatedBlogs = [...blogs];
    updatedBlogs[blogs.length - id].reactions = r;
    setBlogs(updatedBlogs);
    localStorage.setItem("Blogs", JSON.stringify(updatedBlogs));
  };
  const [showForm, setShowForm] = useState(false);
  const onFormChangeHandler = () => {
    setShowForm(!showForm);
  };
  const onFormCloseHandler = () => {
    setShowForm(false);
  };
  const [showModal, setShowModal] = useState(false);
  const openModalHandler = () => {
    setShowModal(true);
  };
  const closeModalHandler = () => {
    setShowModal(false);
  };

  return (
    <div className="App">
      <Router>
        <Header
          createBlogHandler={onFormChangeHandler}
          showForm={showForm}
        ></Header>
        <Switch>
          <Route path="/" exact>
            <HomePage
              blogs={blogs}
              blogsSaveHandler={blogsSaveHandler}
              showForm={showForm}
              onFormCloseHandler={onFormCloseHandler}
              showModal={showModal}
              openModalHandler={openModalHandler}
              closeModalHandler={closeModalHandler}
            ></HomePage>
          </Route>
          <Route path="/blog/edit/:id" exact>
            <EditBlog
              blogs={blogs}
              getUpdatedBlog={getUpdatedBlog}
              showModal={showModal}
              openModalHandler={openModalHandler}
              closeModalHandler={closeModalHandler}
            ></EditBlog>
          </Route>
          <Route path="/blogs/:id" exact>
            <SingleBlog blogs={blogs} setReaction={reactionHandler} />
          </Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    </div>
  );
}
export default App;
