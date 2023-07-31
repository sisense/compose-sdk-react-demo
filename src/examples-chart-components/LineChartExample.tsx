import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { exampleData } from "./data";
import { LineChart, LineStyleOptions } from "@sisense/sdk-ui";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

const styleOptions = {
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
} as LineStyleOptions;

export default function LineChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Line">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Line">Line chart</SubTitle>
            <Paragraph>
              A line chart is a type of chart that displays information as a
              series of data points connected by straight line segments. It is
              similar to a scatter plot except that the measurement points are
              ordered (typically by their x-axis value) and joined with straight
              line segments. A line chart is often used to visualize a trend
              over a period of time, a relationship between two variables, or to
              show the correlation between two variables.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && (
          <LineChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [exampleData.quantity, 
                { column: exampleData.units, showOnRightAxis: true }],
              breakBy: [],
            }}
            styleOptions={styleOptions}
          />
        )}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { LineChart, LineStyleOptions } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

const styleOptions = {
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
} as LineStyleOptions;

export default function App() {
  return (
    <LineChart dataSet={exampleData.data}
                 dataOptions={{
                   category: [exampleData.years],
                   value: [exampleData.quantity,
                     { column: exampleData.units, showOnRightAxis: true }],
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
