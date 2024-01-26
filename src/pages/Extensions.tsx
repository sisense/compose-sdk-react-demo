import Article from '../components/Article';
import Divider from '../components/Divider';
import ThirdPartyHistogram from '../examples-chart-components/connected/ThirdPartyHistogram';
import CodeBlock from '../components/CodeBlock';
import { useState } from 'react';
import { ButtonGroup } from '../components/ButtonGroup';
import CodeHighlight from '../components/CodeHighlight';
import SubTitle from '../components/SubTitle';

export default function ChartsConnected() {
  const [viewCode, setViewCode] = useState('Histogram');

  return (
    <Article
      title="Third Party Add Ons"
      description={`The following examples show how partners can create Compose SDK component libraries.`}
    >
      <CodeHighlight uniqueKey={viewCode}>
        <div className="flex flex-col mr-4  flex-1">
          <SubTitle id="model-with-chart">
            Third party Compose SDK component libraries can be created and published on npm
          </SubTitle>
        </div>
        <CodeBlock language="bash" showLineNumber={false}>
          yarn add more-compose-sdk-charts
        </CodeBlock>
        <ThirdPartyHistogram />
        <Divider />
        <ButtonGroup
          selected={viewCode}
          onChange={setViewCode}
          labels={[
            'Histogram',
            'useBuildQueryMinMax',
            'useBuildQuery',
            'useProcessResults',
            'HistogramChart',
          ]}
        />

        {viewCode === 'Histogram' && (
          <CodeBlock language="tsx">
            {`import { useMemo } from "react";
import type { Attribute, DataSource, Filter } from "@sisense/sdk-data";
import type {
  BaseAxisStyleOptions,
  BaseStyleOptions,
  ValueToColorMap,
} from "@sisense/sdk-ui";
import { useExecuteQuery } from "@sisense/sdk-ui";
import { useBuildQuery } from "./histogram/useBuildQuery";
import { FREQUENCY, useProcessResults } from "./histogram/useProcessResults";
import { HistogramChart } from "./HistogramChart";
import { useBuildMinMaxQuery } from "./histogram/useBuildMinMaxQuery";

export interface HistogramStyleOptions
  extends BaseStyleOptions,
    BaseAxisStyleOptions {
  binCount?: number | "auto";
  barBorder?: boolean;
  binSizePrecision?: number;
  subtype?: "stacked" | "overlay";
}

export interface HistogramDataOptions {
  value: Attribute;
  category: Attribute[];
  seriesToColorMap?: ValueToColorMap;
}

export type HistogramProps = {
  dataSource?: DataSource;
  dataOptions: HistogramDataOptions;
  filters?: Filter[];
  styleOptions?: HistogramStyleOptions;
};

export const Histogram = ({
  dataOptions,
  filters,
  styleOptions,
}: HistogramProps) => {

  // Widget plug-in buildQuery: get min max count per category
  const minMaxQueryProps = useBuildMinMaxQuery({ dataOptions, filterFactory })

  const {
    data: minMaxData,
    isLoading: isMinMaxLoading,
    error: isMinMaxError,
  } = useExecuteQuery(minMaxQueryProps);

  // Widget plug-in buildQuery: get bin frequrency data per bin and cateogry
  const frequencyDataQueryProps = useBuildQuery({
    minMaxData,
    dataOptions,
    filters,
    styleOptions,
  });

  const {
    data: binData,
    isLoading,
    error,
  } = useExecuteQuery(frequencyDataQueryProps);

  // Widget plug-in processResults: create histogram frequency data
  const histogramData = useProcessResults({ binData, dataOptions });

  // Widget plug-in render: render chart with histogram data
  const histogramChartDataOptions = useMemo(
    () => ({
      bins: dataOptions.value,
      fequency: { name: FREQUENCY },
      breakBy: dataOptions.category,
      seriesToColorMap: dataOptions.seriesToColorMap,
    }),
    [dataOptions.value, dataOptions.seriesToColorMap, dataOptions.category]
  );

  if (!minMaxData || isMinMaxLoading) return <div>{"loading"}</div>;
  if (isMinMaxError) return <div>{isMinMaxError}</div>;
  if (!binData || isLoading || !histogramData) return <div>{"loading"}</div>;
  if (error) return <div>{error}</div>;

  return (
    <HistogramChart
      dataSet={histogramData}
      dataOptions={histogramChartDataOptions}
      styleOptions={styleOptions}
    />
  );
};`}
          </CodeBlock>
        )}

        {viewCode === 'useBuildQueryMinMax' && (
          <CodeBlock language="tsx">
            {`import {
  measures as measureFactory,
} from "@sisense/sdk-data";
import type { Filter } from "@sisense/sdk-data";
import { useMemo } from "react";
import type { HistogramDataOptions } from "../Histogram";

// Widget plug-in buildQuery: get min max count
export const useBuildMinMaxQuery = ({
  dataOptions,
  filters,
}: {
  dataOptions: HistogramDataOptions;
  filters?: Filter[];
}) => {
  const minMeas = useMemo(
    () => measureFactory.min(dataOptions.value, "min"),
    [dataOptions.value]
  );
  const maxMeas = useMemo(
    () => measureFactory.max(dataOptions.value, "max"),
    [dataOptions.value]
  );
  const countMeas = useMemo(
    () => measureFactory.count(dataOptions.value, "count"),
    [dataOptions.value]
  );
  const minMaxQueryProps = useMemo(
    () => ({
      measures: [minMeas, maxMeas, countMeas],
      filters,
    }),
    [minMeas, maxMeas, countMeas, filters]
  );
  return minMaxQueryProps;
};`}
          </CodeBlock>
        )}

        {viewCode === 'useBuildQuery' && (
          <CodeBlock language="tsx">
            {`import {
  filterFactory,
  measureFactory,
} from "@sisense/sdk-data";
import type { Filter, Measure, QueryResultData } from "@sisense/sdk-data";
import { useMemo } from "react";
import type { HistogramDataOptions, HistogramStyleOptions } from "../Histogram";

const MAX_BARS = 60;
const MIN_BARS = 3;

const binLabel = (min: number, max: number, precision = 6) => {
  const binMidValue = (max + min) / 2.0;
  if (!precision || precision < 0) return ${'`${'}binMidValue${'}`'};

  const scaleFactor = Math.pow(10, precision);

  return ${'`${'}Math.round(binMidValue * scaleFactor) / scaleFactor${'}`'};
};

// Widget plug-in buildQuery: git bin frequency per cateogry
export const useBuildQuery = ({
  minMaxData,
  dataOptions,
  filters,
  styleOptions,
}: {
  minMaxData?: QueryResultData;
  dataOptions: HistogramDataOptions;
  filters?: Filter[];
  styleOptions?: HistogramStyleOptions;
}) => {
  const countMeas = useMemo(
    () => measureFactory.count(dataOptions.value, "count"),
    [dataOptions.value]
  );

  const binMeasures = useMemo<Measure[] | undefined>(() => {
    if (!minMaxData) return undefined;
    const firstRow = minMaxData.rows[0];
    if (!firstRow || firstRow?.some((r) => !r)) return undefined;

    const minIndex = 0;
    const maxIndex = minIndex + 1;
    const countIndex = maxIndex + 1;

    const minValue = firstRow[minIndex]?.data as number;
    const maxValue = firstRow[maxIndex]?.data as number;
    const count = firstRow[countIndex]?.data as number;

    let binCount =
      !styleOptions?.binCount || styleOptions.binCount === "auto"
        ? Math.floor(Math.sqrt(count))
        : styleOptions.binCount;

    binCount = Math.max(binCount, MIN_BARS);
    binCount = Math.min(binCount, MAX_BARS);

    const binRange = (maxValue - minValue) / binCount;
    return Array(binCount)
      .fill(0)
      .map((_v, index) => {
        const min = minValue + index * binRange;
        const max = min + binRange;
        const binFilter = filterFactory.between(dataOptions.value, min, max);
        return measureFactory.measuredValue(
          countMeas,
          [binFilter],
          binLabel(min, max, styleOptions?.binSizePrecision)
        );
      });
  }, [
    countMeas,
    dataOptions.value,
    minMaxData,
    styleOptions?.binCount,
    styleOptions?.binSizePrecision,
  ]);

  if (!binMeasures) {
    return {
      measures: [],
      dimensions: [],
      enabled: false,
    };
  }

  return {
    measures: binMeasures,
    filters,
    dimensions: dataOptions.category,
    enabled: true,
  };
};
`}
          </CodeBlock>
        )}

        {viewCode === 'useProcessResults' && (
          <CodeBlock language="tsx">
            {`import type { Data, QueryResultData } from "@sisense/sdk-data";
import { useMemo } from "react";
import type { HistogramDataOptions } from "../Histogram";

export const FREQUENCY = "frequency";

// Widget plug-in processResults: create Histogram frequency data
export const useProcessResults = ({
  binData,
  dataOptions,
}: {
  binData?: QueryResultData;
  dataOptions: HistogramDataOptions;
}) => {
  return useMemo(() => {
    if (!binData) return { columns: [], rows: [] };

    const rows: (number | string)[][] = [];
    binData.rows.forEach((_row, rowIndex) => {
      binData.columns.forEach((column, colIndex) => {
        if (colIndex >= dataOptions.category.length) {
          const row: (number | string)[] = [];
          const currentRow = binData.rows[rowIndex];
          if (currentRow) {
            dataOptions.category.forEach((_d, dimIndex) => {
              row.push(currentRow[dimIndex]?.data as number);
            });
            row.push(currentRow[colIndex]?.data as number);
            row.push(parseFloat(column.name));
            rows.push(row);
          }
        }
      });
    });

    return {
      columns: [
        ...dataOptions.category.map((d) => ({ name: d.name, type: d.type })),
        { name: FREQUENCY, type: "number", aggregation: "sum" },
        { name: dataOptions.value.name, type: "number" },
      ],
      rows: rows,
    } as Data;
  }, [binData, dataOptions.value.name, dataOptions.category]);
};`}
          </CodeBlock>
        )}

        {viewCode === 'HistogramChart' && (
          <CodeBlock language="tsx">
            {`import { useCallback, useMemo } from "react";
import type { Filter, Column, MeasureColumn, Data } from "@sisense/sdk-data";
import type {
  HighchartsOptions,
  StackableStyleOptions,
  ValueToColorMap,
} from "@sisense/sdk-ui";
import { ColumnChart } from "@sisense/sdk-ui";
import merge from "deepmerge";
import type { HistogramStyleOptions } from "./Histogram";

export type HistogramChartStyleOptions = HistogramStyleOptions;

export interface HistogramChartDataOptions {
  fequency: MeasureColumn;
  bins: Column;
  breakBy: Column[];
  seriesToColorMap?: ValueToColorMap;
}

export type HistogramChartProps = {
  dataSet: Data;
  dataOptions: HistogramChartDataOptions;
  filters?: Filter[];
  styleOptions?: HistogramChartStyleOptions;
};

export const HistogramChart = ({
  dataSet,
  dataOptions,
  filters,
  styleOptions,
}: HistogramChartProps) => {
  // Widget plug-in render: render chart with histogram data
  const onBeforeRender = useCallback(
    (options: HighchartsOptions) => {
      const plotOptions = {
        plotOptions: {
          column: {
            shadow: false,
            grouping: true,
            borderWidth: 1,
            borderColor: styleOptions?.barBorder ? "black" : "white",
            groupPadding: 0,
            pointPadding: 0,
            maxPointWidth: undefined,
          },
        },
      };

      if (styleOptions?.subtype === "overlay") {
        options.series?.forEach((s) => (s.opacity = 0.5));
        plotOptions.plotOptions.column.grouping = false;
      }

      return merge(options, plotOptions);
    },
    [styleOptions?.barBorder, styleOptions?.subtype]
  );

  const columnStyleOptions = useMemo<StackableStyleOptions>(
    () => ({
      ...styleOptions,
      subtype:
        styleOptions?.subtype === "stacked"
          ? "column/stackedcolumn"
          : "column/classic",
    }),
    [styleOptions?.subtype]
  );

  const columnChartDataOptions = useMemo(
    () => ({
      category: [dataOptions.bins],
      value: [dataOptions.fequency],
      breakBy: dataOptions.breakBy,
      seriesToColorMap: dataOptions.seriesToColorMap,
    }),
    [dataOptions]
  );

  return (
    <ColumnChart
      dataSet={dataSet}
      dataOptions={columnChartDataOptions}
      onBeforeRender={onBeforeRender}
      styleOptions={columnStyleOptions}
    />
  );
};`}
          </CodeBlock>
        )}

        <Divider />
      </CodeHighlight>
    </Article>
  );
}
