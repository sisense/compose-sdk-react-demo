import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";
import { ButtonGroup } from "../components/ButtonGroup";
import { exampleData } from "./data";
import { ColumnChart, StackableStyleOptions } from "@sisense/sdk-ui";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

const styleOptions = {
  legend: {
    position: "right",
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
} as StackableStyleOptions;

export default function ColumnChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="column">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="column">Column chart</SubTitle>
            <Paragraph>
              A column chart is a type of chart that uses vertical bars to
              represent data values. Similar to a bar chart, the length of each
              column corresponds to the value it represents. In this example all
              axes have been labeled and the legend has been placed on the right
              using chart style options.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" &&           
          <ColumnChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [exampleData.quantity, { column: exampleData.units, showOnRightAxis: true} ],
              breakBy: [],
            }}
            styleOptions={styleOptions}
          />}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { ColumnChart, StackableStyleOptions } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

const styleOptions = {
  legend: {
    position: "right",
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
} as StackableStyleOptions;

export default function App() {
  return (
    <ColumnChart dataSet={exampleData.data}
                 dataOptions={{
                   category: [exampleData.years],
                   value: [exampleData.quantity,
                     { column: exampleData.units, showOnRightAxis: true}],
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
