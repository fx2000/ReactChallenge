<div align="center">
    <img src="https://raw.githubusercontent.com/Jobsity/ReactChallenge/main/src/assets/jobsity_logo_small.png"/>
</div>

# React Challenge

React Challenge prepared for Jobsity by [Daniel Duque](mailto:duque@outlook.com)

The app runs a mock API using the [json-server](https://www.npmjs.com/package/json-server) library, it handles forms using the [react-hook-form](https://www.npmjs.com/package/react-hook-form) library and uses the [Visual Crossing](https://www.visualcrossing.com/) API to provide weather reports. There are two distinct calendar views (Grid and List) depending on the window size.

Basic folder structure is as follows:

src/  
├─ assets/  
├─ components/  
├─ config/  
├─ hooks/  
├─ pages/  
├─ services/  

Unit tests on all reusable components can be run using `npm test`

## How to deploy

 - Run `npm install` | `yarn install` to install all dependencies.
 - Run `npm start`   | `yarn run` to run the app locally.
 - Run `npm test`   | `yarn test` to run unit tests.
 - You can find the project running on `localhost:3000` and the json server api on `localhost:3002`
