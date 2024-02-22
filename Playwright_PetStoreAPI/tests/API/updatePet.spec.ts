import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';


let createdPetResponse;
let petData;
let apiContext; 

    test.describe('Edit Pet', () => { 
    
      test.beforeEach(async () => { 
        if(ENV.PROJECT_NAME === 'pet'){
          console.log(ENV.PROJECT_NAME)
          console.log(ENV.BASE_URL)
        }
          apiContext = await initApiContext(); 
          createdPetResponse = JSON.parse(readFileSync('tests/Outputs/createdPetResponse.json','utf-8'))
      }); 
    test('Edit a pet', async () => { 
        const modifiedData = 
            {
              ...createdPetResponse,
              "category":{
                id:102,
                name:"cat"
              },
              "name": "jimmy",
              "tags":createdPetResponse.tags.map(tag =>({...tag,"name":"black" })),
              "status":"sold"
              }  
        const response = await apiContext.put('pet',
         { 
            data:modifiedData
         }); 
         if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
         await writeFile('tests/Outputs/updatedPetResponse.json',JSON.stringify(responseBody,null,2))
         }
         else {
            console.error(`Unexpected status code :${response.status()}`)
         }
     }); 
})