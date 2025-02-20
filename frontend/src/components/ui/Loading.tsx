const Loading = () => {
  return (
    <div className="bg-gray-200 dark:bg-zinc-800 flex items-center justify-center h-screen">
      <div
        className="animate-spin inline-block w-14 h-14 border-8 border-t-transparent border-gray-500 rounded-full"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;