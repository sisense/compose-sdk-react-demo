# Compose SDK React Demo

This project is built with TypeScript and Vite. It uses Yarn 3.x as the package manager. Vite is a build tool that offers fast and optimized development and production workflows.

## Prerequisites

Before you begin, make sure you have the following installed on your system:

- [Node.js](https://nodejs.org) (version 16 or higher, 16.17.1 tested)
- [Yarn](https://yarnpkg.com) (version 3.x)

## Setup Sisense instance

The demo runs queries against the "Sample ECommerce" example data model in your Sisense instance.
Go to the Data tab, build and start the "Sample ECommerce" data model. If you see a green indicator, you have accomplished this step.

Add http://localhost:5173 to your Sisense instance CORS Allowed Origins configuration. For instructions, see [Cross Origin Resource Sharing](https://docs.sisense.com/main/SisenseLinux/cross-origin-resource-sharing.htm?Highlight=CORS).

## Setup Authentication

Create a `.env.local` file based on `.env.local.example` and add your Sisense instance url and an authentication method. Inside `main.tsx`, the specified instance url and authentication are passed to the `SisenseContextProvider` component.

It is recommended to use SSO, Web Access Token, or API token for authentication when using a production Sisense instance.

```bash
# Specify the sisense instance URL.
VITE_APP_SISENSE_URL=https://xxxxxxxxxxxxxxxx

# use one of the following authentication method
# and remove the others or leave others blank

## Web Access Token
VITE_APP_SISENSE_WAT=xxxxxxxxxxxxxxxxxx

## API Token
VITE_APP_SISENSE_API_TOKEN=

## SSO Enabled
VITE_APP_SISENSE_SSO_ENABLED=
```

## Available Scripts

In the project directory, after running `yarn install` to install the dependencies, 
you can run the following scripts using Yarn:

### Development Mode

```bash
yarn dev
```

Runs the development server using Vite. This script enables fast HMR (Hot Module Replacement) and provides a streamlined development experience.

Open the url http://localhost:5173 that matches the url you added to the CORS Allowed Origins configuration.

### Code Linting

```bash
yarn lint
```

Runs ESLint to analyze your TypeScript and JSX/TSX files for potential issues. The `--ext` flag specifies the file extensions to be checked, while `--report-unused-disable-directives` and `--max-warnings 0` enforce stricter linting rules.
