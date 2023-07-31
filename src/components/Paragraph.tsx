import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Paragraph(props: Props) {
  return <p className="whitespace-pre-wrap my-4 font-optimistic">{props.children}</p>;
}
