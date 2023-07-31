import React from "react";
import ReferenceLink from "./ReferenceLink";

type Props = {
  children: React.ReactNode;
  id: string;
};

export default function SubTitle(props: Props) {
  return (
    <div className="flex items-center">
      <h2 id={props.id} className="text-3xl font-optimistic font-bold ">{props.children}
        <ReferenceLink id={props.id} />
      </h2>
    </div>
  );
}


SubTitle.defaultProps = {
  id: "",
}
