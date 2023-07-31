export const exampleData = {
    data: {
        columns: [
            { name: "Years", type: "date" },
            { name: "Group", type: "string" },
            { name: "Quantity", type: "number" },
            { name: "Units", type: "number" },
            { name: "Returns", type: "number" },
        ],
        rows: [
            ["2009", "A", 6781, 1000, 558],
            ["2009", "B", 5500, 1500, 440],
            ["2010", "A", 4471, 7000, 557],
            ["2011", "B", 1812, 5000, 151],
            ["2012", "B", 5001, 6000, 440],
            ["2013", "A", 2045, 4000, 304],
            ["2014", "B", 3010, 9000, 341],
            ["2015", "A", 5447, 8000, 444],
            ["2016", "B", 4242, 7000, 384],
            ["2017", "B", 936, 2000, 73],
        ],
    },
    years: {
        name: "Years",
        type: "date",
    },
    group: {
        name: "Group",
        type: "string",
    },
    quantity: {
        name: "Quantity",
        aggregation: "sum",
    },
    units: {
        name: "Units",
        aggregation: "sum",
    },
    returns: {
        name: "Returns",        
        aggregation: "sum",
    }
}
export const themeSettings = {
    typography: {
        fontFamily: "Optimistic",
    }
};
export const cartesianArgs = {
    dataSet: exampleData.data,
    dataOptions: {
        category: [exampleData.years],
        value: [exampleData.quantity, exampleData.units],
        breakBy: [],
    },
    styleOptions: {},
    themeSettings
};

export const polarArgs = {
    dataSet: exampleData.data,
    dataOptions: {
        category: [exampleData.years],
        value: [exampleData.quantity],
        breakBy: [exampleData.group],
    },
    themeSettings
};

export const pieArgs = {
    dataSet: exampleData.data,
    dataOptions: {
        category: [exampleData.years],
        value: [exampleData.quantity],
    },
    themeSettings,
};

export const styleOptions =  {
    legend: {
      enabled: true,
      position: "right",
    },
    xAxis: {
      title: {
        enabled: true,
        text: "Year",
      },
    },
    yAxis: {
      title: {
        enabled: true,
        text: "Quantity",
      },
    },
    y2Axis: {
      enabled: true,
      title: {
        enabled: true,
        text: "Quantity",
      },
    },
};

const dataSetScatter = {
    columns: [
        { name: 'Years', type: 'date' },
        { name: 'Group', type: 'string' },
        { name: 'Category', type: 'string' },
        { name: 'Quantity', type: 'number' },
        { name: 'Units', type: 'number' },
        { name: 'Amount', type: 'number' },
    ],
    rows: [
        ['2009', 'G1', { data: 'C1', color: '#0ff' }, 6781, 10, 200],
        ['2009', 'G1', { data: 'C2', color: '#f0f' }, 4012, 15, 250],
        ['2010', 'G1', { data: 'C1', color: '#0ff' }, 4471, 70, 300],
        ['2011', 'G2', { data: 'C2', color: '#f0f' }, 1812, 50, 150],
        ['2012', 'G2', { data: 'C2', color: '#f0f' }, 5001, 60, 250],
        ['2012', 'G2', { data: 'C1', color: '#0ff' }, 4001, 65, 255],
        ['2013', 'G1', { data: 'C1', color: '#0ff' }, 2045, 40, 400],
        ['2014', 'G2', { data: 'C2', color: '#f0f' }, 3010, 90, 900],
        ['2015', 'G1', { data: 'C1', color: '#0ff' }, 5447, 80, 50],
        ['2016', 'G2', { data: 'C2', color: '#f0f' }, 4242, 70, 20],
        ['2017', 'G2', { data: 'C2', color: '#f0f' }, 936, 20, 30],
    ],
};
const meas1 = { name: 'Quantity', aggregation: 'sum' };

const meas2 = { name: 'Units', aggregation: 'sum' };

const meas3 = { name: 'Amount', aggregation: 'sum' };

const styleOptionsScatter = {
    legend: {
        enabled: true,
        position: 'bottom',
    },
    navigator: {
        enabled: true,
    },
    markers: { enabled: true, fill: 'hollow', size: 'small' },
    xAxis: {
        enabled: true,
        gridLines: true,
        isIntervalEnabled: false,
        labels: {
            enabled: true,
        },
        logarithmic: false,
        title: {
            enabled: true,
            text: 'X Axis title',
        },
    },
    yAxis: {
        enabled: true,
        gridLines: true,
        isIntervalEnabled: false,
        labels: {
            enabled: true,
        },
        logarithmic: false,
        title: {
            enabled: true,
            text: 'Y Axis title',
        },
    },
};

const cat1 = {
    name: 'Group',
    type: 'string',
};

const cat2 = {
    name: 'Category',
    type: 'string',
};


export const scatterArgs = {
    dataSet: dataSetScatter,
    dataOptions: {
        x: meas1,
        y: meas2,
        breakByPoint: cat1,
        breakByColor: cat2,
        size: meas3,
    },
    styleOptions: styleOptionsScatter,
    themeSettings,
};


export const dashboardData = {
    oid: '648f393eaf180b0029cac7ac',
    widgets: [
        "648f393eaf180b0029cac7ad",
        "648f393eaf180b0029cac7ae",
        "648f393eaf180b0029cac7af",
        "648f393eaf180b0029cac7b0",
        "648f393eaf180b0029cac7b1",
        "648f393eaf180b0029cac7b2",
        "648f393eaf180b0029cac7b3",
        "648f393eaf180b0029cac7b4",
        "648f393eaf180b0029cac7b5"
    ]
}