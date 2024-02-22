
This repository contains API tests written in Playwright for the Swagger Petstore API.

**Tool and Language**  
Playwright with Typescript

**Scope of Automation**  
The following 14 APIs from Petstore https://petstore.swagger.io/#/ are automated.

*Create Pet *Get Pet *Update Pet *Delete Pet *Create Users from array object *Create an User *Get User *Update User *User Login *User Logout *Delete User *Create Order *Get Order *Delete Order

**Framework Design**  
tests/API - contain test cases for the API end points  
TestData - contain inputs to API in the form of JSON files  
tests/outputs - stores the ouput response of API's in form of JSON files  
src/utils/env - contains environment configuration files  
src/utils/apiUtils - contains utility functions for initializing API contexts and header requests  
src/utils/globalSetup - contains global setup functions for initializing enviromental variables  
playwright.config.ts - contains the configuration settings for playwright tests/API  
package.json - contains the scripts to run and dev dependencies  

**Reports**  
HTML report  
Used inbuilt html report in playwright. This can be viewed after each run 'npx playwright show-report'  
The report can be viewed by right click 'Reveal on file explorer' from playwright-report folder  

**Allure report**  
Integrated allure report and after each run, can generate and open allure reports  

**Configuration**  
This framework supports cross environment configuration leveraging cross-envfor setting environment variables and dotenv for loading the environment specfic configurations. This helps to develop environment specific configurations , making it esier to manage and switch between different environments.  

**How to run the tests?**  
(All the scripts to run in different ways are mentioned in package.json)  

1.An master spec file(order file is kept under tests folder, with the test cases imported in order)
2.Run the tests using cross-env and in chromium browser cross-env test_env=petStore npx playwright test api_tc_order.spec.ts --project=chromium --headed
3.Run the tests without env variable npx playwright test api_tc_order.spec.ts --project=chromium --headed
4.The test scripts mentioned in package.json to be run as 'npm run scriptname' Example : "parallel:test": "npx playwright test api_tc_order.spec.ts" How to run? npm run parallel:test
5.The HTML report will be generated after each run and open that in npx playwright show-report
6.Allure reports can be generated and opened by running the corresponding scripts mentioned in package.json
To view the logs and debug in Trace viewer npx playwright test --ui
