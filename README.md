# petermnhull.github.io

This is my personal website built with React.

## Workflow

### Development

1. Checkout a new branch from Main.
2. Start a local app in development mode with `yarn start`.
3. Make code changes in `src` directory.
4. Check code changes work.
5. Update the local production build with `yarn build`.
6. Commit changes and merge branch to Main to keep source code up to date.

### Deployment
Once the build has updated, make sure to bring in any changes in the `build` directory into the `docs` directory (this is what Github uses to build and deploy the website).


# Further Information

This project (and this section of the README) was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
