import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h1>404</h1>
      Nothing here soz.
      <h4>
        <Link to="/">Go back.</Link>
      </h4>
    </div>
  );
};

export default NotFound;
