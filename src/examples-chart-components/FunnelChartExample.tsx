import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { FunnelChart } from "@sisense/sdk-ui";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

const dataSet = {
  columns: [
    { name: "Stage", type: "string" },
    { name: "Unique Users", type: "number" },
  ],
  rows: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
};

export default function FunnelChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="funnel">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="funnel">Funnel chart</SubTitle>
            <Paragraph>
              Funnel charts are used to visualize a progressive reduction of
              data as it passes from one phase to another. The chart is
              organized into segments that represent stages in a process.
              
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && 
          <FunnelChart dataSet={dataSet}
                       dataOptions={{
                         category: [{
                           name: "Stage",
                           type: "string",
                       }],
                         value: [{ 
                           name: "Unique Users",
                           aggregation: "sum",
                         }],
                       }}
          />}
        {/* <BarChart {...cartesianArgs} /> */}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { FunnelChart } from "@sisense/sdk-ui";

const dataSet = {
  columns: [
    { name: "Stage", type: "string" },
    { name: "Unique Users", type: "number" },
  ],
  rows: [
    ["Website visits", 15654],
    ["Downloads", 4064],
    ["Requested price list", 1987],
    ["Invoice sent", 976],
    ["Finalized", 846],
  ],
};

export default function App() {
  return (
    <FunnelChart dataSet={dataSet}
                 dataOptions={{
                  category: [{
                    name: "Stage",
                    type: "string",
                  }],
                  value: [{
                    name: "Unique Users",
                    aggregation: "sum",
                  }],
                }}
    />
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
