import orderModel from "./orders";
import storage from "./storage";
import config from '../config/config.json'

const invoice = {
    createInvoice: async function createInvoice(invoiceObject, order_id) {
        let order = await orderModel.getOrder(invoiceObject, order_id);

        order.status_id = 600;
        orderModel.updateOrder(order);

        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price
        }, 0);

        // let dueDate = new Date(invoiceObject.creation_date()) - 
        
        invoiceObject.due_date = dueDate.toLocaleDateString('se-SV');
        invoiceObject.total_price = totalPrice;
        invoiceObject.api_key = config.api_key;

        const tokenObject: any = await storage.readToken();

        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoiceObject),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject,
                },
                method: 'POST'
            });
        } catch (e) {
            // handle error
        }
    },
    getInvoices: async function getInvoices() {
        const tokenObject: any = await storage.readToken();
        try {
            const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                headers: {
                    'x-access-token': `${tokenObject.token}`,
                },
                method: 'GET'
            });
            const result = await response.json();

            return result.data;
        } catch (e) {
            console.log("fetch error")
        }
    }
}

export default invoice;