import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const Header = (props) => {
  const location = useLocation();
  const path = location.pathname;
  let [showButton, setShowButton] = useState(true);
  useEffect(() => {
    if (
      path.toLowerCase().includes("edit") ||
      path.toLowerCase().includes("blogs")
    ) {
      setShowButton(false);
    } else {
      setShowButton(true);
    }
  }, [path]);

  return (
    <header>
      <Link to="/">
        <h1>My Blog App</h1>
      </Link>

      {showButton && (
        <button className="button" onClick={props.createBlogHandler}>
          {!props.showForm ? <b>Create Blog</b> : <b>Cancel Blog</b>}
        </button>
      )}
    </header>
  );
};
export default Header;
