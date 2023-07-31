import { useMemo, useState } from "react";
import {
  Chart, MemberFilterTile,
} from "@sisense/sdk-ui";
import CodeHighlight from "../components/CodeHighlight";
import SubTitle from "../components/SubTitle";
import { ButtonGroup } from "../components/ButtonGroup";
import CodeBlock from "../components/CodeBlock";
import * as DM from "../examples-chart-components/connected/sample-ecommerce";
import { Filter, measures } from "@sisense/sdk-data";

export default function DateRangeFilter() {
  const [view, setView] = useState("Preview");
  const [categoryFilter, setCategoryFilter] = useState<Filter | null>(null);
  const filters = useMemo(() => categoryFilter ? [categoryFilter] : [], [categoryFilter]);
  
  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="area">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="area">Member Filter</SubTitle>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && (
          <div className="grid gap-4">
          <MemberFilterTile
            title={'Category'}
            attribute={DM.Category.Category}
            filter={categoryFilter}
            onChange={setCategoryFilter}
          />
            <Chart
              dataSet={DM.DataSource}
              chartType={"line"}
              dataOptions={{
                category: [DM.Category.Category],
                value: [measures.sum(DM.Commerce.Revenue, 'Revenue')],
                breakBy: []
              }}
              filters={filters}
            />
          </div>
        )}

        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React, { useMemo, useState } from "react";
import { Chart, MemberFilterTile } from "@sisense/sdk-ui";
import { Filter, measures } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  const [categoryFilter, setCategoryFilter] = useState<Filter | null>(null);
  const filters = useMemo(() => categoryFilter ? [categoryFilter] : [], 
    [categoryFilter]);
  
  return (
    <>
      <MemberFilterTile
        title={'Category'}
        attribute={DM.Category.Category}
        filter={categoryFilter}
        onChange={setCategoryFilter}
      />
      <Chart
        dataSet={DM.DataSource}
        chartType={"line"}
        dataOptions={{
          category: [DM.Category.Category],
          value: [measures.sum(DM.Commerce.Revenue, 'Revenue')],
          breakBy: []
        }}
        filters={filters}
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
