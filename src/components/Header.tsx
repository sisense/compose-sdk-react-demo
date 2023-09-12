import React from "react";

type Props = {
    children: React.ReactNode;
};

export default function Header(props:Props) {
  return <header className="flex flex-col md:flex-row items-baseline my-4">{props.children}</header>;
}
