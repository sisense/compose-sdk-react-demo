import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { AreaChart, AreaStyleOptions } from "@sisense/sdk-ui";
import { exampleData } from "./data";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

const styleOptions = {
  subtype: 'area/stacked',
  legend: {
    position: "top",
  },
  xAxis: {
    title: {
      enabled: true,
      text: "Year",
    },
  },
  yAxis: {
    title: {
      enabled: true,
      text: "Quantity",
    },
  },
  y2Axis: {
    title: {
      enabled: true,
      text: "Units",
    },
    enabled: true,
  },
} as AreaStyleOptions;

export default function AreaChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="area">
      <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="area">Area chart</SubTitle>
            <Paragraph>
              An area chart is a line chart with the area between the line and
              the x-axis filled with color. It is used to represent accumulated
              totals using numbers or percentages over time. This example specifies
              a color for each measure and uses the subtype style option to stack
              the two areas.
            </Paragraph>
          </div>
            <ButtonGroup
              selected={view}
              onChange={setView}
              labels={["Preview", "React"]}
            />
        </header>
        {view === "Preview" && (
          <AreaChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [{...exampleData.quantity, color: 'lightsteelblue'},
                {...exampleData.units, color: 'lightslategray'}],  
              breakBy: [],
            }}
            styleOptions={styleOptions}
          />
        )}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { AreaChart, AreaStyleOptions } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

const styleOptions = {
  subtype: 'area/stacked',
  legend: {
    position: "top",
  },
  xAxis: {
    title: {
      enabled: true,
      text: "Year",
    },
  },
  yAxis: {
    title: {
      enabled: true,
      text: "Quantity",
    },
  },
  y2Axis: {
    title: {
      enabled: true,
      text: "Units",
    },
    enabled: true,
  },
} as AreaStyleOptions;

export default function App() {
  return (
    <AreaChart dataSet={exampleData.data}
                 dataOptions={{
                   category: [exampleData.years],
                   value: [{...exampleData.quantity, color: 'lightsteelblue'},
                     {...exampleData.units, color: 'lightslategray'}],
                   breakBy: [],
                 }}
                 styleOptions={styleOptions}
    />
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
