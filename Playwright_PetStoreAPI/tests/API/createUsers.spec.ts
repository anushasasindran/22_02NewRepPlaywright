import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { writeFile } from 'fs/promises';


let userDataArray;
let userData;
let apiContext; 

    test.describe('Create users', () => { 
      test.beforeAll(async () => { 
         if(ENV.PROJECT_NAME === 'pet'){
            console.log(ENV.PROJECT_NAME)
            console.log(ENV.BASE_URL)
          }
           apiContext = await initApiContext(); 
           userDataArray = JSON.parse(
               JSON.stringify(require("../../TestData/arrayofUsers.json"))
             );
           userData = JSON.parse(
               JSON.stringify(require("../../TestData/createUser.json"))
             );
       }); 
   
       test.afterAll(async () => {
         await new Promise(resolve => 
            setTimeout(resolve,5000));
       })
    test('Create users from array', async () => { 
        for(const user of userDataArray){
        const response = await apiContext.post('user/createWithArray',
         { 
            data:[userDataArray]
         }); 
         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         expect(responseBody.message).toEqual("ok")
         }
         else if(response.status() === 500){
            expect(response.status()).toBe(500);
            expect(response.ok()).toBeFalsy(); 
            const responseBody = await response.json(); 
            console.log(responseBody)
         }
         else {
            console.error(`Unexpected status code :${response.status()}`)
         }
        }
     }); 

     test('Create an user', async () => { 
        const response = await apiContext.post('user',
         { 
            data:userData
         }); 
         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         const userId = responseBody.message
         console.log(userId)
        const createdUserId ={createdID:userId}
         await writeFile('tests/Outputs/createduserId.json',JSON.stringify(createdUserId,null,2))
         }
         else if(response.status() === 500){
            expect(response.status()).toBe(500);
            expect(response.ok()).toBeFalsy(); 
            const responseBody = await response.json(); 
            console.log(responseBody)
         }
         else {
            console.error(`Unexpected status code :${response.status()}`)
         }
     }); 
})