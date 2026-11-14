import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div id="not-found">
      <h1>404</h1>
      <p>Nothing here soz.</p>
      <p>
        <Link to="/">Go back.</Link>
      </p>
    </div>
  );
}
