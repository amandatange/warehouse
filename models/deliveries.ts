import config from "../config/config.json";

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },
    // updateDeliveries: async function updateDeliveries(delivery) {
    //     try {
    //         delivery.api_key = config.api_key;

    //         await fetch(`${config.base_url}/delivery`, {
    //             body: JSON.stringify(product),
    //             headers: {
    //                 'content-type': 'application/json'
    //             },
    //             method: 'PUT'
    //         });
    //     } catch (error) {
    //         console.log("Could not update product:", product)
    //     }
    // },
};

export default deliveries;