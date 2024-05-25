import { config } from 'dotenv';
import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository';
import { Connection, createConnection } from 'mysql';

// Cargar las variables de entorno desde el archivo .env
config();

console.log(process.env.DB_HOST);

export class MySQLCustomerRepository implements CustomerRepository {
    private connection: Connection;

    constructor() {
        this.connection = createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABAS
        });
    }

    async addCustomer(customer: Customer): Promise<Customer> {
        return new Promise((resolve, reject) => {
            this.connection.query(
                'INSERT INTO customers (firstName, lastName, email) VALUES (?, ?, ?)',
                [customer.firstName, customer.lastName, customer.email],
                (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        customer.id = results.insertId;
                        resolve(customer);
                    }
                }
            );
        });
    }
}
