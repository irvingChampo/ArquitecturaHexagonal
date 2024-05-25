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
exports.AddCustomerUseCase = void 0;
const Customer_1 = require("../domain/Customer");
class AddCustomerUseCase {
    constructor(customerRepository) {
        this.customerRepository = customerRepository;
    }
    execute(customerData) {
        return __awaiter(this, void 0, void 0, function* () {
            // Generar el ID automáticamente
            const customer = new Customer_1.Customer(0, // El ID será asignado por la base de datos
            customerData.firstName, customerData.lastName, customerData.email);
            return this.customerRepository.addCustomer(customer);
        });
    }
}
exports.AddCustomerUseCase = AddCustomerUseCase;
