import { client, main } from "../helpers/db.js";

export class CreateUsersCollection {
    #collection = {
        validator: {
            $jsonSchema: {
                bsonType: 'object',
                required: ['firstName', 'lastName', 'email', 'userType'],
                properties: {
                    firstName: { bsonType: "string", description: "name required" },
                    lastName: { bsonType: "string", description: "Last name required" },
                    identificationNumber: { bsonType: "string", description: "Identity document" },
                    identificationType: {
                        bsonType: "string",
                        enum: ["CC", "CE", "B", "NIT"],
                        description: "valid identification"
                    },
                    email: {
                        bsonType: "string",
                        pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                        description: "valid email required"
                    },
                    phone: {
                        bsonType: "string",
                        pattern: "^[0-9]{10}$",
                        description: "valid phone number"
                    },
                    password: {
                        bsonType: "string",
                        pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{9,}$",
                        description: "the password"
                    },
                    place: {
                        bsonType: "object",
                        properties: {
                            city: { bsonType: "string", description: "city name" },
                            country: { bsonType: "string", description: "country name" },
                            address: { bsonType: "string", description: "address" },
                            zipCode: { bsonType: "int", description: "zip code" }
                        }
                    },
                    userType: {
                        bsonType: "string",
                        enum: ["ADMIN", "SELLER", "CLIENT"],
                        description: "You can only be ADMIN, SELLER, or CLIENT"
                    },
                    active: { bsonType: "bool", description: "user status" },
                    registereDate: { bsonType: "date", description: "registration date" }
                }
            }
        }
    };


    async #create(db) {
        const exists = await db.listCollections({ name: 'users' }).toArray();
        if (exists.length > 0) {
            console.log('La colección "users" ya existe.');
            return;
        }

        await db.createCollection('users', this.#collection);
        console.log('Colección "users" creada exitosamente.');
    }

    async generateCollection(db) {
        await this.#create(db);
    }
}