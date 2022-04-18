import config from "../config/config.json";
import Delivery from "../interfaces/delivery";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();
        // console.log("Get deliveries from deliveryModel", result.data)
        return result.data;
    },
    addDelivery: async function addDelivery(delivery: Delivery) {
        // console.log(delivery, "from deliveries model")
        try {
            delivery.api_key = config.api_key;
            console.log(delivery, "second log from deliveries model")
            await fetch(`${config.base_url}/deliveries`, {
                body: JSON.stringify(delivery),
                headers: {
                    'content-type': 'application/json'
                },
                method: 'POST'
            });
        } catch (error) {
            console.log("Could not add delivery:", delivery)
        }
    },
};

export default deliveries;
