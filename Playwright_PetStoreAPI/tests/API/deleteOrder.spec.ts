import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';


let createdOrderId;
let createdOrder;
let apiContext; 

    test.describe('Delete Order', () => { 
        test.beforeEach(async () => { 
            if(ENV.PROJECT_NAME === 'pet'){
                console.log(ENV.PROJECT_NAME)
                console.log(ENV.BASE_URL)
              }
            apiContext = await initApiContext(); 
            createdOrder = JSON.parse(readFileSync('tests/Outputs/orderDataResponse.json','utf-8'))
            createdOrderId = createdOrder.id
        }); 
    test('Delete order by order Id', async () => { 
        const response = await apiContext.delete(`store/order/${createdOrderId}`);
        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         expect(parseInt(responseBody.message)).toBe(createdOrderId)
        }
        else if(response.status() === 404){
         expect(response.status()).toBe(404);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         console.log("The order is already deleted")
        }
        else{
            console.error(`Unexpected status code :${response.status()}`)
        }
     }); 
})