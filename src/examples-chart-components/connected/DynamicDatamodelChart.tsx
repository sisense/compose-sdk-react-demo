import { useEffect, useState } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { ButtonGroup } from "../../components/ButtonGroup";
import { cartesianArgs } from "../data";
import { Chart } from "@sisense/sdk-ui";
import {
  DimensionalAttribute,
  DimensionalBaseMeasure,
} from "@sisense/sdk-data";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import Paragraph from "../../components/Paragraph";

export default function DynamicDatamodelChart() {
  const [view, setView] = useState("Preview");
  const dynamicModel = {
    dataSource: "Sample ECommerce",
    attributes: [
      new DimensionalAttribute("AgeRange", "[Commerce.Age Range]", "attribute"),
    ],
    filters: [],
    highlights: [],
    measures: [
      new DimensionalBaseMeasure(
        "sum Revenue",
        new DimensionalAttribute("Revenue", "[Commerce.Revenue]", "attribute"),
        "sum"
      ),
    ],
  };

  useEffect(() => {
    Prism.highlightAll();
  }, [view]);
  return (
    <article className="my-8">
        <header className="flex items-baseline">
        <div className="flex flex-col mr-4  flex-1">
          <SubTitle id="dyanamic-connected-chart">
            Dynamic Data Model connected to chart
          </SubTitle>
          <Paragraph>Chart that recieves data source and executes query internally  <br /></Paragraph>
        </div>
        <ButtonGroup
          selected={view}
          onChange={setView}
          labels={["Preview", "React"]}
        />
      </header>

      {view === "Preview" && (
        <Chart
          {...cartesianArgs}
          dataSet={dynamicModel.dataSource}
          chartType={"line"}
          dataOptions={{
            category: [dynamicModel.attributes[0]],
            value: [dynamicModel.measures[0]],
            breakBy: [],
          }}
        />
      )}

      {view === "React" && (
        <CodeBlock language="tsx">
          {`import React from "react";
import { Chart, ExecuteQuery } from "@sisense/sdk-ui";
import * as DM from "./sample-ecommerce";
import {
  DimensionalAttribute,
  DimensionalBaseMeasure,
} from "@sisense/sdk-data";

export default function ConnectedChart() {
  const dynamicModel = {
    dataSource: "Sample ECommerce",
    attributes: [
      new DimensionalAttribute("AgeRange", "[Commerce.Age Range]", "attribute"),
    ],
    filters: [],
    highlights: [],
    measures: [
      new DimensionalBaseMeasure(
        "sum Revenue",
        new DimensionalAttribute("Revenue", "[Commerce.Revenue]", "attribute"),
        "sum"
      ),
    ],
  };

  return (
        <Chart
          {...cartesianArgs}
          dataSet={dynamicModel.dataSource}
          chartType={"line"}
          dataOptions={{
            category: [dynamicModel.attributes[0]],
            value: [dynamicModel.measures[0]],
            breakBy: [],
          }}
        />
      )}
    );
}`}
        </CodeBlock>
      )}
    </article>
  );
}
