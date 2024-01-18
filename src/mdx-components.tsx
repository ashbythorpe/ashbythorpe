import { Code } from "bright";
import { MDXComponents } from "mdx/types";

// You need this file to use MDX in server components
// Learn more from the Next.js docs

Code.theme = "github-light";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, pre: Code };
}
