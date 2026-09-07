import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

interface RegisterProps {
  onLogin: () => void;
}

const Register: React.FC<RegisterProps> = ({ onLogin }) => {
  const { register } = useAuth();

  const [name, setName] = useState('');
  const [investigatorId, setInvestigatorId] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [department, setDepartment] = useState('');
  const [designation, setDesignation] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    setError('');

    // Password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (mobile.length !== 10) {
      setError('Mobile number must be 10 digits.');
      return;
    }

    setLoading(true);

    try {
      const success = await register(
        {
          name,
          email,
          investigatorId,
          mobile,
          department,
          designation,
        },
        password
      );

      if (!success) {
        setError(
          'Registration failed. Please check your details and try again.'
        );
        return;
      }

      // Registration successful
      onLogin();

    } catch (err) {
      console.error('Registration error:', err);
      setError(
        'Unable to connect to the authentication server.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-setu-bg flex items-center justify-center px-4 py-8">

      <div className="w-full max-w-2xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-setu-text">
            Investigator Portal
          </h1>

          <p className="mt-2 text-setu-text/60">
            Secure Investigation & Intelligence System
          </p>
        </div>

        {/* Registration Card */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8">

          <h2 className="text-2xl font-semibold text-setu-text mb-2">
            Investigator Registration
          </h2>

          <p className="text-sm text-setu-text/60 mb-6">
            Create your authorized investigator account
          </p>

          <form
            onSubmit={handleRegister}
            className="grid md:grid-cols-2 gap-5"
          >

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Investigator ID */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Investigator ID
              </label>

              <input
                type="text"
                value={investigatorId}
                onChange={(e) =>
                  setInvestigatorId(e.target.value)
                }
                placeholder="INV-2026-001"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Official Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="investigator@department.gov"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Mobile Number
              </label>

              <input
                type="tel"
                value={mobile}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, '')
                    .slice(0, 10);

                  setMobile(value);
                }}
                placeholder="Enter mobile number"
                maxLength={10}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Department */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Department / Organization
              </label>

              <input
                type="text"
                value={department}
                onChange={(e) =>
                  setDepartment(e.target.value)
                }
                placeholder="Enter department"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Designation
              </label>

              <input
                type="text"
                value={designation}
                onChange={(e) =>
                  setDesignation(e.target.value)
                }
                placeholder="Investigation Officer"
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                placeholder="Confirm password"
                minLength={6}
                className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent outline-none focus:ring-2 focus:ring-blue-500"
                required
                disabled={loading}
              />
            </div>

            {/* Error */}
            {error && (
              <div className="md:col-span-2">
                <p className="text-sm text-red-500 bg-red-50 dark:bg-red-950/30 px-4 py-3 rounded-lg">
                  {error}
                </p>
              </div>
            )}

            {/* Register Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading
                  ? 'Creating Account...'
                  : 'Create Investigator Account'}
              </button>
            </div>

          </form>

          {/* Login Link */}
          <div className="text-center mt-6 text-sm">
            <span className="text-setu-text/60">
              Already have an account?
            </span>{' '}

            <button
              type="button"
              onClick={onLogin}
              disabled={loading}
              className="text-blue-600 font-semibold hover:underline disabled:opacity-50"
            >
              Login
            </button>
          </div>

        </div>

        {/* Footer */}
        <p className="text-center text-xs text-setu-text/40 mt-6">
          Authorized Investigator Access Only
        </p>

      </div>
    </div>
  );
};

export { Register };
export default Register;