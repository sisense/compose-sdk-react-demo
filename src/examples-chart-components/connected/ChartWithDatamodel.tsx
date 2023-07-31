import { useEffect, useState } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { ButtonGroup } from "../../components/ButtonGroup";
import { Chart } from "@sisense/sdk-ui";
import * as DM from "./sample-ecommerce";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import { measures } from "@sisense/sdk-data";

export default function ConnectedChartExample() {
  const [view, setView] = useState("Preview");

  useEffect(() => {
    Prism.highlightAll();
  }, [view]);
  return (
    <article className="my-8">
      <header className="flex items-baseline">
        <div className="flex flex-col mr-4  flex-1">
          <SubTitle id="model-with-chart">Chart queries and renders data from a Data Model</SubTitle>
        </div>
        <ButtonGroup
          selected={view}
          onChange={setView}
          labels={["Preview", "React"]}
        />
      </header>

      {view === "Preview" && (
        <Chart
          dataSet={DM.DataSource}
          chartType={"line"}
          dataOptions={{
            category: [DM.Commerce.Date.Years],
            value: [measures.sum(DM.Commerce.Revenue, 'Revenue')],
            breakBy: [DM.Commerce.Gender]
          }}
        />
      )}
      {view === "React" && (
        <CodeBlock language="tsx">
          {`import React from "react";
import { Chart } from "@sisense/sdk-ui";
import { measures } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  return (
    <>
      <Chart
        dataSet={DM.DataSource}
        chartType={"line"}
        dataOptions={{
          category: [DM.Commerce.Date.Years],
          value: [measures.sum(DM.Commerce.Revenue, 'Revenue')],
          breakBy: [DM.Commerce.Gender]
        }}
      />
    </>
  );
}`}
        </CodeBlock>
      )}
    </article>
  );
}
