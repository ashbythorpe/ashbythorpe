export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-gray-700 hover:underline hover:text-gray-600"
      href={href}
    >
      {children}
    </a>
  );
}
