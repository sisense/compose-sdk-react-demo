/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { useMemo } from 'react';
import type { Attribute, DataSource, Filter } from '@sisense/sdk-data';
import type { BaseAxisStyleOptions, BaseStyleOptions, ValueToColorMap } from '@sisense/sdk-ui';
import { useExecuteQuery } from '@sisense/sdk-ui';
import { useBuildQuery } from './histogram/useBuildQuery';
import { FREQUENCY, useProcessResults } from './histogram/useProcessResults';
import { HistogramChart } from './HistogramChart';
import { useBuildMinMaxQuery } from './histogram/useBuildMinMaxQuery';

export interface HistogramStyleOptions extends BaseStyleOptions, BaseAxisStyleOptions {
  binCount?: number | 'auto';
  barBorder?: boolean;
  binSizePrecision?: number;
  subtype?: 'stacked' | 'overlay';
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

export const Histogram = ({ dataOptions, filters, styleOptions }: HistogramProps) => {
  // Widget plug-in buildQuery: get min max count per category
  const minMaxQueryProps = useBuildMinMaxQuery({ dataOptions, filters });

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

  const { data: binData, isLoading, error } = useExecuteQuery(frequencyDataQueryProps);

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
    [dataOptions.value, dataOptions.seriesToColorMap, dataOptions.category],
  );

  if (!minMaxData || isMinMaxLoading) return <div>{'loading'}</div>;
  if (isMinMaxError) return <div>{isMinMaxError}</div>;
  if (!binData || isLoading || !histogramData) return <div>{'loading'}</div>;
  if (error) return <div>{error}</div>;

  return (
    <HistogramChart
      dataSet={histogramData}
      dataOptions={histogramChartDataOptions}
      styleOptions={styleOptions}
    />
  );
};
