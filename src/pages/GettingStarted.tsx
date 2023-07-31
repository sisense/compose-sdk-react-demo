import { useEffect } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism.css";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-bash";

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/line-numbers/prism-line-numbers.css";
import Divider from "../components/Divider";
import CodeBlock from "../components/CodeBlock";
import Paragraph from "../components/Paragraph";
import Article from "../components/Article";

export default function GettingStarted() {
  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <Article
      title="What is Compose SDK?"
      description={`Compose SDK is a Software Development Kit that enables a composable code-driven way to use Sisense platform capabilities for building analytics and data driven experiences into your application.
      `}
    >
      <h2 className="text-3xl font-optimistic font-bold">Installing Compose SDK</h2>
      <Paragraph>
        To get started with Sisense Compose SDK, you'll need a React web app. If
        you need to create one, we recommend you try Create React App or Vite as
        an alternative.
      </Paragraph>
      <Paragraph>
        <strong>Packages:</strong> You can install Sisense Compose SDK packages with either npm or yarn. Here's a quick overview
        of what is in each library:
      </Paragraph>
      <ul className="ml-6 my-3 list-disc">
        <li>
          <code>@sisense/sdk-ui:</code> React components for rendering charts
          and executing queries against a Sisense instance.
        </li>
        <li>
          <code>@sisense/sdk-data:</code> Implementations of elements of
          dimensional modeling including dimensions, attributes, measures, and
          filters.
        </li>
        <li>
          <code>@sisense/sdk-cli:</code> A command-line tool for generating
          TypeScript representations of a Sisense data model.
        </li>
      </ul>
      <Paragraph>
        How to install <code>@sisense/sdk-ui</code>, <code>@sisense/sdk-data</code>
        .
      </Paragraph>
      <CodeBlock language="bash" showLineNumber={false}>
        yarn add @sisense/sdk-data @sisense/sdk-ui
      </CodeBlock>

      <Paragraph>
        Inside your <code>main.tsx</code>, or if you have a different entry file,
        add <code>SisenseContextProvider</code> to authenticate your app. For development, you can use a username and password for authentication. In 
        production it is recommended to use SSO, Web Access Token, or API token for 
        secure authentication.
      </Paragraph>
      <Paragraph>
        All code snippets in this demo application are assumed to be a child 
        of SisenseContextProvider.
      </Paragraph>
      <CodeBlock language="tsx">
        {`ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <SisenseContextProvider
      url={url}
      // username/password or SSO or WAT or API token
      defaultDataSource={'Sample ECommerce'}
    >
      <App />
    </SisenseContextProvider>
  </React.StrictMode>
);`}
      </CodeBlock>

      <Divider />
      <h2 className="font-bold text-3xl">
        Generating a data model representation
      </h2>
      <CodeBlock showLineNumber={false} language="bash">yarn add @sisense/sdk-cli --dev</CodeBlock>

      <Paragraph>
        Next, you will want a data model that you can reference when building
        your charts. You do this with the CLI tool provided by @sisense/sdk-cli.
        Run the following command to create a sample-ecommerce.ts file that
        contains a TypeScript representation of the Sample ECommerce data model,
        substituting {`<username>`} and {`<instance IP>`} with the values for
        your instance.
      </Paragraph>
      <Paragraph>
        For the examples in this demo application, <code>sample-ecommerce-generated.ts</code> was
        generated with the following command.
      </Paragraph>
      <CodeBlock language="bash" showLineNumber={false}>
        npx run sdk-cli get-data-model --username {`<username>`} --output
        sample-ecommerce-generated.ts --dataSource "Sample ECommerce" --url http://
        {`<instance IP>`}{`[:<port>]`}
      </CodeBlock>
    </Article>
  );
}
