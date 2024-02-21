"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("RESPONSE", response);

      router.push("/profile");
    } catch (error: any) {
      console.log("LOGIN FAILED", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-4xl font-bold my-4">Login</h1>
      <hr />

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
        onClick={onLogin}
        className="p-2 border border-gray-300 rounded-lg my-4 bg-green-600 focus:outline-none focus:border-gray-600"
      >
        Login
      </button>

      <Link href={"/signup"}>Signup Here</Link>
    </div>
  );
};
export default LoginPage;
