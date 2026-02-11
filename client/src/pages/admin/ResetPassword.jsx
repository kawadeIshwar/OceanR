import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Lock, Eye, EyeOff, ArrowLeft, ShieldCheck, CheckCircle2 } from 'lucide-react';
import api from '../../utils/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Get reset token and email from location state or localStorage
  const { email } = location.state || {};
  const resetToken = localStorage.getItem("resetToken");
  
  // Debug: Log token retrieval
  console.log("ResetPassword - Retrieved token:", resetToken);
  console.log("ResetPassword - Email:", email);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch('password');

  const onSubmit = async (data) => {
    if (!resetToken) {
      toast.error('Invalid reset token. Please start the password reset process again.');
      navigate('/admin/forgot-password');
      return;
    }

    setLoading(true);
    try {
      const response = await api.put('/auth/reset-password', {
        password: data.password,
        resetToken
      });
      setSuccess(true);
      toast.success(response.data.message);
      
      // Clear the reset token from localStorage
      localStorage.removeItem("resetToken");
      
      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/admin/login');
      }, 2000);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to reset password');
      // If token is invalid, redirect to forgot password
      if (err.response?.status === 400) {
        setTimeout(() => {
          navigate('/admin/forgot-password');
        }, 2000);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!resetToken) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] px-4 relative overflow-hidden">
        <div className="w-full max-w-md text-center z-10">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-xl overflow-hidden">
              <img 
                src="/oceanr logo.png" 
                alt="OceanR Logo" 
                className="w-full h-full object-contain p-1"
              />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Invalid Access</h2>
          <p className="text-gray-300 mb-6">
            Please complete the OTP verification process first.
          </p>
          <Link 
            to="/admin/forgot-password"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all"
          >
            <ArrowLeft size={20} />
            Start Password Reset
          </Link>
        </div>
      </div>
    );
  }

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
        <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-white to-gray-300 rounded-2xl shadow-xl mb-5 overflow-hidden">
          <img 
            src="/oceanr logo.png" 
            alt="OceanR Logo" 
            className="w-full h-full object-contain p-2"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-white tracking-wide">
          OCEAN<span className="text-blue-500">R</span>
        </h1>

        <p className="text-lg font-semibold text-blue-300 mt-2">
          Reset Your Password
        </p>

        <p className="text-gray-400 text-xs mt-2 mb-6 max-w-sm">
          Create a new secure password for your account
        </p>

        {/* Glass Card */}
        <div className="w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
          {!success ? (
            <>
              <h2 className="text-xl font-bold text-white mb-2">
                Create New Password
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Enter your new password below. Make sure it's strong and secure.
              </p>

              {email && (
                <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-3 backdrop-blur-sm mb-6">
                  <p className="text-green-200 text-xs">
                    ✅ OTP verified for: <span className="font-mono">{email}</span>
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-left">
                <div>
                  <label className="text-sm text-gray-300 font-medium">
                    New Password
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
                        minLength: {
                          value: 6,
                          message: "Password must be at least 6 characters",
                        },
                      })}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
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

                <div>
                  <label className="text-sm text-gray-300 font-medium">
                    Confirm New Password
                  </label>
                  <div className="relative mt-2">
                    <Lock
                      className="absolute left-3 top-3.5 text-gray-400"
                      size={18}
                    />
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      {...register("confirmPassword", {
                        required: "Please confirm your password",
                        validate: (value) =>
                          value === password || "Passwords do not match",
                      })}
                      className="w-full pl-10 pr-12 py-3 bg-white/10 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-3.5 text-gray-400 hover:text-white"
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-xs mt-1">
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </div>

                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-3 backdrop-blur-sm">
                  <p className="text-blue-200 text-xs">
                    💡 Password must be at least 6 characters long
                  </p>
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
                      <Lock size={18} />
                      Reset Password
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={28} className="text-green-400" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2">
                Password Reset Successful!
              </h2>

              <p className="text-gray-400 text-sm mb-6">
                Your password has been successfully reset. Redirecting to login...
              </p>

              <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          )}

          <p className="text-center text-gray-500 text-xs mt-5">
            Protected with enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
