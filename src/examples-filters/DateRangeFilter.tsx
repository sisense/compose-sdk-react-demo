import { useState } from 'react';
import { Chart, DateRangeFilterTile } from '@sisense/sdk-ui';
import CodeHighlight from '../components/CodeHighlight';
import SubTitle from '../components/SubTitle';
import { ButtonGroup } from '../components/ButtonGroup';
import CodeBlock from '../components/CodeBlock';
import * as DM from '../examples-chart-components/connected/sample-ecommerce';
import { filterFactory, measureFactory } from '@sisense/sdk-data';
import Header from '../components/Header';

export default function DateRangeFilter() {
  const [view, setView] = useState('Preview');
  const [dateRangeFilter, setDateRangeFilter] = useState(
    filterFactory.dateRange(DM.Commerce.Date.Days),
  );

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="area">
        <Header>
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="area">Date Range Filter</SubTitle>
          </div>
          <ButtonGroup selected={view} onChange={setView} labels={['Preview', 'React']} />
        </Header>
        {view === 'Preview' && (
          <div className="grid gap-4">
            <DateRangeFilterTile
              title="Date Range"
              attribute={DM.Commerce.Date.Days}
              filter={dateRangeFilter}
              onChange={(filter) => {
                setDateRangeFilter(filter);
              }}
            />
            <Chart
              dataSet={DM.DataSource}
              chartType={'line'}
              dataOptions={{
                category: [DM.Commerce.Date.Months],
                value: [measureFactory.sum(DM.Commerce.Revenue, 'Revenue')],
                breakBy: [DM.Commerce.Gender],
              }}
              filters={[dateRangeFilter]}
            />
          </div>
        )}

        {view === 'React' && (
          <CodeBlock language="tsx">
            {`import React, { useState } from "react";
import { Chart, DateRangeFilterTile } from "@sisense/sdk-ui";
import { filterFactory, measureFactory } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  const [dateRangeFilter, setDateRangeFilter] = useState(
    filterFactory.dateRange(DM.Commerce.Date.Days)
  );
  return (
    <>
      <DateRangeFilterTile
        title="Date Range"
        dataSource={DM.DataSource}
        attribute={DM.Commerce.Date.Days}
        filter={dateRangeFilter}
        onChange={(filter) => {
          setDateRangeFilter(filter);
        }}
      />
      <Chart
        dataSet={DM.DataSource}
        chartType={"line"}
        dataOptions={{
          category: [DM.Commerce.Date.Months],
          value: [measureFactory.sum(DM.Commerce.Revenue, 'Revenue')],
          breakBy: [DM.Commerce.Gender]
        }}
        filters={[dateRangeFilter]}
      />
    </>
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
