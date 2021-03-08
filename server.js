const express = require('express');
const app = express();
const port = 3000;
const db = require('./models/index');
const invoiceController = require('./controller/controller.invoice');
const orderController = require('./controller/controller.order');
const Invoice = db.Invoice;
const Order = db.Order;

app.get('/', (req, res)  => {
    res.send('Initial Setup');
});

// POST endpoint - add invoice to database [endpoint: POST '/invoices']

// GET endpoint - get invoice from database [endpoint: GET '/invoices/<invoice_id>'] 

// GET endpoint - get all invoices from database [endpoint: GET '/invoices/'] 

// PATCH endpoint - update invoice in database [endpoint: PATCH '/invoices/<invoice_id>']

// DELETE endpoint - delete invoice in database [endpoint: DELETE '/invoices/<invoice_id>']

db.sequelize.sync({ force: true })
.then(() => {
    app.listen(port, () => {
        console.log(`listening on localhost: port:${port}`)
    });
})
.then( async () => {
    const invoiceInfo = {
        companyName: 'Mugo Corp', 
        term: 'n/30', 
        invoiceDate: new Date(), 
        companyEmail: 'mugocorp@gmail.com', 
        companyAddress: '123 mugo corp', 
        companyPhone: 1231233, 
        clientName: 'Joe Corp', 
        clientEmail: 'joecorp@gmail.com', 
        clientAddress: '123 joe corp', 
        clientPhone: 4324321,
        orders: [
            {
                description: 'first order',
                rate: 2.5,
                quantity: 10
            },
            {
                description: 'second order',
                rate: 1.5,
                quantity: 5
            }
        ]
    }
    const invoiceOne = await invoiceController.createInvoice(invoiceInfo);
})
.catch((error) => {
    console.log(error);
});
