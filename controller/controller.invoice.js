const db = require('../models/index');
const Invoice = db.Invoice;
const Order = db.Order;
const orderController = require('./controller.order');

exports.createInvoice = async (invoiceInfo) => {
    let invoiceId = `${invoiceInfo.companyName.replace(/\s+/g, '')}_${Date.now()}`;
    return await Invoice.create({
        // invoice_id is companyName value with no spaces plus Date.now() value
        invoice_id: invoiceId,
        term: invoiceInfo.term,
        date: invoiceInfo.invoiceDate,
        company_name: invoiceInfo.companyName,
        company_email: invoiceInfo.companyEmail,
        company_address: invoiceInfo.companyAddress,
        company_phone: invoiceInfo.companyPhone,
        client_name: invoiceInfo.clientName,
        client_email: invoiceInfo.clientEmail,
        client_address: invoiceInfo.clientAddress,
        client_phone: invoiceInfo.clientPhone
    })
    .then(() => {
        // goes through orders and adds them to database
        return invoiceInfo.orders.map(async (order) => {
            return await orderController.createOrder(order, invoiceId)
        })
    })
    .then((ordersPromises) => {
        return Promise.all(ordersPromises);
    })
    .then((resolvedOrders) => {
        let orders = [];
        resolvedOrders.forEach((order) => {
            orders.push(order.dataValues.id);
        })
        return orders;
    })
    .then((orders) => {
        return {
            "success": true,
            "invoice added": invoiceId,
            "order added": orders
        }
    })
    .catch((error) => {
        throw new Error(error);
    });
}
