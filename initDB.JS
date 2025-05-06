import { client, main } from "../helpers/db.js";
import { CreateUsersCollection } from "./users.js";
import { createCategoriesCollection } from "./categories.js";
import { CreateProductsCollection } from "./products.js";
import { CreateSalesCollection } from "./sales.js";
import { CreatePaymentMethodsCollection } from "./paymentMethods.js";
import { insertUserData } from "../data/inserdata.js"; 



const db = await main();

const usersCollection = new CreateUsersCollection();
await usersCollection.generateCollection(db);

const categoriesCollection = new createCategoriesCollection();
await categoriesCollection.generateCollection(db);

const productsCollection = new CreateProductsCollection();
await productsCollection.generateCollection(db);


const salesCollection = new CreateSalesCollection();
await salesCollection.generateCollection(db);

const paymentMethodsCollection = new CreatePaymentMethodsCollection();
await paymentMethodsCollection.generateCollection(db);

await insertUserData(db)

await client.close();
console.log("todas las colecciones fueron creadas ")





















// export const insertData = async (collectionName, data) => {
//     try {
//         const db = await main(); 
//         const collection = db.collection(collectionName); // Seleccionamos la colección
//         const result = await collection.insertOne(data); // Insertamos el documento
//         console.log("Documento insertado con ID:", result.insertedId);
//         return result;
//     } catch (error) {
//         console.error("Error insertando datos:", error);
//         throw error;
//     } finally{
//         await client.close()
//     }
// };

// export const updateData = async(collectionName,filter,dataToUpdate) =>{
//     try{
//         const db = await main();
//         const collection = db.collection(collectionName);
//         const result = await collection.updateOne(filter,{$set:dataToUpdate});
//         console.log("data actualizada",result.modifiedCount)
//         return result;
//     }catch(error){
//         console.error("error en la actualizacion de datos", error);
//         throw error;
//     } finally{
//         await client.close
//     }
// }