import { useState } from "react";
import { ButtonGroup } from "../components/ButtonGroup";
import CodeHighlight from "../components/CodeHighlight";

import { BarChart } from "@sisense/sdk-ui";
import { exampleData } from "./data";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

export default function BarChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="bar">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="bar">Bar chart</SubTitle>
            <Paragraph>
              A bar chart is a type of chart that uses rectangular bars to
              represent data values. The length or height of each bar
              corresponds to the value it represents, making it an effective
              visualization for comparing quantities across different categories
              or groups.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && (
          <BarChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [exampleData.quantity, exampleData.units],
              breakBy: [],
            }}
          />
        )}
        {/* <BarChart {...cartesianArgs} /> */}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { BarChart } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

export default function App() {
  return (
    <BarChart dataSet={exampleData.data}
              dataOptions={{
                category: [exampleData.years],
                value: [exampleData.quantity, exampleData.units],
                breakBy: [],
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
