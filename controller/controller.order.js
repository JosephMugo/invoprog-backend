const db = require('../models/index');
const Order = db.Order;

exports.createOrder = async (orderInfo, invoiceId) => {
    return await Order.create({
        invoice_id: invoiceId,
        description: orderInfo.description,
        rate: orderInfo.rate,
        quantity: orderInfo.quantity
    })
}
