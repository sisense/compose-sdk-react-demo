import { measureFactory } from '@sisense/sdk-data';
import type { Filter } from '@sisense/sdk-data';
import { useMemo } from 'react';
import type { HistogramDataOptions } from '../Histogram';

// Widget plug-in buildQuery: get min max count
export const useBuildMinMaxQuery = ({
  dataOptions,
  filters,
}: {
  dataOptions: HistogramDataOptions;
  filters?: Filter[];
}) => {
  const minMeas = useMemo(() => measureFactory.min(dataOptions.value, 'min'), [dataOptions.value]);
  const maxMeas = useMemo(() => measureFactory.max(dataOptions.value, 'max'), [dataOptions.value]);
  const countMeas = useMemo(
    () => measureFactory.count(dataOptions.value, 'count'),
    [dataOptions.value],
  );
  const minMaxQueryProps = useMemo(
    () => ({
      measures: [minMeas, maxMeas, countMeas],
      filters,
    }),
    [minMeas, maxMeas, countMeas, filters],
  );
  return minMaxQueryProps;
};
