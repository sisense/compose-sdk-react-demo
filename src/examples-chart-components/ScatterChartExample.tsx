import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import { ScatterChart } from "@sisense/sdk-ui";
import { exampleData } from "./data";
import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

export default function ScatterChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Scatter">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Scatter">Scatter chart</SubTitle>
            <Paragraph>
              Scatter charts are used to display the relationship between two
              variables. The data is displayed as a collection of points, each
              having the value of one variable determining the position on the
              horizontal axis and the value of the other variable determining
              the position on the vertical axis.
              
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && 
                  <ScatterChart dataSet={exampleData.data}
                    dataOptions={{
                      x: exampleData.units,
                      y: exampleData.quantity,
                      breakByPoint: exampleData.group,
                      breakByColor: exampleData.years,
                      size: exampleData.returns,
                    }}
                  />        
        }
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import { ScatterChart } from "@sisense/sdk-ui";
import { exampleData } from "./exampleData";

export default function App() {
  return (
    <ScatterChart dataSet={exampleData.data}
       dataOptions={{
         x: exampleData.units,
         y: exampleData.quantity,
         breakByPoint: exampleData.group,
         breakByColor: exampleData.years,
         size: exampleData.returns,
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
