import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { PolarChart } from "@sisense/sdk-ui";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";
import { exampleData } from "./data";

export default function PolarChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Polar">
      <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Polar">Polar chart</SubTitle>
            <Paragraph>
              Polar charts are used to show the proportion of a whole. Each slice
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
          <PolarChart dataSet={exampleData.data}
            dataOptions={{
              category: [exampleData.years],
              value: [exampleData.quantity, exampleData.units],
              breakBy: [],
            }}
          />}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { PolarChart } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

export default function App() {
  return (
    <PolarChart dataSet={exampleData.data}
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
