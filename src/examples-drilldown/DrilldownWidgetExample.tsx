import { useState } from 'react';

import { ButtonGroup } from '../components/ButtonGroup';
import { Chart, CustomDrilldownResult, DataPoint, DrilldownWidget } from '@sisense/sdk-ui';
import * as DM from '../examples-chart-components/connected/sample-ecommerce';
import CodeHighlight from '../components/CodeHighlight';
import CodeBlock from '../components/CodeBlock';
import SubTitle from '../components/SubTitle';
import Paragraph from '../components/Paragraph';
import { measureFactory } from '@sisense/sdk-data';
import Header from '../components/Header';

const sisenseColumnChart = ({
  drilldownFilters,
  drilldownDimension,
  onDataPointsSelected,
  onContextMenu,
}: CustomDrilldownResult) => {
  const onPointsSelected = (points: DataPoint[], nativeEvent: MouseEvent) => {
    onDataPointsSelected(points, nativeEvent);
    onContextMenu({
      left: nativeEvent.clientX,
      top: nativeEvent.clientY,
    });
  };

  return (
    <Chart
      chartType="column"
      dataSet={DM.DataSource}
      styleOptions={{
        width: 700,
        height: 450,
      }}
      dataOptions={{
        category: [drilldownDimension],
        value: [measureFactory.sum(DM.Commerce.Revenue)],
      }}
      filters={drilldownFilters}
      onDataPointsSelected={onPointsSelected}
    />
  );
};

export default function DrilldownWidgetExample() {
  const [view, setView] = useState('Preview');

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <Header>
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="DrilldownWidget">Example of using DrilldownWidget</SubTitle>
            <Paragraph>
              DrilldownWidget allows adding drilldown capabilities to a chart <br />
              <br />
              Use the rubber-band selection to choose multiple bars and access drill-down options
              from the context menu. Select the dimensions you wish to explore within your data. You
              can repeat this operation multiple times. Breadcrumbs will appear after the initial
              drill-down, enabling navigation back to the previous level or restoration of the
              chart's initial state (x).
            </Paragraph>
          </div>
          <ButtonGroup selected={view} onChange={setView} labels={['Preview', 'React']} />
        </Header>

        {view === 'Preview' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
              }}
            >
              <DrilldownWidget
                initialDimension={DM.Commerce.AgeRange}
                drilldownDimensions={[DM.Commerce.Gender, DM.Commerce.Condition]}
              >
                {sisenseColumnChart}
              </DrilldownWidget>
            </div>
          </div>
        )}

        {view === 'React' && (
          <CodeBlock language="tsx">
            {`
import * as DM from "./sample-ecommerce";
import {
  Chart,
  CustomDrilldownResult,
  DataPoint,
  DrilldownWidget,
} from '@sisense/sdk-ui';
import { measureFactory } from '@sisense/sdk-data';

export default function App() {
  const sisenseColumnChart = ({
    drilldownFilters,
    drilldownDimension,
    onDataPointsSelected,
    onContextMenu,
  }: CustomDrilldownResult) => {
    // emulate right click on rubber-band selection release
    const onPointsSelected = (points: DataPoint[], nativeEvent: MouseEvent) => {
      onDataPointsSelected(points, nativeEvent);
      onContextMenu({
        left: nativeEvent.clientX,
        top: nativeEvent.clientY,
      });
    };

    return (
      <Chart
        chartType="column"
        dataSet={DM.DataSource}
        dataOptions={{
          category: [drilldownDimension],
          value: [measureFactory.sum(DM.Commerce.Revenue)],
        }}
        filters={drilldownFilters}
        onDataPointsSelected={onPointsSelected}
      />
    );
  };

  return (
    <DrilldownWidget
      initialDimension={DM.Commerce.AgeRange}
      drilldownDimensions={[
        DM.Commerce.Gender,
        DM.Commerce.Condition,
      ]}
    >
      {sisenseColumnChart}
    </DrilldownWidget>
  );
}
`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
