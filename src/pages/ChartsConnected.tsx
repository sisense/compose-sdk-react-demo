import ExecuteQueryChartExample from "../examples-chart-components/connected/ExecuteQueryChart";
import ConnectedChartExample from "../examples-chart-components/connected/ChartWithDatamodel";
import Article from "../components/Article";
import Divider from "../components/Divider";

export default function ChartsConnected() {
  return (
    <Article
      title="Queried Charts"
      description={`The following examples render charts using data queried from a
    data model. The examples cover different ways we can achieve this.`}
    >
      <ExecuteQueryChartExample />
      <Divider />
      <ConnectedChartExample />
      <Divider />
    </Article>
  );
}
