export const JobLoader = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-4 pb-12 animate-pulse">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="bg-base-200/50 border border-base-300 p-6 rounded-sm h-48">
          <div className="h-6 bg-base-300 w-1/3 mb-4 rounded"></div>
          <div className="h-4 bg-base-300 w-1/2 mb-2 rounded"></div>
          <div className="h-4 bg-base-300 w-1/4 rounded"></div>
        </div>
      ))}
    </div>
  );
};
