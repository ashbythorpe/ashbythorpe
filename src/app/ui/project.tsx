export function Project({
  title,
  href,
  children,
}: {
  title: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="p-2 m-2 bg-gray-300 hover:bg-gray-400 rounded-lg shadow w-11/12 h-36 md:h-36"
    >
      <h1 className="text-3xl font-mono font-semibold text-gray-900">
        {title}
      </h1>
      <p>{children}</p>
    </a>
  );
}
