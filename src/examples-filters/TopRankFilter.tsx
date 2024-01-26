import { useMemo, useState } from 'react';
import { Chart } from '@sisense/sdk-ui';
import CodeHighlight from '../components/CodeHighlight';
import SubTitle from '../components/SubTitle';
import { ButtonGroup } from '../components/ButtonGroup';
import CodeBlock from '../components/CodeBlock';
import * as DM from '../examples-chart-components/connected/sample-ecommerce';
import { filterFactory, measureFactory } from '@sisense/sdk-data';
import Header from '../components/Header';

export default function TopRankFilter() {
  const [view, setView] = useState('Preview');
  const [applyFilter, setApplyFilter] = useState(false);

  const activeFilters = useMemo(
    () =>
      applyFilter
        ? [
            filterFactory.topRanking(
              DM.Category.Category,
              measureFactory.sum(DM.Commerce.Revenue),
              10,
            ),
          ]
        : [],
    [applyFilter],
  );

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="area">
        <Header>
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="area">Top Ranking Filter</SubTitle>
          </div>
          <ButtonGroup selected={view} onChange={setView} labels={['Preview', 'React']} />
        </Header>
        {view === 'Preview' && (
          <div className="grid gap-4">
            <div>
              <input
                type="checkbox"
                checked={applyFilter}
                onChange={() => setApplyFilter(!applyFilter)}
              />
              <span className="p-2">Top 10 Categories by Revenue</span>
            </div>
            <Chart
              dataSet={DM.DataSource}
              chartType={'bar'}
              dataOptions={{
                category: [DM.Category.Category],
                value: [
                  {
                    column: measureFactory.sum(DM.Commerce.Revenue, 'Revenue'),
                    sortType: 'sortDesc',
                  },
                ],
                breakBy: [],
              }}
              filters={activeFilters}
            />
          </div>
        )}

        {view === 'React' && (
          <CodeBlock language="tsx">
            {`import React, { useMemo, useState } from "react";
import { Chart } from "@sisense/sdk-ui";
import { filterFactory, measureFactory } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  const [applyFilter, setApplyFilter] = useState(false);
  const activeFilters = useMemo(() => (applyFilter ? [filterFactory.topRanking(
    DM.Category.Category,
    measureFactory.sum(DM.Commerce.Revenue),
    10,
  )] : []), [applyFilter]);

  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={applyFilter}
          onChange={() => setApplyFilter(!applyFilter)}
        />
        <span className="p-2">Top 10 Categories by Revenue</span>
      </div>
      <Chart
        dataSet={DM.DataSource}
        chartType={"bar"}
        dataOptions={{
          category: [DM.Category.Category],
          value: [{ column: measureFactory.sum(DM.Commerce.Revenue, 'Revenue'),
            sortType: "sortDesc" }],
          breakBy: []
        }}
        filters={activeFilters}
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
