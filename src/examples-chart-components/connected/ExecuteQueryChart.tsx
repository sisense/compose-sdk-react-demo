import { useState } from "react";

import { ButtonGroup } from "../../components/ButtonGroup";
import { BarChart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "./sample-ecommerce";
import CodeHighlight from "../../components/CodeHighlight";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import Paragraph from "../../components/Paragraph";
import { Data, measures } from "@sisense/sdk-data";

export default function ExecuteQueryChart() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="ExecuteQuery">ExecuteQuery Component</SubTitle>
            <Paragraph>
              ExecuteQuery allows you to run a query and access the results. <br />
              Useful when you want to render multiple charts using same data or
              render the data with your own visualizations.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>

        {view === "Preview" && (
          <ExecuteQuery
            dataSource={DM.DataSource}
            dimensions={[DM.Commerce.Date.Years]}
            measures={[measures.sum(DM.Commerce.Quantity, 'Total Quantity')]}
            filters={[]}
          >
            {(data: Data) => {
              return <BarChart dataSet={data}
                               dataOptions={{
                                 category: [{name: 'Years', type: 'datetime'}],
                                 value: [{name: 'Total Quantity'}],
                                 breakBy: []
                               }}
                      />;
            }}
          </ExecuteQuery>
        )}

        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { BarChart, ExecuteQuery } from "@sisense/sdk-ui";
import { Data, measures } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  return (
    <>
      <ExecuteQuery
        dataSource={DM.DataSource}
        dimensions={[DM.Commerce.Date.Years]}
        measures={[measures.sum(DM.Commerce.Quantity, 'Total Quantity')]}
        filters={[]}
      >
        {(data: Data) => {
          return <BarChart dataSet={data}
                           dataOptions={{
                             category: [{name: 'Years', type: 'datetime'}],
                             value: [{name: 'Total Quantity'}],
                             breakBy: []
                           }}
                  />;
        }}
      </ExecuteQuery>
    </>
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
