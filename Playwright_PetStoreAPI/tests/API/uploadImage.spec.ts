import { test, expect } from '@playwright/test'; 
import { initApiContext } from '../../src/utils/apiUtils'; 
import { ENV } from "../../src/utils/env/env";
import { readFileSync } from 'fs';
import path from 'path';


let createdPetId;
let apiContext; 

    test.describe('Upload Image of the pet formdata', () => { 
        
    test.beforeEach(async () => { 
        if(ENV.PROJECT_NAME === 'pet'){
            console.log(ENV.PROJECT_NAME)
            console.log(ENV.BASE_URL)
          }
        apiContext = await initApiContext(); 
        createdPetId = JSON.parse(readFileSync('tests/Outputs/createdPetResponse.json','utf-8')).id
        console.log(createdPetId)
        
    }); 
    test('upload pet image', async () => { 
        const requestData = {
            petId:createdPetId,
            file:"file",
            additionalMetadata:"anyData"
        }
        const blob = new Blob([JSON.stringify(requestData)], {
            type: 'application/json',
          });

          const data = new FormData();
          data.append('jsonPayload', blob);

        const imagePath = path.resolve(__dirname,'../../TestData/pet.jpg')
        const fileData = readFileSync(imagePath)
        const fileBlob = new Blob([fileData])
        const formData = new FormData()
        formData.append('petId',createdPetId);
        formData.append('file',fileBlob)
        formData.append('additionalMetadata','anydata')
        const response = await apiContext.post(`pet/${createdPetId}/uploadImage`,{
        headers:{
            'content-type':'multipart/form-data;boundary=--;charset=UTF-8'
        },
        body:data,
       })

        if(response.status() === 200){
         expect(response.status()).toBe(200);
         console.log(response.status)
         expect(response.ok()).toBeTruthy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        }
        else if(response.status() === 404){
         expect(response.status()).toBe(404);
         console.log(response.status)
         expect(response.ok()).toBeFalsy(); 
         const responseBody = await response.json(); 
         console.log(responseBody)
        }
        else{
            console.error(`Unexpected status code :${response.status()}`)
        }
     }); 
})