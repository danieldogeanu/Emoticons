# Emoticons

Demo React App that allows you to search and copy Unicode Emoticons to use them in other places on the Internet or in other apps.

#### Visit Live App Here: [emoticons.ddsv.eu](https://emoticons.ddsv.eu)

## Available Scripts

In the project directory, you can run:

* `npm start` - Runs the app in the development mode.
* `npm test` - Launches the test runner in the interactive watch mode.
* `npm run coverage` - Launches the test runner in coverage mode and creates coverage report.
* `npm run show-coverage` - Opens the generated coverage report in a browser window.
* `npm run build` - Builds the app for production to the `build` folder.
* `npm run update-emoji` - Updates the emoji list to the latest version (installs the latest emoji.json).
* `npm run deploy` - Tests, builds and deploys the app over FTP.

In order for the deploy command to work, you need to create a `credentials.json` file at the root of the project, and add the following contents:

```
{
	"user": "_YOUR_USER_NAME_",
	"pass": "_YOUR_PASSWORD_",
	"host": "_YOUR_FTP_SERVER_",
	"root": "/",
	"port": 21
}
```

## Configuration

### Preferred Browser
To open the app in a different browser when developing it, add a `.env.local` file to the root of the project and add the following:
```
BROWSER="firefox"
```
If for example you want a more specific browser, like Firefox Developer Edition, you can specify the full path of the browser:
```
BROWSER="C://Program Files//Firefox Developer Edition//firefox.exe"
```
*NOTE: The `.env.local` file will not be added to the Git repository.*

---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

The emoji list was imported from [emoji.json](https://github.com/amio/emoji.json) repository.
