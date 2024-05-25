import { Customer } from './Customer';

export interface CustomerRepository {
    addCustomer(customer: Customer): Promise<Customer>;
}
