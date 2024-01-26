import { useState } from 'react';

import { ButtonGroup } from '../components/ButtonGroup';
import { CustomDrilldownResult, DrilldownWidget, ExecuteQuery, QueryState } from '@sisense/sdk-ui';
import * as DM from '../examples-chart-components/connected/sample-ecommerce';
import CodeHighlight from '../components/CodeHighlight';
import CodeBlock from '../components/CodeBlock';
import SubTitle from '../components/SubTitle';
import Paragraph from '../components/Paragraph';
import { measureFactory } from '@sisense/sdk-data';
import Header from '../components/Header';
import { PlotlyBarChart } from './PlotlyBarChart';
import { CustomContextMenu } from './CustomContextMenu';
import { CustomDrilldownBreadcrumbs } from './CustomDrilldownBreadcrumbs';

const plotlyBarChart = ({
  drilldownFilters,
  drilldownDimension,
  onDataPointsSelected,
  onContextMenu,
}: CustomDrilldownResult) => (
  <ExecuteQuery
    dataSource={DM.DataSource}
    dimensions={[drilldownDimension]}
    measures={[measureFactory.sum(DM.Commerce.Revenue)]}
    filters={drilldownFilters}
  >
    {({ data }) => {
      if (!data) return <div />;
      return (
        <PlotlyBarChart
          rawData={data}
          onContextMenu={onContextMenu}
          onDataPointsSelected={onDataPointsSelected}
        />
      );
    }}
  </ExecuteQuery>
);

export default function CustomizedDrilldownWidgetExample() {
  const [view, setView] = useState('Preview');

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <Header>
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="CustomizedDrilldownWidget">
              Example of customized DrilldownWidget
            </SubTitle>
            <Paragraph>
              The DrilldownWidget is adaptable and can be used with custom-designed charts. In this
              example, it is a bar chart created using Plotly.js charting library. Additionally, you
              have the flexibility to provide your own components for both the context menu and
              breadcrumbs.
              <br />
              <br />
              Use Plotly.js's box or lasso selection tools available in the toolbar (located on the
              right side upon hovering over the chart area) to select specific data points. Then
              right click to access the context menu. Upon the initial drilldown, breadcrumbs will
              become visible. Take note of the changes in breadcrumbs and the appearance of the
              context menu.
            </Paragraph>
          </div>
          <ButtonGroup selected={view} onChange={setView} labels={['Preview', 'React']} />
        </Header>

        {view === 'Preview' && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '490px',
              justifyContent: 'end',
              backgroundColor: 'white',
            }}
          >
            <DrilldownWidget
              initialDimension={DM.Commerce.AgeRange}
              drilldownDimensions={[DM.Commerce.Gender, DM.Commerce.Condition]}
              config={{
                contextMenuComponent: CustomContextMenu,
                breadcrumbsComponent: CustomDrilldownBreadcrumbs,
              }}
            >
              {plotlyBarChart}
            </DrilldownWidget>
          </div>
        )}

        {view === 'React' && (
          <CodeBlock language="tsx">
            {`
import * as DM from "./sample-ecommerce";
import {
  CustomDrilldownResult,
  DrilldownWidget,
  ExecuteQuery,
} from '@sisense/sdk-ui';

// custom components created by you (not included to Compose SDK)
import { PlotlyBarChart } from './PlotlyBarChart';
import { CustomContextMenu } from './CustomContextMenu';
import { CustomDrilldownBreadcrumbs } from './CustomDrilldownBreadcrumbs';

export default function App() {
  const plotlyBarChart = ({
    drilldownFilters,
    drilldownDimension,
    onDataPointsSelected,
    onContextMenu,
  }: CustomDrilldownResult) => (
    <ExecuteQuery
      dataSource={DM.DataSource}
      dimensions={[drilldownDimension]}
      measures={[measureFactory.sum(DM.Commerce.Revenue)]}
      filters={drilldownFilters}
    >
    {({data}) => {
      if (!data) return <div/>;
      return(
        <PlotlyBarChart
          rawData={data}
          onContextMenu={onContextMenu}
          onDataPointsSelected={onDataPointsSelected}
        />)
      }
    }
    </ExecuteQuery>
  );

  return (
    <DrilldownWidget
      initialDimension={DM.Commerce.AgeRange}
      drilldownDimensions={[DM.Commerce.Gender, DM.Commerce.Condition]}
      config={{
        contextMenuComponent: CustomContextMenu,
        breadcrumbsComponent: CustomDrilldownBreadcrumbs,
      }}
    >
      {plotlyBarChart}
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
