import BarChartExample from "./examples-chart-components/BarChartExample";
import ColumnChartExample from "./examples-chart-components/ColumnChartExample";
import LineChartExample from "./examples-chart-components/LineChartExample";
import AreaChartExample from "./examples-chart-components/AreaChartExample";
import PieChartExample from "./examples-chart-components/PieChartExample";
import IndicatorChartExample from "./examples-chart-components/IndicatorChartExample";
import PolarChartExample from "./examples-chart-components/PolarChartExample";
import FunnelChartExample from "./examples-chart-components/FunnelChartExample";
import ScatterChartExample from "./examples-chart-components/ScatterChartExample";
import Divider from "./components/Divider";

function App() {
  return (
    <>
      <BarChartExample />
      <Divider />
      <ColumnChartExample />
      <Divider />
      <LineChartExample />
      <Divider />

      <AreaChartExample />
      <Divider />

      <PieChartExample />
      <Divider />

      <ScatterChartExample />
      <Divider />

      <PolarChartExample />
      <Divider />

      <FunnelChartExample />
      <Divider />

      <IndicatorChartExample />
    </>
  );
}

export default App;
