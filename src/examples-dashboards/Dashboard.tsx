import CodeHighlight from "../components/CodeHighlight";
import SubTitle from "../components/SubTitle";
import { ButtonGroup } from "../components/ButtonGroup";
import CodeBlock from "../components/CodeBlock";
import { cssExample } from "./cssExample";
import { dashboardCodeExample } from "./dashboardCodeExample";

// codeExample
import { useMemo, useState } from "react";
import {
  IndicatorChart,
  NumberFormatConfig,
  ScatterStyleOptions,
  MemberFilterTile,
  IndicatorStyleOptions,
  ChartWidget,
  StackableStyleOptions,
  LineStyleOptions,
} from "@sisense/sdk-ui";
import "./index.css";
import { Filter, filters, measures } from "@sisense/sdk-data";
import * as DM from "../examples-chart-components/connected/sample-ecommerce";

const lineChartStyleOptions: LineStyleOptions = {
  subtype: "line/spline",
  lineWidth: { width: "bold" },
  yAxis: {
    title: { enabled: true, text: "SALES" },
  },
  y2Axis: {
    enabled: true,
    title: { enabled: true, text: "QUANTITY" },
  },
  markers: {
    enabled: true,
    fill: "hollow",
  },
};

const seriesToColorMap = {
  Female: "#00cee6",
  Male: "#9b9bd7",
  Unspecified: "#6eda55",
};

const drilldownOptions = {
  drilldownCategories: [
    DM.Commerce.AgeRange,
    DM.Commerce.Gender,
    DM.Commerce.Condition,
  ],
};

const scatterStyleOptions: ScatterStyleOptions = {
  xAxis: {
    logarithmic: true,
  },
  yAxis: {
    logarithmic: true,
  },
};

const numberFormat: NumberFormatConfig = {
  name: "Numbers",
  decimalScale: 2,
  trillion: true,
  billion: true,
  million: true,
  kilo: true,
  thousandSeparator: true,
  prefix: false,
  symbol: "$",
};

const getIndicatorStyleOptions = (
  title: string,
  secondaryTitle = ""
): IndicatorStyleOptions => {
  return {
    indicatorComponents: {
      title: {
        shouldBeShown: true,
        text: title,
      },
      secondaryTitle: {
        text: secondaryTitle,
      },
      ticks: {
        shouldBeShown: true,
      },
      labels: {
        shouldBeShown: true,
      },
    },
    subtype: "indicator/gauge",
    skin: 1,
  };
};

const barStyleOptions: StackableStyleOptions = {
  subtype: "bar/stacked",
};

