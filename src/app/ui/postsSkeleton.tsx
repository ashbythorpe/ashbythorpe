export function PostListSkeleton() {
  return (
    <div className="flex flex-col sm:max-sm:h-1/3 w-default w-full md:flex-grow md:items-stretch md:grid md:grid-cols-3">
      {[1, 2, 3].map((x) => (
        <PostCardSkeleton key={x} />
      ))}
    </div>
  );
}

function PostCardSkeleton() {
  const shimmer =
    "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent";

  return (
    <div
      className={`${shimmer} py-2 px-4 h-32 md:h-full m-2 w-11/12 flex flex-col self-auto overflow-hidden relative rounded`}
    >
      <div className="h-8 w-2/3 rounded-xl bg-gray-200 shadow mb-4"></div>
      <div className="h-5 w-full rounded-xl bg-gray-200 shadow my-2"></div>
      <div className="h-5 w-full rounded-xl bg-gray-200 shadow my-2"></div>
      <div className="h-5 w-full rounded-xl bg-gray-200 shadow my-2"></div>
      <div className="float-end mt-auto self-end w-40 h-4 bg-gray-200 rounded-full"></div>
    </div>
  );
}
