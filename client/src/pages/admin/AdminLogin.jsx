import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    setError("");
    try {
      await login(data.email, data.password);
      navigate("/admin/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 relative overflow-hidden">

      {/* Background Glow Effects */}
      <div className="absolute w-96 h-96 bg-blue-600/20 rounded-full blur-3xl -top-20 -left-20"></div>
      <div className="absolute w-96 h-96 bg-purple-600/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

      {/* Back Button */}
      <div className="w-full max-w-md mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-white transition"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Home</span>
        </Link>
      </div>

      {/* Main Content Wrapper */}
      <div className="w-full max-w-md flex flex-col items-center text-center z-10">

        {/* Logo */}
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-2xl shadow-xl mb-5 overflow-hidden">
          <img 
            src="/oceanr logo.png" 
            alt="OceanR Logo" 
            className="w-full h-full object-contain p-2"
          />
        </div>

        {/* Heading Section (Now PERFECTLY CENTERED) */}
        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          OCEAN<span className="text-blue-500">R</span>
        </h1>

        <p className="text-lg font-semibold text-blue-300 mt-2">
          Admin Panel
        </p>

        <p className="text-gray-400 text-xs mt-2 mb-6 max-w-sm">
          Secure access for administrators only
        </p>

        {/* Login Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">

          <h2 className="text-xl font-bold text-white mb-5">
            Sign In
          </h2>

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-400/40 text-red-200 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">

            {/* Email */}
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
                  {...register("email", { required: "Email is required" })}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="admin@oceanr.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="text-sm text-gray-300 font-medium">
                Password
              </label>
              <div className="relative mt-2">
                <Lock
                  className="absolute left-3 top-3.5 text-gray-400"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password", {
                    required: "Password is required",
                  })}
                  className="w-full pl-10 pr-12 py-2.5 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-blue-400 hover:text-blue-300 transition"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg transition-all flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <div className="w-4 h-4 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded overflow-hidden">
                    <img 
                      src="/oceanr logo.png" 
                      alt="OceanR Logo" 
                      className="w-full h-full object-contain p-0.5"
                    />
                  </div>
                  Sign In to Admin
                </>
              )}
            </button>
          </form>

          <p className="text-center text-gray-500 text-xs mt-6">
            Protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
