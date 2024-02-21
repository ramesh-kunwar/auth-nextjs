"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SignupPage = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response?.data);
      router.push("/login");
    } catch (error: any) {
      console.log("SIGNUP FAILED");
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.name.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold my-4">
        {loading ? "Loading..." : "Signup"}
      </h1>
      <hr />
      <div className="mt-3">
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
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
        disabled={buttonDisabled}
        className={`     "p-2 border border-gray-300 rounded-lg my-4 focus:outline-none focus:border-gray-600" ${
          buttonDisabled
            ? "bg-gray-300 text-gray-800"
            : "bg-blue-500 text-white"
        }`}
      >
        Signup Here
      </button>

      <Link href={"/login"}>Visit Login page</Link>
    </div>
  );
};
export default SignupPage;
