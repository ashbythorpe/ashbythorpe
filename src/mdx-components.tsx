import { Code } from "bright";
import { MDXComponents } from "mdx/types";
import CodeTheme from "./github-light-modified.json";
import { sourceCodePro } from "@/app/ui/fonts";

// You need this file to use MDX in server components
// Learn more from the Next.js docs

Code.theme = CodeTheme;
Code.codeClassName = sourceCodePro.className;
Code.titleClassName = sourceCodePro.className;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { ...components, pre: Code };
}
