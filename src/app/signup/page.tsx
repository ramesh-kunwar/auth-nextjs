"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { axios } from "axios";

const SignupPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const onSignup = async () => {
    console.log("signup");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold my-4">Signup</h1>
      <hr />
      <div className="mt-3">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          className="p-1 rounded  block text-black"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          className="p-1 rounded  block text-black"
        />
      </div>
      <div className="mt-3">
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          className="p-1 rounded  block text-black"
        />
      </div>

      <button
        onClick={onSignup}
        className="p-2 border border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600"
      >
        Signup Here
      </button>

      <Link href={"/login"}>Visit Login page</Link>
    </div>
  );
};
export default SignupPage;
