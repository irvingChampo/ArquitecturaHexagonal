import { Customer } from '../domain/Customer';
import { CustomerRepository } from '../domain/CustomerRepository';

export class AddCustomerUseCase {
    constructor(private customerRepository: CustomerRepository) {}

    async execute(customerData: Omit<Customer, 'id'>): Promise<Customer> {
        // Generar el ID automáticamente
        const customer = new Customer(
            0, // El ID será asignado por la base de datos
            customerData.firstName,
            customerData.lastName,
            customerData.email
        );
        return this.customerRepository.addCustomer(customer);
    }
}

