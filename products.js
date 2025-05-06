import { client, main } from "../helpers/db.js";

export class CreateProductsCollection {
    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['code', 'name', 'price', 'stock', 'brand', 'condition', 'active', 'category', 'vat'],
                properties: {
                    code: { bsonType: 'string', description: 'Unique product code' },
                    name: { bsonType: 'string', description: 'Product name' },
                    description: { bsonType: 'string', description: 'Product description' },
                    image: {
                        bsonType: 'string',
                        pattern: '^(https?:\\/\\/.*\\.(?:png|jpe?g|gif|webp))$',
                        description: 'Valid image URL'
                    },
                    price: { bsonType: 'number', minimum: 0, description: 'Product price (double)' },
                    stock: { bsonType: 'int', minimum: 0, description: 'Available stock (int)' },
                    brand: { bsonType: 'string', description: 'Product brand' },
                    condition: {
                        bsonType: 'string',
                        enum: ['new', 'renewed', 'old'],
                        description: 'Product condition: new, renewed, old'
                    },
                    active: { bsonType: 'bool', description: 'Product status' },
                    category: { bsonType: 'objectId', description: 'Reference to categories' },
                    vat: { bsonType: 'number', minimum: 0, description: 'VAT product (double)' }
                }
            }
        }
    };

    async #create(db) {
        const exists = await db.listCollections({ name: 'products' }).toArray();
        if (exists.length > 0) {
            console.log(' La colección "products" ya existe.');
            return;
        }

        await db.createCollection('products', this.#collection);
        console.log(' Colección "products" creada exitosamente.');
    }

    async #generarIndex(db){
        const products = db.collection("products");

        try{
            await products.createIndex({name:1},{
                name:'indexNameProducts',
                collation:{locale:'es', strength:1}
            })
            console.log("se ha creado el indice exitosamente")
        }catch(error){
            console.error("error en la creacion del index de products:",error)
        }
    }

    async generateCollection(db) {
        await this.#create(db);
        await this.#generarIndex(db)
    }
}
