import clsx from "clsx";

export function Project({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  const box_classes = "m-2 rounded-lg w-11/12 h-52 md:h-36 lg:h-36 absolute";

  return (
    <div className="relative w-11/12 h-52 md:h-36 lg:h-36 m-2">
      <div className="relative group">
        <a
          href={href}
          className={clsx(
            box_classes,
            "p-2 bg-black-50 group-hover:bg-black-100 transition-colors z-20",
          )}
        >
          <h1 className="text-2xl md:text-3xl lg:text-3xl font-semibold text-black-900 underline pb-2">
            {title}
          </h1>
          <p>{children}</p>
        </a>
        <div
          className={clsx(
            box_classes,
            "bg-cerise-red-600 transition-transform group-hover:translate-x-1 group-hover:translate-y-1 z-10",
          )}
        ></div>
        <div
          className={clsx(
            box_classes,
            "bg-indigo-600 transition-transform group-hover:translate-x-2 group-hover:translate-y-2 z-0",
          )}
        ></div>
      </div>
    </div>
  );
}
