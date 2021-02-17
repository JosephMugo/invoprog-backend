const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res)  => {
    res.send('Initial Setup');
})

// POST endpoint - add invoice to database [endpoint: POST '/invoices']

// GET endpoint - get invoice from database [endpoint: GET '/invoices/<invoice_id>'] 

// PATCH endpoint - update invoice in database [endpoint: PATCH '/invoices/<invoice_id>']

// DELETE endpoint - delete invoice in database [endpoint: DELETE '/invoices/<invoice_id>']

app.listen(port, () => {
    console.log(`🚀listening on localhost: port:${port}🚀`)
})