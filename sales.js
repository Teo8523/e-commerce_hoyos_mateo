import { client, main } from "../helpers/db.js";

export class CreateSalesCollection {
    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['reference', 'date', 'paymentMethods', 'client', 'seller', 'details'],
                properties: {
                    reference: { bsonType: 'int', description: 'Unique sale reference' },
                    date: { bsonType: 'date', description: 'Sale date' },
                    paymentMethods: { bsonType: 'objectId', description: 'Reference to payment method' },
                    client: { bsonType: 'objectId', description: 'Reference to client' },
                    seller: { bsonType: 'objectId', description: 'Reference to seller' },
                    details: {
                        bsonType: 'array',
                        items: {
                            bsonType: 'object',
                            required: ['product', 'quantity', 'price'],
                            properties: {
                                product: { bsonType: 'objectId', description: 'Reference to product' },
                                quantity: { bsonType: 'int', minimum: 1, description: 'Quantity sold (must be at least 1)' },
                                price: { bsonType: 'number', minimum: 0, description: 'Price per unit (must be positive)' }
                            }
                        },
                        description: 'List of products sold in this sale'
                    }
                }
            }
        }
    };

    async #create(db) {
        const exists = await db.listCollections({ name: 'sales' }).toArray();
        if (exists.length > 0) {
            console.log(' La colección "sales" ya existe.');
            return;
        }

        await db.createCollection('sales', this.#collection);
        console.log(' Colección "sales" creada exitosamente.');
    }

    async generateCollection(db) {
        await this.#create(db);
    }
}
