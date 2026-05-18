import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-gray-800">404</h1>

      <h2 className="mt-4 text-3xl font-bold text-gray-700">
        Page Not Found
      </h2>

      <p className="mt-2 max-w-md text-gray-500">
        Sorry, the page you are looking for does not exist or has been moved.
      </p>

      <Link
        to="/"
        className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-white shadow-md transition hover:bg-blue-700"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFound;