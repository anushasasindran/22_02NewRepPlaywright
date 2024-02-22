import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { writeFile } from 'fs/promises';


let userData,username,password
let apiContext; 

 
    test.describe('User Login and Logout', () => { 
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            userData = JSON.parse(
                JSON.stringify(require("../../TestData/createUser.json"))
              );   
            username = userData.username
            password = userData.password
        }); 
    test('Login with username and password', async () => { 
        const response = await apiContext.get('user/login',{
            params : {
                "username": username,
                "password": password,
            }
          });

         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         expect(responseBody.message).toContain("logged in user session")
         }
         else if(response.status() === 500){
            expect(response.status()).toBe(500);
            expect(response.ok()).toBeFalsy(); 
            const responseBody = await response.json(); 
            console.log(responseBody)
         }
         else {
            console.error(`Unexpected status code :${response.status}`)
         }
     })
     test('Logout the user', async () => { 
        const response = await apiContext.get('user/logout')
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
     })
    })