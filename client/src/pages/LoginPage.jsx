import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, isLoggedIn, error, user } = useSelector(
    (state) => state.auth
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await dispatch(loginUser({ email, password }));
    setIsSubmitting(false);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      navigate("/");
    }
  }, [status, isLoggedIn, user, navigate]);

  return (
    <section className="bg-white flex items-center justify-center h-screen">
      <div className="container px-6 py-24 lg:py-32">
        <div className="lg:flex">
          <div className="lg:w-1/2">
            <h1 className="font-bold text-4xl">Bloggify</h1>
            <h1 className="mt-4 text-gray-600 md:text-lg">Welcome back</h1>
            <h1 className="mt-4 text-2xl font-medium text-gray-800 capitalize lg:text-3xl">
              login to your account
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-500">
                Register here
              </Link>
            </p>
          </div>

          <div className="mt-8 lg:w-1/2 lg:mt-0">
            <form className="w-full lg:max-w-xl" onSubmit={handleSubmit}>
              <div className="relative flex items-center">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Email address"
                  required
                />
              </div>

              <div className="relative flex items-center mt-4">
                <span className="absolute">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 mx-3 text-gray-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="mt-8 md:flex md:items-center">
                <button
                  type="submit"
                  className={`w-full md:w-1/2 inline-flex justify-center items-center px-5 py-3 font-semibold leading-6 text-md shadow rounded-md text-white bg-blue-500 transition ease-in-out duration-150 ${
                    isSubmitting
                      ? "cursor-not-allowed hover:bg-blue-400"
                      : "hover:bg-blue-600"
                  }`}
                  disabled={isSubmitting}
                >
                  {isSubmitting && (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  )}
                  {isSubmitting ? "Signing in..." : "Sign in"}
                </button>
              </div>
              {status === "failed" && (
                <p className="mt-4 text-red-500">{error}</p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
