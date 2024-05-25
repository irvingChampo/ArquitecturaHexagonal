"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MySQLCustomerRepository = void 0;
const dotenv_1 = require("dotenv");
const mysql_1 = require("mysql");
// Cargar las variables de entorno desde el archivo .env
(0, dotenv_1.config)();
console.log(process.env.DB_HOST);
class MySQLCustomerRepository {
    constructor() {
        this.connection = (0, mysql_1.createConnection)({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE
        });
    }
    addCustomer(customer) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.connection.query('INSERT INTO customers (firstName, lastName, email) VALUES (?, ?, ?)', [customer.firstName, customer.lastName, customer.email], (error, results) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        customer.id = results.insertId;
                        resolve(customer);
                    }
                });
            });
        });
    }
}
exports.MySQLCustomerRepository = MySQLCustomerRepository;
