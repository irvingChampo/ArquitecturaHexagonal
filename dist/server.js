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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AddCustomerUseCase_1 = require("./application/AddCustomerUseCase");
const MySQLCustomerRepository_1 = require("./infrastructure/MySQLCustomerRepository");
const app = (0, express_1.default)();
const port = 3000;
// Middleware para manejar datos JSON
app.use(express_1.default.json());
// Crear una instancia del caso de uso y del repositorio
const customerRepository = new MySQLCustomerRepository_1.MySQLCustomerRepository();
const addCustomerUseCase = new AddCustomerUseCase_1.AddCustomerUseCase(customerRepository);
// Ruta para agregar un nuevo cliente
app.post('/customers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstName, lastName, email } = req.body;
        const customer = yield addCustomerUseCase.execute({ firstName, lastName, email });
        res.status(201).json(customer);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al agregar el cliente', error: error.message });
    }
}));
// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor iniciado en http://localhost:${port}`);
});
