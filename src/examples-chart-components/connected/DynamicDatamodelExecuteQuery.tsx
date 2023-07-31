import { useEffect, useState } from "react";
import Prism from "prismjs";

import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";

import { ButtonGroup } from "../../components/ButtonGroup";
import { cartesianArgs } from "../data";
import { Chart, ExecuteQuery } from "@sisense/sdk-ui";
import {
  Data,
  DimensionalAttribute,
  DimensionalBaseMeasure,
} from "@sisense/sdk-data";
import CodeBlock from "../../components/CodeBlock";
import SubTitle from "../../components/SubTitle";
import Paragraph from "../../components/Paragraph";

export default function DynamicDatamodelExecuteQuery() {
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
          <SubTitle id="dynamic-ExecuteQuery">
            Dynamic Data Model connected to chart using ExecuteQuery
          </SubTitle>
          <Paragraph>
            Connect chart to data model using ExecuteQuery <br />
          </Paragraph>
        </div>
        <ButtonGroup
          selected={view}
          onChange={setView}
          labels={["Preview", "React"]}
        />
      </header>

      {view === "Preview" && (
        <ExecuteQuery
          dataSource={dynamicModel.dataSource}
          dimensions={[dynamicModel.attributes[0]]}
          measures={[dynamicModel.measures[0]]}
          filters={[]}
        >
          {(data: Data) => {
            console.log(data);
            const props = {
              ...cartesianArgs,
              dataSet: data,
              dataOptions: {
                category: [dynamicModel.attributes[0]],
                value: [dynamicModel.measures[0]],
                breakBy: [],
              },
            };
            return <Chart chartType={"column"} {...props} />;
          }}
        </ExecuteQuery>
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
        <ExecuteQuery
          dataSource={dynamicModel.dataSource}
          dimensions={[dynamicModel.attributes[0]]}
          measures={[dynamicModel.measures[0]]}
          filters={[]}
        >
          {(data) => {
            const props = {
              ...cartesianArgs,
              dataSet: data,
              dataOptions: {
                category: [dynamicModel.attributes[0]],
                value: [dynamicModel.measures[0]],
                breakBy: [],
              },
            };
            return <Chart chartType={"line"} {...props} />;
          }}
        </ExecuteQuery>
      )}
    );
}`}
        </CodeBlock>
      )}
    </article>
  );
}
