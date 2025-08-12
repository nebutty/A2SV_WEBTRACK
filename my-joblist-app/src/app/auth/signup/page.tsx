"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { signIn } from "next-auth/react";

export default function SignUp() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "", email: "", password: "", confirmPassword: "", role: "user"
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (form.password !== form.confirmPassword)
    return setError("Passwords do not match");

  try {
    const res = await fetch("https://akil-backend.onrender.com/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      console.log('Token:', data.token); 
      setError(data.message || "Signup failed");
    } else {
      alert("OTP sent to your email");
      router.push(`/auth/verify-email?email=${form.email}`);
    }
  } catch (err) {
    setError("Something went wrong");
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded max-w-md w-full shadow">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Sign Up Today!</h1>

       <button
  type="button"
  onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
  className="w-full border rounded-md py-2 mb-3 text-sm font-medium flex items-center justify-center space-x-2 text-indigo-600 border-indigo-300"
>
  <img src="/google-icon.svg" alt="Google" className="w-4 h-4" />
  <span>Sign Up with Google</span>
</button>

        <div className="text-center text-gray-400 text-sm mb-4">Or Sign Up with Email</div>

        <Input name="name" placeholder="Enter your full name" onChange={handleChange} value={form.name} />
        <Input name="email" type="email" placeholder="Enter email address" onChange={handleChange} value={form.email} />
        <Input name="password" type="password" placeholder="Enter password" onChange={handleChange} value={form.password} />
        <Input name="confirmPassword" type="password" placeholder="Confirm password" onChange={handleChange} value={form.confirmPassword} />

        <Button text="Continue" />

        {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}

        <p className="text-center text-sm mt-2">Already have an account? <a href="/auth/login" className="text-indigo-600 font-medium">Login</a></p>

        <p className="text-xs text-center text-gray-500 mt-3">
          By clicking 'Continue', you acknowledge that you have read and accepted our{" "}
          <span className="text-indigo-600">Terms of Service</span> and <span className="text-indigo-600">Privacy Policy</span>.
        </p>
      </form>
    </div>
  );
}
