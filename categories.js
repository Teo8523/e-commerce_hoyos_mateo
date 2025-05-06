import { client, main } from "../helpers/db.js";


export class createCategoriesCollection{
    #collection = {
    validator:{
        $jsonSchema: {
            bsonType: 'object',
            required: ['code','name','active'],
            properties: {
                code: {bsonType: 'string',description: 'Unique category code'},
                name: {bsonType: 'string',description: 'category name'},
                active: {bsonType: 'bool',description: 'category status'}
            }
        }
    }
}




async #create(db) {
    const exists = await db.listCollections({ name: 'categories' }).toArray();
    if (exists.length > 0) {
        console.log('La colección "categories" ya existe.');
        return;
    }

    await db.createCollection('categories', this.#collection);
    console.log('Colección "categories" creada exitosamente.');
}

async #generarIndex(db){
    const categories = db.collection("categories")

    try {
        await categories.createIndex({ code: 1 }, {
            name: 'indexCode',
            collation: { locale: 'es', strength: 2 }
        });
        await categories.createIndex({ name: 1 }, {
            name: 'indexNameCategories',
            collation: { locale: 'es', strength: 1 }
        });
        console.log("indices creados correctamente")
    } catch(error){
        console.error("error en la creacion de los indices",error)
    }
}
async generateCollection(db) {
    await this.#create(db);
    await this.#generarIndex(db)
}
}