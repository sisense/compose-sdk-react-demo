import { useState } from "react";
import CodeHighlight from "../components/CodeHighlight";

import { ButtonGroup } from "../components/ButtonGroup";
import {
  GaugeIndicatorStyleOptions,
  IndicatorChart,
  IndicatorDataOptions,
  NumericBarIndicatorStyleOptions,
  NumericSimpleIndicatorStyleOptions,
  IndicatorComponents,
} from "@sisense/sdk-ui";
import { Data } from "@sisense/sdk-data";

import CodeBlock from "../components/CodeBlock";
import SubTitle from "../components/SubTitle";
import Paragraph from "../components/Paragraph";

const indicatorData: Data = {
  columns: [
    {
      name: "Total Cost",
      type: "number",
    },
    {
      name: "Total Revenue",
      type: "number",
    },
    {
      name: "min",
      type: "number",
    },
    {
      name: "max",
      type: "number",
    },
  ],
  rows: [[107.27, 38.76, 0, 255]],
};

const indicatorDataOptions: IndicatorDataOptions = {
  value: [
    {
      name: "Total Cost",
      aggregation: "sum",
    },
  ],
  secondary: [
    {
      name: "Total Revenue",
      aggregation: "sum",
    },
  ],
  min: [{ name: "min" }],
  max: [{ name: "max" }],
};

const indicatorComponents: IndicatorComponents =  {
  title: {
    shouldBeShown: true,
    text: "Total Cost",
  },
  secondaryTitle: {
    text: "Total Revenue",
  },
  ticks: {
    shouldBeShown: true,
  },
  labels: {
    shouldBeShown: true,
  },
};

const numericSimpleIndicatorStyleOptions: NumericSimpleIndicatorStyleOptions = {
  subtype: "indicator/numeric",
  skin: "horizontal",
  numericSubtype: "numericSimple",
  indicatorComponents,
};

const numericBarIndicatorStyleOptions: NumericBarIndicatorStyleOptions = {
  subtype: "indicator/numeric",
  numericSubtype: "numericBar",
  indicatorComponents
};

const gaugeIndicatorStyleOptions: GaugeIndicatorStyleOptions = {
  subtype: "indicator/gauge",
  skin: 1,
  indicatorComponents
};

export default function IndicatorChartExample() {
  const [view, setView] = useState("Preview");

  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Indicator">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Indicator">Indicator chart</SubTitle>
            <Paragraph>
              The Indicator chart is a simple chart that displays a single value
              and a secondary value. It can be used to display a KPI or a
              comparison between two values.

              In order for the Indicator chart to render properly, the parent should contain height.
            </Paragraph>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React"]}
          />
        </header>
        {view === "Preview" && (
          <div>
            <div className="h-[250px]">
              <IndicatorChart dataSet={indicatorData}
                              dataOptions={indicatorDataOptions}
                              styleOptions={numericSimpleIndicatorStyleOptions} />
            </div>
            <div className="h-[250px]">
              <IndicatorChart dataSet={indicatorData}
                              dataOptions={indicatorDataOptions}
                              styleOptions={numericBarIndicatorStyleOptions} />
            </div>
            <div className="h-[350px]">
              <IndicatorChart dataSet={indicatorData}
                              dataOptions={indicatorDataOptions}
                              styleOptions={gaugeIndicatorStyleOptions} />
            </div>
          </div>
        )}
        {view === "React" && (
          <CodeBlock language="tsx">
            {`import React from "react";
import {
  GaugeIndicatorStyleOptions,
  IndicatorChart,
  IndicatorDataOptions,
  NumericBarIndicatorStyleOptions,
  NumericSimpleIndicatorStyleOptions,
  IndicatorComponents,
} from "@sisense/sdk-ui";
import { Data } from "@sisense/sdk-data";

const indicatorData: Data = {
  columns: [
    {
      name: "Total Cost",
      type: "number",
    },
    {
      name: "Total Revenue",
      type: "number",
    },
    {
      name: "min",
      type: "number",
    },
    {
      name: "max",
      type: "number",
    },
  ],
  rows: [[107.27, 38.76, 0, 255]],
};

const indicatorDataOptions: IndicatorDataOptions = {
  value: [
    {
      name: "Total Cost",
      aggregation: "sum",
    },
  ],
  secondary: [
    {
      name: "Total Revenue",
      aggregation: "sum",
    },
  ],
  min: [{ name: "min" }],
  max: [{ name: "max" }],
};

const indicatorComponents: IndicatorComponents =  {
  title: {
    shouldBeShown: true,
    text: "Total Cost",
  },
  secondaryTitle: {
    text: "Total Revenue",
  },
  ticks: {
    shouldBeShown: true,
  },
  labels: {
    shouldBeShown: true,
  },
};

const numericSimpleIndicatorStyleOptions: NumericSimpleIndicatorStyleOptions = {
  subtype: "indicator/numeric",
  skin: "horizontal",
  numericSubtype: "numericSimple",
  indicatorComponents,
};

const numericBarIndicatorStyleOptions: NumericBarIndicatorStyleOptions = {
  subtype: "indicator/numeric",
  numericSubtype: "numericBar",
  indicatorComponents
};

const gaugeIndicatorStyleOptions: GaugeIndicatorStyleOptions = {
  subtype: "indicator/gauge",
  skin: 1,
  indicatorComponents
};

export default function App() {
  return (
    <div>
      {/* indicator parent defines height */}
      <div style={{ height: '250px' }}>
        <IndicatorChart dataSet={indicatorData}
                        dataOptions={indicatorDataOptions}
                        styleOptions={numericSimpleIndicatorStyleOptions}
        />
      </div>
      <div style={{ height: '250px' }}>
        <IndicatorChart dataSet={indicatorData}
                        dataOptions={indicatorDataOptions}
                        styleOptions={numericBarIndicatorStyleOptions}
        />
      </div>
      <div style={{ height: '250px' }}>
        <IndicatorChart dataSet={indicatorData}
                        dataOptions={indicatorDataOptions}
                        styleOptions={gaugeIndicatorStyleOptions}
        />
      </div>
  </div>  
  );
}`}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
