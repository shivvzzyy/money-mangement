import React from "react";
import Navbar from "../../components/Navbar/index.jsx";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";

const Home = () => {
  return (
    <>
      <Navbar fixed />
      <section className="header relative pt-16 items-center flex h-screen">
        <div className="container mx-auto items-center flex flex-wrap">
          <div className="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
            <div className="pt-32 sm:pt-0">
              <h2 className="font-semibold text-4xl text-base-content">
                <Typewriter
                  options={{
                    strings: [
                      "Track Your Expenses Seamlessly",
                      "Achieve Your Financial Goals",
                      "Stay in Control of Your Budget",
                    ],
                    autoStart: true,
                    loop: true,
                  }}
                />
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-base-content/60">
                Welcome to our Expense Tracker! This powerful tool is designed
                to help you monitor your income, track expenses, and optimize
                your savings. With real-time insights and advanced analytics,
                managing your finances has never been easier.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-base-content/60">
                Whether you're budgeting for personal expenses or tracking
                business finances, our app offers a simple and intuitive
                interface to keep everything organized. Join us on the journey
                to financial freedom today!
              </p>
              <div className="mt-12">
                <Link to="/auth/register" className="btn btn-primary">
                  Get Started
                </Link>
                <Link to="/learn-more" className="btn btn-secondary ml-4">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
        <img
          className="absolute -z-10 top-4 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
          src="/img/pattern_nextjs.png"
          alt="Expense Tracker Background"
        />
      </section>
    </>
  );
};

export default Home;
