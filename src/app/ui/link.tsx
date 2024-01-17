export function Link({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      className="text-gray-900 hover:underline hover:text-gray-700"
      href={href}
    >
      {children}
    </a>
  );
}
