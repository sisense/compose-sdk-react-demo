import { LinkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
type Props = {
  id: string;
};

export default function ReferenceLink(props: Props) {
  return (
    <Link
      to={"#" + props.id}
      aria-label="Link for Reference "
      title="Link for Reference "
      className="mdx-header-anchor inline-block ml-2"
    >
      <LinkIcon width={"1rem"} height={"1rem"} />
    </Link>
  );
}
