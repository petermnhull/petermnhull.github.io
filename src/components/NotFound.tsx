import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div>
      <h1>404</h1>
      Nothing here soz.
      <h4>
        <Link to="/">Go back.</Link>
      </h4>
    </div>
  );
}
