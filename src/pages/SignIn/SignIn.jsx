import React, { useState } from "react";
import { enqueueSnackbar } from "notistack";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { signInWithEmail } from "../../firebase-config";

//Simple on dark component
export default function SignIn() {
  const [userCred, setUserCred] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);

  const onInputChangeHandler = (e) => {
    setUserCred({ ...userCred, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { email, password } = userCred;
    try {
      setIsLoading(true);
      const userCredentials = await signInWithEmail(email, password);
      //console.log("user signed in", userCredentials);
      if (userCredentials) {
        //set The email address as auth context
        navigate("/");
      }
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      // enqueueSnackbar("Sth went wrong, please try again", { variant: "error" });
      alert("enter correct info");
      console.log("error", err);
    }
  };

  return (
    <>
      <div className="h-[100vh] bg-gray-900">
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-white"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={userCred.email}
                    onChange={onInputChangeHandler}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-400 hover:text-indigo-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={userCred.password}
                    onChange={onInputChangeHandler}
                    className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                >
                  Sign in
                </button>
              </div>
            </form>

            {/* <p className="mt-10 text-center text-sm text-gray-400">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-400 hover:text-indigo-300"
              >
                Start a 14 day free trial
              </a>
            </p> */}
          </div>
        </div>
      </div>
    </>
  );
}
