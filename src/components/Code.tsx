import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface codeProps {
  children: string;
  language: string;
}

export default function Code(p: codeProps) {
  return (
    <SyntaxHighlighter language={p.language} style={docco}>
      {p.children}
    </SyntaxHighlighter>
  );
}