export default function Dashboard() {
  const [view, setView] = useState("Preview");
  const [yearFilter, setYearFilter] = useState<Filter | null>(
    filters.members(DM.Commerce.Date.Years, ["2013-01-01T00:00:00"])
  );
  const [countryFilter, setCountryFilter] = useState<Filter | null>(null);

  const activeFilters = useMemo<Filter[]>(() => {
    return [yearFilter, countryFilter].filter((f) => !!f) as Filter[];
  }, [yearFilter, countryFilter]);

  const pieActiveFilters = useMemo<Filter[]>(() => {
    return [
      ...activeFilters,
      filters.members(DM.Commerce.Gender, ["Male", "Female"]),
    ].filter((f) => !!f);
  }, [activeFilters]);

  const barActiveFilters = useMemo<Filter[]>(() => {
    return [
      ...activeFilters,
      filters.topRanking(DM.Category.Category, DM.Measures.SumRevenue, 3),
    ].filter((f) => !!f);
  }, [activeFilters]);

  const scatterActiveFilters = useMemo<Filter[]>(() => {
    return [
      ...activeFilters,
      filters.members(DM.Commerce.Gender, ["Male", "Female"]),
      filters.topRanking(DM.Category.Category, DM.Measures.SumRevenue, 10),
    ].filter((f) => !!f);
  }, [activeFilters]);

  const dashboard = () => {
    return (
        <div className="dashboard-container my-4 p-2  shadow-2xl">
          <div className="i w-[200px] border-2">
            <div className="h-[200px] w-full border-b-2">
              <IndicatorChart
                dataOptions={{
                  value: [
                    {
                      column: DM.Measures.SumRevenue,
                      numberFormatConfig: numberFormat,
                    },
                  ],
                  secondary: [],
                  min: [measures.constant(0)],
                  max: [measures.constant(125000000)],
                }}
                filters={activeFilters}
                styleOptions={getIndicatorStyleOptions("Total Revenue")}
              />
            </div>
            <div className="h-[200px] border-b-2">
              <IndicatorChart
                dataOptions={{
                  value: [DM.Measures.Quantity],
                  secondary: [],
                  min: [measures.constant(0)],
                  max: [measures.constant(250000)],
                }}
                filters={activeFilters}
                styleOptions={getIndicatorStyleOptions("Total Units Sold")}
              />
            </div>
            <div className="h-[200px] border-b-2">
              <IndicatorChart
                dataOptions={{
                  value: [measures.countDistinct(DM.Commerce.VisitID)],
                  secondary: [],
                  min: [measures.constant(0)],
                  max: [measures.constant(100000)],
                }}
                filters={activeFilters}
                styleOptions={getIndicatorStyleOptions("Total Sales")}
              />
            </div>
            <div className="h-[200px]">
              <IndicatorChart
                dataOptions={{
                  value: [measures.countDistinct(DM.Brand.BrandID)],
                  secondary: [],
                  min: [measures.constant(0)],
                  max: [measures.constant(2500)],
                }}
                filters={activeFilters}
                styleOptions={getIndicatorStyleOptions("Total Brands")}
              />
            </div>
          </div>
          <div className="c3 border-2">
            <ChartWidget
              title={"TOP 3 CATEGORIES BY REVENUE AND AGE"}
              chartType={"bar"}
              dataSource={DM.DataSource}
              filters={barActiveFilters}
              dataOptions={{
                category: [DM.Commerce.AgeRange],
                value: [DM.Measures.SumRevenue],
                breakBy: [DM.Category.Category],
              }}
              styleOptions={barStyleOptions}
              drilldownOptions={drilldownOptions}
            />
          </div>
          <div className="c1 border-2">
            <ChartWidget
              title={"GENDER BREAKDOWN"}
              chartType={"pie"}
              dataSource={DM.DataSource}
              filters={pieActiveFilters}
              dataOptions={{
                category: [DM.Commerce.Gender],
                value: [DM.Measures.SumRevenue],
              }}
              styleOptions={scatterStyleOptions}
            />
          </div>

          <div className="c2 border-2">
            <ChartWidget
              title={"AGE RANGE BREAKDOWN"}
              chartType={"pie"}
              dataSource={DM.DataSource}
              filters={pieActiveFilters}
              dataOptions={{
                category: [DM.Commerce.AgeRange],
                value: [DM.Measures.SumRevenue],
              }}
              styleOptions={scatterStyleOptions}
            />
          </div>

          <div className="c5 border-2">
            <ChartWidget
              title={"TOP CATEGORIES BY REVENUE, UNITS SOLD AND GENDER"}
              chartType={"scatter"}
              dataSource={DM.DataSource}
              filters={scatterActiveFilters}
              dataOptions={{
                x: DM.Measures.SumRevenue,
                y: DM.Measures.Quantity,
                breakByPoint: DM.Category.Category,
                breakByColor: DM.Commerce.Gender,
                size: DM.Measures.SumCost,
                seriesToColorMap,
              }}
              styleOptions={scatterStyleOptions}
            />
          </div>
          <div className="c4 border-2">
            <ChartWidget
              title={"REVENUE vs.UNITS SOLD"}
              dataSource={DM.DataSource}
              chartType={"line"}
              filters={activeFilters}
              dataOptions={{
                category: [
                  {
                    column: DM.Commerce.Date.Months,
                    dateFormat: "yy-MM",
                  },
                ],
                value: [
                  DM.Measures.SumRevenue,
                  {
                    column: DM.Measures.Quantity,
                    showOnRightAxis: true,
                    chartType: "column",
                  },
                ],
                breakBy: [],
              }}
              styleOptions={lineChartStyleOptions}
              drilldownOptions={drilldownOptions}
              onDataPointClick={(...args) => {
                console.log("onDataPointClick", ...args);
              }}
            />
          </div>
          <div className="f p-2 border-2">
            <h2 className="text-xl mb-2">Filters</h2>
            <div className="grid grid-cols-1 gap-2">
              <MemberFilterTile
                onChange={setCountryFilter}
                title="Countries"
                filter={countryFilter}
                attribute={DM.Country.Country}
              />
              <MemberFilterTile
                onChange={setYearFilter}
                title="Years"
                filter={yearFilter}
                attribute={DM.Commerce.Date.Years}
              />
            </div>
          </div>
        </div>
    );
  };
  return (
    <CodeHighlight uniqueKey={view}>
      <article className="my-8" id="Render-dashboard-widgets">
        <header className="flex items-baseline">
          <div className="flex flex-col mr-4 flex-1">
            <SubTitle id="Render-dashboard-widgets">
              Create dashboard using code
            </SubTitle>
          </div>
          <ButtonGroup
            selected={view}
            onChange={setView}
            labels={["Preview", "React", "CSS"]}
          />
        </header>
        {view === "CSS" && (
          <CodeBlock language="css">
            {cssExample}
          </CodeBlock>
        )}
        {view === "Preview" && dashboard()}

        {view === "React" && (
          <CodeBlock language="tsx">
            {dashboardCodeExample}
          </CodeBlock>
        )}
      </article>
    </CodeHighlight>
  );
}
