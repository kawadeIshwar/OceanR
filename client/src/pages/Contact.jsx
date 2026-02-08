import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, CheckCircle, Building2, Briefcase, Clock, Send } from 'lucide-react';
import ScrollAnimation from '../components/ScrollAnimation';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    setSubmitting(true);
    try {
      // Debug: Check if environment variables are loaded
      console.log('Environment variables:', {
        serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
        templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      });

      const templateParams = {
        to_name: 'OceanR Team',
        from_name: data.name,
        from_email: data.email,
        phone: data.phone,
        company: data.company,
        industry: data.industry,
        inquiry_type: data.inquiryType,
        message: data.message,
        budget: data.budget || 'Not specified'
      };

      // Temporarily hardcoded for testing
      await emailjs.send(
        'service_7ria3hi',
        'template_7x1owqb',
        templateParams,
        'xgR36pTh_ngS2sRMa'
      );

      setSubmitted(true);
      reset();
      toast.success('Message sent successfully! We\'ll get back to you within 24 hours.');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-[#0f172a] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-40"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full mb-6 animate-pulse">
              <span className="text-sm font-semibold tracking-wide">WE'RE HERE TO HELP</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
              Let's Start a <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Conversation</span>
            </h1>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
              Share your requirements with us and let our experts help you find the perfect solution for your business needs
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 relative z-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {/* Contact Information Cards - On Left for Desktop */}
            <div className="lg:col-span-1 order-2 lg:order-1 space-y-5">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Phone Support</h3>
                    <a href="tel:+917620980794" className="text-blue-600 hover:text-blue-700 font-semibold text-lg block mb-1">
                      +91 7620980794
                    </a>
                    <p className="text-sm text-gray-500">Mon-Sat, 9AM-6PM IST</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Email Us</h3>
                    <a
                      href="mailto:oceanrenterprises@gmail.com"
                      className="text-emerald-600 hover:text-emerald-700 font-semibold break-all block mb-1"
                    >
                      oceanrenterprises@gmail.com
                    </a>
                    <p className="text-sm text-gray-500">24/7 Support Available</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-2 text-gray-900">Visit Us</h3>
                    <p className="text-gray-700 font-medium mb-1">Pune, Maharashtra</p>
                    <p className="text-sm text-gray-500">India</p>
                  </div>
                </div>
              </div>

              {/* Business Info Card */}
              <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl shadow-xl p-8 text-white">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                  <Building2 size={28} className="text-blue-400" />
                  <h3 className="text-xl font-bold">Business Details</h3>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider">Contact Person</p>
                    <p className="text-lg font-semibold">Mr. Aryan</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1 uppercase tracking-wider">GSTIN</p>
                    <p className="text-lg font-semibold">27AABFO9331N1ZC</p>
                  </div>
                </div>
              </div>

              {/* Working Hours */}
              <div className="bg-blue-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex items-center gap-3 mb-4">
                  <Clock size={20} className="text-blue-600" />
                  <h4 className="font-bold text-gray-900">Working Hours</h4>
                </div>
                <div className="space-y-2 text-sm text-gray-700">
                  <p className="flex justify-between">
                    <span>Monday - Saturday:</span>
                    <span className="font-semibold">9:00 AM - 6:00 PM</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-semibold text-red-600">Closed</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form - On Right for Desktop, Top for Mobile */}
            <div className="lg:col-span-2 order-1 lg:order-2">
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <div className="mb-8">
                  <h2 className="text-3xl md:text-4xl font-black mb-3 text-gray-900 flex items-center gap-3">
                    <Send className="text-blue-600" size={36} />
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 text-lg">Fill out the form below and we'll respond within 24 hours</p>
                </div>

                {submitted && (
                  <div className="mb-8 bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-500 rounded-xl p-5 flex items-start gap-4 animate-in slide-in-from-top">
                    <CheckCircle className="text-emerald-600 flex-shrink-0 mt-0.5" size={24} />
                    <div>
                      <p className="font-bold text-emerald-900 text-lg">Success! Message Sent</p>
                      <p className="text-sm text-emerald-700 mt-1">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">1</div>
                      <h3 className="text-xl font-bold text-gray-900">Personal Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-bold mb-2 text-gray-700">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          {...register('name', { required: 'Name is required' })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-600 font-medium">{errors.name.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-bold mb-2 text-gray-700">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          {...register('email', {
                            required: 'Email is required',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'Invalid email address',
                            },
                          })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-600 font-medium">{errors.email.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-bold mb-2 text-gray-700">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        {...register('phone', { required: 'Phone number is required' })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+91 XXXXXXXXXX"
                      />
                      {errors.phone && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.phone.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Business Information Section */}
                  <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">2</div>
                      <h3 className="text-xl font-bold text-gray-900">Business Information</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="company" className="block text-sm font-bold mb-2 text-gray-700">
                          Company Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="company"
                          type="text"
                          {...register('company', { required: 'Company name is required' })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Your Company Ltd."
                        />
                        {errors.company && (
                          <p className="mt-2 text-sm text-red-600 font-medium">{errors.company.message}</p>
                        )}
                      </div>

                      <div>
                        <label htmlFor="industry" className="block text-sm font-bold mb-2 text-gray-700">
                          Industry <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="industry"
                          {...register('industry', { required: 'Please select an industry' })}
                          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                        >
                          <option value="">Select your industry</option>
                          <option value="Manufacturing">Manufacturing</option>
                          <option value="Healthcare">Healthcare</option>
                          <option value="Automotive">Automotive</option>
                          <option value="Food & Beverage">Food & Beverage</option>
                          <option value="Pharmaceuticals">Pharmaceuticals</option>
                          <option value="Construction">Construction</option>
                          <option value="Logistics">Logistics & Transportation</option>
                          <option value="Retail">Retail & E-commerce</option>
                          <option value="Agriculture">Agriculture</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.industry && (
                          <p className="mt-2 text-sm text-red-600 font-medium">{errors.industry.message}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="inquiryType" className="block text-sm font-bold mb-2 text-gray-700">
                        Inquiry Type <span className="text-red-500">*</span>
                      </label>
                      <select
                        id="inquiryType"
                        {...register('inquiryType', { required: 'Please select inquiry type' })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      >
                        <option value="">What can we help you with?</option>
                        <option value="Product Quote">Product Quote Request</option>
                        <option value="Custom Solution">Custom Solution Design</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Partnership">Partnership Opportunity</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      {errors.inquiryType && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.inquiryType.message}</p>
                      )}
                    </div>
                  </div>

                  {/* Project Details Section */}
                  <div className="space-y-6 pt-6">
                    <div className="flex items-center gap-3 pb-3 border-b-2 border-gray-200">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">3</div>
                      <h3 className="text-xl font-bold text-gray-900">Project Details</h3>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-bold mb-2 text-gray-700">
                        Your Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        rows="6"
                        {...register('message', { required: 'Please provide project details' })}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                        placeholder="Tell us about your requirements, timeline, and any specific needs you have..."
                      ></textarea>
                      {errors.message && (
                        <p className="mt-2 text-sm text-red-600 font-medium">{errors.message.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="budget" className="block text-sm font-bold mb-2 text-gray-700">
                        Estimated Budget (Optional)
                      </label>
                      <select
                        id="budget"
                        {...register('budget')}
                        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all bg-white"
                      >
                        <option value="">Select budget range</option>
                        <option value="< ₹50,000">Less than ₹50,000</option>
                        <option value="₹50,000 - ₹1,00,000">₹50,000 - ₹1,00,000</option>
                        <option value="₹1,00,000 - ₹5,00,000">₹1,00,000 - ₹5,00,000</option>
                        <option value="₹5,00,000 - ₹10,00,000">₹5,00,000 - ₹10,00,000</option>
                        <option value="> ₹10,00,000">More than ₹10,00,000</option>
                      </select>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-lg font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                    >
                      {submitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Sending Message...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
