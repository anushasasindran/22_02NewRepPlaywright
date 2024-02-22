import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { writeFile } from 'fs/promises';


let orderData;
let apiContext; 


    test.describe('Create Order', () => { 
      test.beforeEach(async () => { 
         if(ENV.PROJECT_NAME === 'pet'){
            console.log(ENV.PROJECT_NAME)
            console.log(ENV.BASE_URL)
          }
           apiContext = await initApiContext(); 
           orderData = JSON.parse(
               JSON.stringify(require("../../TestData/createOrder.json"))
             ); 
       }); 
       
       test.afterAll(async () => {
         await new Promise(resolve => 
            setTimeout(resolve,5000));
       })
     test('Create an order', async () => { 
        const response = await apiContext.post('store/order',
         { 
            data:orderData
         }); 
         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        
         await writeFile('tests/Outputs/orderDataResponse.json',JSON.stringify(responseBody,null,2))
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