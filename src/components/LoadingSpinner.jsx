import React from 'react'

const LoadingSpinner = () => {
    return (
      <div className="flex justify-center items-center min-h-screen bg-base-200">
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-6">
            <div className="absolute inset-0 border-8 border-base-300 rounded-full"></div>
            <div className="absolute inset-0 border-8 border-pink-500 rounded-full border-t-transparent animate-spin"></div>
            <div
              className="absolute inset-4 border-8 border-purple-500 rounded-full border-b-transparent animate-spin animation-delay-150"
              style={{ animationDirection: "reverse" }}
            ></div>
          </div>
          <p className="text-base-content text-lg font-semibold animate-pulse">
            Loading..
          </p>
        </div>
      </div>
    );
}

export default LoadingSpinner
