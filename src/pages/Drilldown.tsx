import CustomizedDrilldownWidgetExample from '../examples-drilldown/CustomizedDrilldownWidgetExample';
import Article from '../components/Article';
import DrilldownWidgetExample from '../examples-drilldown/DrilldownWidgetExample';

export default function Drilldown() {
  return (
    <>
      <Article
        title="Drilldown capabilities"
        description={`Drilldowns serve as a powerful tool to dig deeper into data, offering immediate insights into the composition of aggregated information. The examples below showcase incorporating drilldown capabilities into your charts using default UI elements or crafting entirely custom components.`}
      >
        <DrilldownWidgetExample />
        <CustomizedDrilldownWidgetExample />
      </Article>
    </>
  );
}
