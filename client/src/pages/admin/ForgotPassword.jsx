import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
  Mail,
  ArrowLeft,
  ShieldCheck,
  Send,
  Key,
} from "lucide-react";
import api from "../../utils/api";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [verifying, setVerifying] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", data);
      setOtpSent(true);
      setEmail(data.email);
      toast.success(response.data.message);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error(
          "Only admin users can reset passwords. Please contact administrator."
        );
      } else {
        toast.error(
          err.response?.data?.message || "Failed to send OTP"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await api.post("/auth/forgot-password", { email });
      toast.success(response.data.message);
    } catch (err) {
      if (err.response?.status === 403) {
        toast.error(
          "Only admin users can reset passwords. Please contact administrator."
        );
      } else {
        toast.error(
          err.response?.data?.message || "Failed to resend OTP"
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (otp.length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setVerifying(true);
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      toast.success(response.data.message);
      
      // Store token in localStorage
      const token = response.data.resetToken;
      if (!token) {
        toast.error("Invalid response from server. Please contact support.");
        return;
      }
      localStorage.setItem("resetToken", token);
      
      // Navigate to reset password page
      navigate("/admin/reset-password", { 
        state: { 
          email
        } 
      });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Invalid OTP. Please try again."
      );
    } finally {
      setVerifying(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 relative overflow-hidden">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      {/* Back to Login */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/admin/login"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Login</span>
        </Link>
      </div>

      {/* Main Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center text-center z-10">

        {/* Logo */}
        <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-2xl shadow-xl mb-6 overflow-hidden">
          <img 
            src="/oceanr logo.png" 
            alt="OceanR Logo" 
            className="w-full h-full object-contain p-2"
          />
        </div>

        <h1 className="text-4xl font-extrabold text-white tracking-wide">
          OCEAN<span className="text-blue-500">R</span>
        </h1>

        <p className="text-blue-300 font-semibold mt-2">
          Password Recovery
        </p>

        <p className="text-gray-400 text-sm mt-2 mb-8 max-w-sm">
          Secure reset process for administrators
        </p>

        {/* Glass Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl">

          {!otpSent ? (
            <>
              <h2 className="text-2xl font-bold text-white mb-2">
                Forgot Password?
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Enter your registered admin email and we’ll send you a
                secure OTP.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5 text-left"
              >
                <div>
                  <label className="text-sm text-gray-300 font-medium">
                    Email Address
                  </label>
                  <div className="relative mt-2">
                    <Mail
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="admin@oceanr.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Send OTP
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Key size={30} className="text-green-400" />
              </div>

              <h2 className="text-2xl font-bold text-white mb-2">
                OTP Sent Successfully
              </h2>

              <p className="text-gray-400 text-sm mb-4">
                A 6-digit verification code has been sent to:
              </p>

              <div className="bg-blue-500/10 border border-blue-400/20 rounded-lg p-3 mb-6 text-blue-300 font-mono text-sm">
                {email}
              </div>

              {/* OTP Input Section */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-300 font-medium text-left block mb-2">
                    Enter OTP
                  </label>
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/10 rounded-lg text-white text-center text-xl font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                <button
                  onClick={handleVerifyOTP}
                  disabled={verifying || otp.length !== 6}
                  className="w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {verifying ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Key size={18} />
                      Verify OTP
                    </>
                  )}
                </button>

                <button
                  onClick={handleResendOTP}
                  disabled={loading}
                  className="w-full py-3 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 transition flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Send size={18} />
                      Resend OTP
                    </>
                  )}
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10">
                <Link
                  to="/admin/login"
                  className="text-blue-400 hover:text-blue-300 text-sm font-medium inline-flex items-center gap-2"
                >
                  <ArrowLeft size={16} />
                  Back to Login
                </Link>
              </div>
            </div>
          )}

          <p className="text-center text-gray-500 text-xs mt-6">
            Protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
