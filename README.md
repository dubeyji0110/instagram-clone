# Getting Started with Instagram Clone

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
Instagram Clone developed by [Devansh Dubey](https://github.com/dubyeji0110) using ReactJS and deployed on firebase.

## Available Scripts

In the project directory, you can run:

### `yarn start` or `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test` or `npm run test`

Launches the test runner in the interactive watch mode.\

### `yarn build` or `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `yarn eject` or `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.


### Before you start

Start with cloning this repo on your local machine:

```sh
$ git clone https://github.com/dubeyji0110/instagram-clone.git
$ cd instagram-clone
```

To install and set up the library, run:

```sh
$ yarn install  or  $ npm install
```

You must create a `env.js` file in `src` folder and put your instagram authentication token in it.

```sh
const appId = <your appId>;
const clientId = <your clientId>;

export { appId, clientId };
```

After this step go to the `app.js` file

```sh
<InstagramEmbed className='app__posts' url='<your instagram post url>' clientAccessToken={appId + '|' + clientId} maxWidth={320} hideCaption={true} containerTagName='div' protocol='' injectScript onLoading={() => { }} onSuccess={() => { }} onAfterRender={() => { }} onFailure={() => { }} />
```

## Contributing

You can add your new features and pull a request, I will sure look into that.

1.  Fork it!
2.  Create your feature branch: `git checkout -b my-new-feature`
3.  Add your changes: `git add .`
4.  Commit your changes: `git commit -am 'Add some feature'`
5.  Push to the branch: `git push origin my-new-feature`
6.  Submit a pull request :sunglasses:

## Authors

-   **Devansh Dubey** - _Initial work_ - [dubeyji0110](https://github.com/dubeyji0110)
