import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { PieChart, PieStyleOptions } from "@sisense/sdk-ui";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import { exampleData } from "./data";
import Paragraph from "../components/Paragraph";

const styleOptions = {
  legend: {
    position: "left",
  }
} as PieStyleOptions;

export default function PieChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Pie">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Pie">Pie chart</SubTitle>
            <Paragraph>
              Pie charts are used to show the proportion of a whole. Each slice
              of pie represents a category of data and the size of the slice
              shows the percentage of that category relative to the whole.
              
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && 
          <PieChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [exampleData.units],
            }}
            styleOptions={styleOptions}
         />}

        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { PieChart, PieStyleOptions } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

const styleOptions = {
  legend: {
    position: "left",
  }
} as PieStyleOptions;

export default function App() {
  return (
    <PieChart dataSet={exampleData.data}
      dataOptions={{
        category: [exampleData.years],
        value: [exampleData.units],
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
