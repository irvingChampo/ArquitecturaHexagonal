import express, { Request, Response } from 'express';
import { AddCustomerUseCase } from './application/AddCustomerUseCase';
import { MySQLCustomerRepository } from './infrastructure/MySQLCustomerRepository';

const app = express();
const port = 3000;

app.use(express.json());

const customerRepository = new MySQLCustomerRepository();
const addCustomerUseCase = new AddCustomerUseCase(customerRepository);

// Rutas
app.post('/customers', async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, email } = req.body;
        const customer = await addCustomerUseCase.execute({ firstName, lastName, email });
        res.status(201).json(customer);
    } catch (error: any) {
        res.status(500).json({ message: 'Error al agregar el cliente', error: error.message });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
