import React from "react";
import { Link } from "react-router-dom";

type Props = {
  href: string;
  text: string;
  icon: React.ReactNode;
};

export default function NavigationItem(props: Props) {
  return (
    <li className="w-full  mb-2  text-gray-100 flex flex-row  border-gray-300 hover:text-white   hover:bg-black  hover:font-bold ">
      <Link to={props.href} className="flex px-4 py-4 block w-full h-full">
        <span className="text-white">{props.icon}</span>
        <span className="ml-2 text-white">{props.text}</span>
      </Link>
    </li>
  );
}
