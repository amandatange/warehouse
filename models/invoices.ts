import orderModel from "./orders";
import storage from "./storage";
import config from '../config/config.json'

const invoice = {
    createInvoice: async function createInvoice(invoiceObject) {
        const orderId = invoiceObject.order_id;
        let order = await orderModel.getOrder(orderId);
        
        let updatedOrder = {};
        updatedOrder.id = order.id;
        updatedOrder.status_id = 600;
        updatedOrder.api_key = config.api_key;
        updatedOrder.name = order.name;

        orderModel.updateOrder(updatedOrder);

        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price
        }, 0);

        let dueDate = new Date(invoiceObject.creation_date);
        dueDate.setDate(dueDate.getDate() + 30)
        
        invoiceObject.due_date = dueDate.toLocaleDateString('se-SV');
        invoiceObject.total_price = totalPrice;
        invoiceObject.api_key = config.api_key;

        const tokenObject: any = await storage.readToken();

        try {
            const response = await fetch(`${config.base_url}/invoices`, {
                body: JSON.stringify(invoiceObject),
                headers: {
                    'content-type': 'application/json',
                    'x-access-token': tokenObject.token,
                },
                method: 'POST'
            });
            const result = await response.json();
            
            return result.data;
        } catch (e) {
            // handle error
        }
    },
    getInvoices: async function getInvoices() {
        const tokenObject: any = await storage.readToken();
        try {
            const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`, {
                headers: {
                    'content-type': 'application/json',
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