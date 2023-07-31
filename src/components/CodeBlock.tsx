import "prismjs/themes/prism.css";

type Props = {
  children: React.ReactNode;
  language: "tsx" | "bash" | "css"; // add more as needed
  showLineNumber?: boolean;
};

export default function CodeBlock(props: Props) {
  return (
    <div className="rounded mt-4 shadow-lg my-4 bg-[#f5f2f0]">
      <pre className={props.showLineNumber ? "line-numbers" : ""}>
        <code className={`language-${props.language}`}>{props.children}</code>
      </pre>
    </div>
  );
}

CodeBlock.defaultProps = {
  showLineNumber: true,
};
