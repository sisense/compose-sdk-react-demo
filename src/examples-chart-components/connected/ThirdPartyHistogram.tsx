import { useEffect, useState } from 'react';
import Prism from 'prismjs';

import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-tsx';
import 'prismjs/plugins/line-numbers/prism-line-numbers.js';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

import { ButtonGroup } from '../../components/ButtonGroup';
import * as DM from './sample-ecommerce';
import CodeBlock from '../../components/CodeBlock';
import SubTitle from '../../components/SubTitle';
import Header from '../../components/Header';
import { filterFactory } from '@sisense/sdk-data';
import { Histogram } from '../../components/Histogram';

const revenueFilter = filterFactory.between(DM.Commerce.Revenue, 0.1, 1000);
const yearFilter = filterFactory.members(DM.Commerce.Date.Years, ['2012-01-01']);

export default function ThirdPartyHistogram() {
  const [view, setView] = useState('Preview');

  useEffect(() => {
    Prism.highlightAll();
  }, [view]);

  return (
    <article className="my-8">
      <Header>
        <div className="flex flex-col mr-4  flex-1">
          <SubTitle id="model-with-chart">
            Example of third party Histogram chart created with Compose SDK
          </SubTitle>
        </div>
        <ButtonGroup selected={view} onChange={setView} labels={['Preview', 'React']} />
      </Header>

      {view === 'Preview' && (
        <Histogram
          dataSource={DM.DataSource}
          dataOptions={{
            category: [DM.Commerce.AgeRange],
            value: DM.Commerce.Revenue,
          }}
          filters={[revenueFilter, yearFilter]}
          styleOptions={{ subtype: 'stacked' }}
        />
      )}
      {view === 'React' && (
        <CodeBlock language="tsx">
          {`import React from "react";
import { Histogram } from "more-compose-sdk-charts";
import { filterFactory } from "@sisense/sdk-data";
import * as DM from "./sample-ecommerce";

export default function App() {
  const revenueFilter = filterFactory.between(DM.Commerce.Revenue, 0.01, 1000);
  const yearFilter = filterFactory.members(DM.Commerce.Date.Years, ['2012-01-01']);
  return (
    <Histogram
      dataSource={DM.DataSource}
      dataOptions={{
        category: [DM.Commerce.AgeRange],
        value: DM.Commerce.Revenue,
      }}
      filters={[revenueFilter, yearFilter]}
      styleOptions={{ subtype: 'stacked' }}
    />
  );
}`}
        </CodeBlock>
      )}
    </article>
  );
}
