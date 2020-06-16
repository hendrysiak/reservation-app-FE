const axios = require('axios');

import { Flight, Order, Seats} from '../../models/orders';

export const seatsVerify = async (flight: Flight) => {
    const response = await axios.post(process.env.API_URL + '/orders', { flight });
    return response.data;
};

export const orderHandler = async (order: Order) => {
    const response = await axios.post('/orders/new', { order });
    return response.data;
};