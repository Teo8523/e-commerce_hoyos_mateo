import { client, main } from "../helpers/db.js";

export class CreatePaymentMethodsCollection {
    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['code', 'name', 'active', 'price', 'amount'],
                properties: {
                    code: { bsonType: 'string', description: 'Unique payment code' },
                    name: { bsonType: 'string', description: 'Payment method name' },
                    active: { bsonType: 'bool', description: 'Status of the payment method' },
                    price: { bsonType: 'number', minimum: 0, description: 'Price of the product' },
                    amount: { bsonType: 'int', minimum: 0, description: 'Amount of the product' }
                }
            }
        }
    };

    async #create(db) {
        const exists = await db.listCollections({ name: 'paymentMethods' }).toArray();
        if (exists.length > 0) {
            console.log(' La colección "paymentMethods" ya existe.');
            return;
        }

        await db.createCollection('paymentMethods', this.#collection);
        console.log('Colección "paymentMethods" creada exitosamente.');
    }

    async generateCollection(db) {
        await this.#create(db);
    }
}





