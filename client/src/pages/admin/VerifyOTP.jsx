import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ArrowLeft, ShieldCheck, Key, Clock } from "lucide-react";
import api from "../../utils/api";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600);
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);

  const email = location.state?.email || "";

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  /* ================= TIMER ================= */
  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  /* ================= OTP INPUT ================= */
  const handleOtpChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;

    const updated = [...otpValues];
    updated[index] = value;
    setOtpValues(updated);
    setValue("otp", updated.join(""));

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const digits = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6)
      .split("");

    const updated = ["", "", "", "", "", ""];
    digits.forEach((d, i) => (updated[i] = d));

    setOtpValues(updated);
    setValue("otp", updated.join(""));
  };

  /* ================= SUBMIT ================= */
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/verify-otp", {
        email,
        otp: data.otp,
      });

      toast.success(response.data.message);
      
      // Debug: Log the response structure
      console.log("API Response:", response.data);
      
      // Check if token exists in response
      const token = response.data.resetToken;
      if (!token) {
        console.error("No token found in response:", response.data);
        toast.error("Invalid response from server. Please contact support.");
        return;
      }
      
      localStorage.setItem("resetToken", token);
      console.log("Token stored:", token);
      
      navigate("/admin/reset-password", {
        state: {
          email,
        },
      });
    } catch (err) {
      toast.error(err.response?.data?.message || "Invalid OTP");
      setOtpValues(["", "", "", "", "", ""]);
      setValue("otp", "");
      document.getElementById("otp-0")?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
      setTimeLeft(600);
      setOtpValues(["", "", "", "", "", ""]);
      setValue("otp", "");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a] text-white text-center px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4">Email Required</h2>
          <Link
            to="/admin/forgot-password"
            className="text-blue-400 hover:text-blue-300"
          >
            ← Back to Forgot Password
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      
  

      {/* Main Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center text-center z-10">

        {/* Logo */}
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-2xl shadow-xl mb-5 overflow-hidden">
          <img 
            src="/oceanr logo.png" 
            alt="OceanR Logo" 
            className="w-full h-full object-contain p-2"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-white">
          OCEAN<span className="text-blue-500">R</span>
        </h1>

        <p className="text-lg font-semibold text-blue-300 mt-2">
          Verify OTP
        </p>

        <p className="text-gray-400 text-xs mt-2 mb-6 max-w-sm">
          Enter the 6-digit code sent to your email
        </p>

        {/* Glass Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

          {/* Email + Timer */}
          <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 mb-5 text-xs text-blue-300">
            <p className="font-mono break-all">{email}</p>
            <div className="flex justify-center items-center gap-2 mt-2">
              <Clock size={14} />
              <span className={timeLeft < 60 ? "text-red-400" : ""}>
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>

          {/* OTP Inputs */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="flex justify-center gap-2">
              {otpValues.map((value, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={value}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={index === 0 ? handlePaste : undefined}
                  className="w-10 h-12 text-center text-lg font-bold bg-white/10 border border-white/20 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                />
              ))}
            </div>

            <input
              type="hidden"
              {...register("otp", {
                required: "OTP is required",
                minLength: { value: 6, message: "OTP must be 6 digits" },
              })}
            />

            {errors.otp && (
              <p className="text-red-400 text-xs text-center">
                {errors.otp.message}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || otpValues.join("").length !== 6}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Key size={18} />
                  Verify OTP
                </>
              )}
            </button>
          </form>

          {/* Resend */}
          <div className="mt-5 text-center">
            <button
              onClick={handleResendOTP}
              disabled={loading || timeLeft > 0}
              className="text-blue-400 hover:text-blue-300 text-xs font-medium disabled:text-gray-500"
            >
              {timeLeft > 0
                ? `Resend OTP in ${formatTime(timeLeft)}`
                : "Resend OTP"}
            </button>
          </div>

          <p className="text-center text-gray-500 text-xs mt-5">
            Protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
