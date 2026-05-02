"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    if (!name || !email) return alert("Fill all fields");

    login({ name, email });
    router.push("/");
  };

  return (
    <main className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-2xl shadow w-[350px]">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input
          placeholder="Name"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          className="border p-2 w-full mb-4 rounded"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-2 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}