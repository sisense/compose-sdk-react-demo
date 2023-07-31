import Article from "../components/Article";
import Divider from "../components/Divider";
import DateRangeFilter from "../examples-filters/DateRangeFilter";
import MemberFilter from "../examples-filters/MemberFilter";
import TopRankFilter from "../examples-filters/TopRankFilter";


export default function Filters() {
  return (
    <Article title="Filters" description={""}>
      <DateRangeFilter />
      <Divider />
      <MemberFilter />
      <Divider />
      <TopRankFilter />
    </Article>
  );
}
