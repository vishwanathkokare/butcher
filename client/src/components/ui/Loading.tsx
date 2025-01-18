const Loading = () => {
  return (
    <div className="bg-gray-200 dark:bg-zinc-900 flex items-center justify-center h-screen">
      <div
        className="spinner-border animate-spin inline-block w-14 h-14 border-8 rounded-full"
        role="status"
      ></div>
    </div>
  );
};

export default Loading;
