const nock = require('nock');
const request = require('supertest')(`http://localhost:${process.env.PORT || 8080}`)
const expect = require('chai').expect;

describe('API Endpoints - [Successful Return Format Test]', () => {
    // [TEST] GET /invoices endpoint for getting all invoices in database
    describe('[GET] /invoices', () => { 
        it('returns the expected result', (done) => {
            nock(`http://localhost:${process.env.PORT || 8080}`)
                .get('/invoices')
                .reply(200, {
                    "success": true,
                    "invoices": [
                        {
                            "id": 1,
                            "invoice_num": "702314",
                            "term": "Net 30",
                            "date": "2/19/21",
                            "comp_name": "Mugo Corp",
                            "comp_email": "mugocorp@gmail.com",
                            "comp_address": "123 LiverView",
                            "comp_phone": "123-456-7890",
                            "client_name": "Nike",
                            "client_email": "nike@gmail.com",
                            "client_address": "321 nike dr.",
                            "client_phone": "456-789-9004",
                            "orders": [
                                {
                                    "id": 1,
                                    "description": "financial literacy software",
                                    "rate": 25,
                                    "quantity": 1000
                                },
                                {
                                    "id": 2,
                                    "description": "invoice software",
                                    "rate": 25,
                                    "quantity": 1000
                                }
                            ]
                        }
                    ]
                });

                request
                    .get('/invoices')
                    .end((err, res) => {
                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal(true);
                        expect(res.body).to.have.property('invoices');
                        // test first invoice if exist
                        for (let x = 0; x < res.body.invoices.length; x++) {
                            invoice = res.body.invoices[x];
                            expect(invoice).to.have.property('id');
                            expect(invoice).to.have.property('invoice_num');
                            expect(invoice).to.have.property('term');
                            expect(invoice).to.have.property('date');
                            expect(invoice).to.have.property('comp_name');
                            expect(invoice).to.have.property('comp_email');
                            expect(invoice).to.have.property('comp_address');
                            expect(invoice).to.have.property('comp_phone');
                            expect(invoice).to.have.property('client_name');
                            expect(invoice).to.have.property('client_email');
                            expect(invoice).to.have.property('client_address');
                            expect(invoice).to.have.property('client_phone');
                            expect(invoice).to.have.property('orders');
                            for (let x = 0; x < invoice.orders.length; x++) {
                                orders = invoice.orders[x];
                                expect(orders).to.have.property('id');
                                expect(orders).to.have.property('description');
                                expect(orders).to.have.property('rate');
                                expect(orders).to.have.property('quantity');
                            }
                        }
                        done();
                    });
        });
    });
    // [TEST] GET /invoices endpoint for specified id in database
    describe('[GET] /invoices/<invoice_id>', () => { 
        it('returns the expected result', (done) => {
            nock(`http://localhost:${process.env.PORT || 8080}`)
                .get('/invoices/1')
                .reply(200, {
                    "success": true,
                    "invoice": 
                        {
                            "id": 1,
                            "invoice_num": "702314",
                            "term": "Net 30",
                            "date": "2/19/21",
                            "comp_name": "Mugo Corp",
                            "comp_email": "mugocorp@gmail.com",
                            "comp_address": "123 LiverView",
                            "comp_phone": "123-456-7890",
                            "client_name": "Nike",
                            "client_email": "nike@gmail.com",
                            "client_address": "321 nike dr.",
                            "client_phone": "456-789-9004",
                            "orders": [
                                {
                                    "id": 1,
                                    "description": "financial literacy software",
                                    "rate": 25,
                                    "quantity": 1000
                                },
                                {
                                    "id": 2,
                                    "description": "invoice software",
                                    "rate": 25,
                                    "quantity": 1000
                                }
                            ]
                        }
                });

                request
                    .get('/invoices/1')
                    .end((err, res) => {
                        expect(res.body).to.have.property('success');
                        expect(res.body.success).to.equal(true);
                        expect(res.body).to.have.property('invoice');
                        expect(res.body.invoice).not.empty;

                        invoice = res.body.invoice;
                        expect(invoice).to.have.property('id');
                        expect(invoice).to.have.property('invoice_num');
                        expect(invoice).to.have.property('term');
                        expect(invoice).to.have.property('date');
                        expect(invoice).to.have.property('comp_name');
                        expect(invoice).to.have.property('comp_email');
                        expect(invoice).to.have.property('comp_address');
                        expect(invoice).to.have.property('comp_phone');
                        expect(invoice).to.have.property('client_name');
                        expect(invoice).to.have.property('client_email');
                        expect(invoice).to.have.property('client_address');
                        expect(invoice).to.have.property('client_phone');
                        expect(invoice).to.have.property('orders');
                        for (let x = 0; x < invoice.orders.length; x++) {
                            order = invoice.orders[x];
                            expect(order).to.have.property('id');
                            expect(order).to.have.property('description');
                            expect(order).to.have.property('rate');
                            expect(order).to.have.property('quantity');
                        }
                        done();
                    })
        });
    });
    // [TEST] POST /invoices endpoint - add invoice to database
    describe('[POST] /invoices', () => {
        it('returns the expected result', (done) => {
            nock(`http://localhost:${process.env.PORT || 8080}`)
                .matchHeader('accept', 'application/json')
                .post('/invoices/1')
                .reply(200, {
                    "success": true,
                    "added": 1
                });
            
            request
                .post('/invoices/1')
                .send({"term": "Net 30", "date": "2/20/21", "comp_name": "Mugo Corp", "comp_email": "mugocorp@gmail.com", "comp_address": "123 LiverView", "comp_phone": "123-456-7890", "client_name": "Dave", "client_email": "dave@gmail.com", "client_address": "123 dave dr.", "client_phone": "123-321-1234", "orders": [{"description": "financial literacy software", "rate": 25, "quantity": 1000}]})
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(true);
                    expect(res.body).to.have.property('added');
                    expect(res.body.added).to.equal(1);
                    done();
                })
        });
    });
    // [TEST] PATCH /invoices endpoint - update invoice in database
    describe('[PATCH] /invoices', () => {
        it('returns the expected result', () => {
            updateInvoice = 1;
            nock(`http://localhost:${process.env.PORT || 8080}`)
                .patch(`/invoices/${updateInvoice}`)
                .reply(200, {
                    "success": true,
                    "updated": updateInvoice
                })
            
            request
                .patch(`/invoices/${updateInvoice}`)
                .send({"term": "Net 30", "date": "2/20/21", "comp_name": "Mugo Corp", "comp_email": "mugocorp@gmail.com", "comp_address": "123 LiverView", "comp_phone": "1123-456-7890", "client_name": "Dave", "client_email": "dave@gmail.com", "client_address": "123 dave dr.", "client_phone": "123-321-1234"})
                .end((err, res) => {
                    expect(res.body).to.have.property('success');
                    expect(res.body.success).to.equal(true);
                    expect(res.body).to.have.property('updated');
                    expect(res.body.updated).to.equal(updateInvoice);
                })
            });
    });
    // [TEST] DELETE /invoices/<invoice_id> - delete invoice in database
    describe('[DELETE] /invoices/<invoice_id>', () => {
        it('returns the expected result', (done) => {
            deletedInvoice = 1;
            nock(`http://localhost:${process.env.PORT || 8080}`)
            .delete(`/invoices/${deletedInvoice}`)
            .reply(200, {
                "success": true,
                "deleted": deletedInvoice
            })

            request
            .delete(`/invoices/${deletedInvoice}`)
            .end((err, res) => {
                expect(res.body).to.have.property('success');
                expect(res.body.success).to.equal(true);
                expect(res.body).to.have.property('deleted');
                expect(res.body.deleted).to.equal(deletedInvoice);
                done();
            })
        });
    });

}); 