import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Title(props: Props) {
  return (
    <h1 className="text-5xl font-optimistic font-bold">{props.children}</h1>
  );
}
