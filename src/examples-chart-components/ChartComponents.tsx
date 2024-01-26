import BarChartExample from './BarChartExample';
import ColumnChartExample from './ColumnChartExample';
import LineChartExample from './LineChartExample';
import AreaChartExample from './AreaChartExample';
import PieChartExample from './PieChartExample';
import IndicatorChartExample from './IndicatorChartExample';
import PolarChartExample from './PolarChartExample';
import FunnelChartExample from './FunnelChartExample';
import ScatterChartExample from './ScatterChartExample';
import Divider from '../components/Divider';

function ChartComponents() {
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

export default ChartComponents;
