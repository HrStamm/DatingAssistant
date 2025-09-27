export default function Loading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 text-gray-800 dark:text-white">
      <div className="text-center">
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute top-0 left-0 w-full h-full rounded-full border-4 border-t-transparent animate-spin" 
            style={{ 
              borderColor: 'rgba(139, 92, 246, 0.2)',
              borderTopColor: 'rgba(139, 92, 246, 0.8)',
            }}>
          </div>
        </div>
        <h2 className="text-xl font-medium text-gray-700 dark:text-gray-200">
          Loading About Page...
        </h2>
      </div>
    </main>
  );
}
