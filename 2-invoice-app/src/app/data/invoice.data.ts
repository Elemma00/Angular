import { Invoice } from "../models/invoice";

export const invoiceData: Invoice = {
    id:1,
    name: 'Componentes de PC Nasa',
    client: {
        name: 'Emmanuel',
        lastname: 'Faundez',
        address: {
            country: 'USA',
            city: 'Los Angeles',
            street: 'Main St',
            number: 15,
        }
    },
    company: {
        name: 'New Age',
        fiscalnumber: 123456789,
    },
    items: [
        {
            id:1,
            product: 'CPU AMD Ryzen 5 5600X',
            price: 500,
            quantity: 1,
        },
        {
            id:2,
            product: 'Corsair Teclado Mecanico',
            price: 150,
            quantity: 2,
        },
        {
            id:3,
            product: 'Monitor Asus',
            price: 800,
            quantity: 3,
        },
    ]
}