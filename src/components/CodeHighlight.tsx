import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

type Props = {
  uniqueKey: string;
  children: React.ReactNode;
};

export default function CodeHighlight(props: Props) {
  useEffect(() => {
    Prism.highlightAll();
  }, [props.uniqueKey]);

  return props.children;
}
