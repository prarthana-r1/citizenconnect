export default function Loading() {
    return (
      <div
        className="flex flex-col items-center justify-center h-screen"
        role="status"
        aria-live="polite"
      >
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"></div>
        <p className="mt-4 text-gray-700">Loading, please wait...</p>
      </div>
    );
  }
  