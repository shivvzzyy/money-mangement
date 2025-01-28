import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../Navbar";
import axios from "axios";
import toast from "react-hot-toast";

export default function Register() {
  const [form, setFrom] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!form.password || !form.name || !form.email) {
      toast.error("All Fields are required");
      return;
    }
    const response = axios.post(`http://localhost:5000/api/auth/register`, {
      form,
    });
    toast.promise(response, {
      loading: "Creating User...",
      success: () => {
        router("/auth/login");
        return "Account Created successfully";
      },
      error: (error) => {
        console.log(error.message);
        return "Something went wrong";
      },
    });
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 h-screen pt-10">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-base-300 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-base-content text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-base-content active:bg-primary text-base-300 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/github.svg" />
                    Github
                  </button>
                  <button
                    className="bg-base-content active:bg-primary text-base-300 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img alt="..." className="w-5 mr-1" src="/img/google.svg" />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-primary" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-base-content text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form onSubmit={(e) => handleFormSubmit(e)}>
                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-base-content/80 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      className="border-0 px-3 py-3 text-base-content bg-base-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Name"
                      value={form.name}
                      onChange={(e) =>
                        setFrom({ ...form, name: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-base-content/80 text-xs font-bold mb-2"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="border-0 px-3 py-3 text-base-content bg-base-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Email"
                      value={form.email}
                      onChange={(e) =>
                        setFrom({ ...form, email: e.target.value })
                      }
                    />
                  </div>

                  <div className="relative w-full mb-3">
                    <label
                      className="block uppercase text-base-content/80 text-xs font-bold mb-2"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      className="border-0 px-3 py-3 text-base-content bg-base-100 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                      placeholder="Password"
                      value={form.password}
                      onChange={(e) =>
                        setFrom({ ...form, password: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-base-content ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-base-content">
                        I agree with the{" "}
                        <Link
                          href="#pablo"
                          className="text-primary hover:underline"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </Link>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                    <button
                      type="submit"
                      className="bg-primary text-primary-content active:bg-primary-focus text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                    >
                      Create Account
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
