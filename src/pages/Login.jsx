import { useState } from 'react';
import logo from '../assets/logo.svg';
import LoginForm from '@components/layouts/LoginForm';
import Register from '@components/layouts/Register'; // Import the new Register component

function Login() {
  const [formType, setFormType] = useState(null); // null = welcome screen, 'login' = login form, 'register' = register form

  return (
    <div className='bg-[#0D0F24] login-bg'>
      <div className="min-h-screen text-white max-w-3/4 mx-auto justify-between flex flex-col">
        {/* Top Bar */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-white/10">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">SIEMENS</h1>
            <span className="text-lg text-white/70">Manufacturing Intelligence Platform</span>
          </div>
          <div className="flex items-center space-x-2 text-white/60 hover:text-white cursor-pointer hidden">
            <span>About</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path
                fillRule="evenodd"
                d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM10.5 9.75A.75.75 0 0112 9h.007a.75.75 0 01.743.648l.007.102V15a.75.75 0 01-1.493.102l-.007-.102V9.75zm.75-3a.75.75 0 100 1.5.75.75 0 000-1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full max-w-7xl px-6 py-12 max-auto">
          {/* Left Side */}
          <div className="md:w-1/2 flex flex-col justify-center space-y-6">
            {formType === 'login' ? (
              <LoginForm onBack={() => setFormType(null)} />
            ) : formType === 'register' ? (
              <Register onBack={() => setFormType(null)} />
            ) : (
              <>
                <h1 className="text-6xl font-light text-white">Welcome!</h1>
                <p className="text-sm max-w-md text-gray-300 font-light">
                  XYZ manufacturing intelligence platform acts as a single source of truth about the
                  manufacturing operation. This enables the XYZ team to monitor the process operation,
                  make necessary corrective actions to achieve the envisaged output, and operate the
                  process optimally and efficiently.
                </p>
                <div className="space-y-4 max-w-1/2">
                  <button
                    onClick={() => setFormType('login')}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2"
                  >
                    <span>LOG IN</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0013.5 3H6.75A2.25 2.25 0 004.5 5.25v13.5A2.25 2.25 0 006.75 21h6.75a2.25 2.25 0 002.25-2.25V15M18 12h-9m0 0l3-3m-3 3l3 3"
                        />
                      </svg>
                    </span>
                  </button>
                  <button
                    onClick={() => setFormType('register')}
                    className="w-full border border-white hover:border-gray-300 px-6 py-3 rounded-full flex items-center justify-center space-x-2"
                  >
                    <span>REGISTER</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.11A12.405 12.405 0 0110.375 21c-2.331 0-4.512-.645-6.375-1.765z"
                      />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Right Side */}
          <div className="md:w-1/2 mt-10 md:mt-0 flex items-center justify-center">
            {/* Add any content for the right side if needed */}
          </div>
        </div>

        <footer className="text-xs text-gray-500 pt-6 pb-6 px-6">
          © DataTheta 2025. All rights reserved. | Reach out to support.xyz@datatheta.com for technical support.
        </footer>
      </div>
    </div>
  );
}

export default Login;