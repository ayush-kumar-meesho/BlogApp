import "./HomePage.css";
import CreateBlog from "../CreateBlog/CreateBlog";
import BlogsList from "../PreviewBlog/BlogsList";
const HomePage = (props) => {
  return (
    <div>
      {props.showForm && (
        <CreateBlog
          onBlogSave={props.blogsSaveHandler}
          onFormCloseHandler={props.onFormCloseHandler}
          showModal={props.showModal}
          openModalHandler={props.openModalHandler}
          closeModalHandler={props.closeModalHandler}
        />
      )}
      {props.showForm && <hr></hr>}
      {props.blogs.length === 0 ? (
        <h2 className="NoBlogs">No Blogs Available</h2>
      ) : (
        <BlogsList blogs={props.blogs}></BlogsList>
      )}
    </div>
  );
};
export default HomePage;
