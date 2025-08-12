"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("https://akil-backend.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log('Login response:', data); // Keep this for now
console.log('Token:', data.data.accessToken); 
    if (res.ok) {
      console.log('Token:', data.data.accessToken);
      localStorage.setItem("token", data.data.accessToken);
      router.push("/dashboard");
    } else setError(data.message || "Login failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded max-w-md w-full shadow">
        <h1 className="text-2xl font-bold text-center mb-6">Welcome Back,</h1>
        <Input name="email" type="email" placeholder="Enter email address" onChange={handleChange} value={form.email} />
        <Input name="password" type="password" placeholder="Enter password" onChange={handleChange} value={form.password} />
        <Button text="Login" />

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
        <p className="text-center text-sm mt-3">
          Don’t have an account? <a href="/auth/signup" className="text-indigo-600 font-medium">Sign Up</a>
        </p>
      </form>
    </div>
  );
}
