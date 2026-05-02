export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl overflow-hidden shadow bg-white">
      <div className="h-52 bg-gray-300" />

      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded w-2/3" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-5 bg-gray-300 rounded w-1/3" />
      </div>
    </div>
  );
}