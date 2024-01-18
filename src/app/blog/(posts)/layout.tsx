export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let object = children as object;
  let path;
  if (
    "props" in object &&
    typeof object.props === "object" &&
    object.props &&
    "segmentPath" in object.props
  ) {
    path = object?.props?.segmentPath;
  } else {
    path = null;
  }

  if (path === null) {
    console.log(object);
    console.error("Invalid path: ", path);
    return null;
  } else {
    console.log(object);
    console.log("path: ", path);
  }

  return <div className="prose p-5">{children}</div>;
}
