"use client";
import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-50 px-6">
      <div className="max-w-md w-full text-center">
        {/* SVG Illustration */}
        <svg
          className="w-64 h-64 mx-auto mb-8"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="12"
            cy="12"
            r="11"
            stroke="currentColor"
            strokeWidth="2"
            className="text-base-600"
          />
          <path
            d="M8 8L16 16M16 8L8 16"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            className="text-base-600"
          />
        </svg>

        {/* Error Message */}
        <h1 className="text-5xl font-bold mb-4 text-base-800">404</h1>
        <h2 className="text-2xl font-semibold mb-4 text-base-600">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Oops! The page you&apos;re looking for seems to have wandered off into
          the digital wilderness.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 rounded-lg bg-base-600 text-white font-medium transition-all hover:bg-opacity-90 hover:scale-105"
          >
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-lg border-2 border-base-600 text-base-600 font-medium transition-all hover:bg-base-600 hover:text-white hover:scale-105"
          >
            Go Back
          </button>
        </div>

        {/* Additional Help */}
        <div className="mt-12 text-gray-400">
          <p className="text-sm">
            Need help?{" "}
            <Link href="/contact" className="text-base-600 hover:underline">
              Contact Support
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
