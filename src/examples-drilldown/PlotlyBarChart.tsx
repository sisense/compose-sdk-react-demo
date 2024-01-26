import { useCallback, useEffect, useMemo, useState } from 'react';
import { QueryResultData } from '@sisense/sdk-data';
import Plot from 'react-plotly.js';
import { Datum, PlotSelectionEvent } from 'plotly.js';
import { DataPointsEventHandler, MenuPosition } from '@sisense/sdk-ui';

type Props = {
  rawData: QueryResultData;
  onDataPointsSelected: DataPointsEventHandler;
  onContextMenu: (menuPosition: MenuPosition) => void;
};

const generateTrace = (
  data: { [key: string]: Datum }[],
  name: string,
  markerColor: string,
): Partial<Plotly.ScatterData> => ({
  type: 'bar',
  x: data.map((d) => d.category),
  y: data.map((d) => d.value),
  name: name,
  marker: {
    color: markerColor,
    line: {
      width: 1,
    },
    symbol: 'circle',
    size: 10,
  },
});

export const PlotlyBarChart: React.FC<Props> = ({
  rawData,
  onDataPointsSelected: onSelected,
  onContextMenu,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const data = useMemo(
    () =>
      rawData.rows.map(([category, value]) => ({
        category: category.data as string,
        value: value.data as string | number,
      })),
    [rawData.rows],
  );

  const trace = useMemo(
    () => generateTrace(data, rawData.columns[1].name, 'lightblue'),
    [data, rawData.columns],
  );

  useEffect(() => {
    const handleContextMenu = (event: MouseEvent) => {
      if (!selectedCategories.length) return;
      event.preventDefault();
      onContextMenu({ left: event.clientX, top: event.clientY });
    };

    document.addEventListener('contextmenu', handleContextMenu);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, [selectedCategories, onSelected, onContextMenu]);

  const handleSelection = useCallback(
    (event: PlotSelectionEvent) => {
      if (event.points.length) {
        const internalSelectedCategories = event.points.map((point) => {
          const clickedIndex = point.pointNumber;
          return data[clickedIndex].category;
        });
        setTimeout(() => setSelectedCategories(internalSelectedCategories), 1000);
        setTimeout(
          () =>
            onSelected(
              internalSelectedCategories.map((category) => ({
                value: undefined,
                categoryValue: category,
                categoryDisplayValue: category,
                seriesValue: undefined,
              })),
              event as unknown as MouseEvent,
            ),
          1000,
        );
      }
    },
    [data, onSelected],
  );

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
      }}
    >
      <Plot
        style={{ width: '700px', height: '450px' }}
        data={[trace]}
        layout={{
          datarevision: Date.now(),
          hovermode: 'closest',
          margin: {
            l: 50,
            r: 50,
            b: 50,
            t: 0,
            pad: 4,
          },
        }}
        onSelected={handleSelection}
        useResizeHandler={true}
      />
    </div>
  );
};
