import Link from "next/link";

export default function H2({ children }: { children?: React.ReactNode }) {
  if (!children || typeof (children as string) !== "string") {
    return <h2>{children}</h2>;
  }

  const id = getAnchor(children as string);

  return (
    <h2 id={id} className="group">
      {children}
      <Link
        href={`#${id}`}
        className="pl-2 hidden group-hover:inline text-gray-500"
      >
        #
      </Link>
    </h2>
  );
}

function getAnchor(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9 ]/g, "")
    .replace(/[ ]/g, "-");
}
