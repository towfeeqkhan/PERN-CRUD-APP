function SkeletonLoader() {
  return (
    <div className="space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-3 p-4">
          <div className="skeleton h-5 w-5 shrink-0 rounded-full" />
          <div className="skeleton h-4 flex-1" />
          <div className="skeleton h-8 w-8 shrink-0 rounded-lg" />
          <div className="skeleton h-8 w-8 shrink-0 rounded-lg" />
        </div>
      ))}
    </div>
  );
}

export default SkeletonLoader;
