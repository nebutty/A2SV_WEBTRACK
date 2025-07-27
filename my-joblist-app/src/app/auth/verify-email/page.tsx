"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Button from "../../components/Button";

export default function VerifyEmail() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();
  const [OTP, setOTP] = useState(["", "", "", ""]);
  const [counter, setCounter] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = async () => {
    const code = OTP.join("");
    const res = await fetch("https://akil-backend.onrender.com/verify-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, OTP: code }),
    });

    if (res.ok) router.push("/dashboard");
    else alert("Verification failed");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-2">Verify Email</h2>
        <p className="text-sm text-gray-600 mb-4">
          We’ve sent a verification code to the email address you provided.
          Please enter the code here.
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          {OTP.map((val, i) => (
            <input
  key={i}
  maxLength={1}
  className="border border-indigo-300 w-10 h-12 text-center rounded-md text-lg"
  value={val}
  onChange={(e) => {
    const value = e.target.value;
    const newOTP = [...OTP];

    if (/^\d$/.test(value)) {
      newOTP[i] = value;
      setOTP(newOTP);
      if (i < 3) document.getElementById(`otp-${i + 1}`)?.focus();
    } else if (value === "") {
      newOTP[i] = "";
      setOTP(newOTP);
    }
  }}
  onKeyDown={(e) => {
    if (e.key === "Backspace" && OTP[i] === "" && i > 0) {
      const prevInput = document.getElementById(`otp-${i - 1}`);
      if (prevInput) prevInput.focus();
    }
  }}
  id={`otp-${i}`}
/>

          ))}
        </div>

        {counter === 0 ? (
  <button
    onClick={async () => {
      const res = await fetch("https://akil-backend.onrender.com/resend-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP resent!");
        setCounter(30);
      } else {
        alert(data.message || "Failed to resend OTP");
      }
    }}
    className="text-indigo-600 font-semibold text-sm"
  >
    Resend code
  </button>
) : (
  <p className="text-sm text-gray-500">
    You can request to <span className="font-semibold text-indigo-600">Resend code</span> in{" "}
    <span className="font-semibold">{counter}</span>s
  </p>
)}


        <div className="mt-4">
          <Button text="Continue" onClick={handleVerify} />
        </div>
      </div>
    </div>
  );
}
