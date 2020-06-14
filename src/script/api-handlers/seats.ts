const axios = require('axios');

import { Flight, Order, Seats} from '../../models/orders';

export const seatsVerify = async (flight: Flight) => {
    const response = await axios.post('http://localhost:3002/orders', { flight });
    return response.data;
};

export const orderHandler = async (order: Order) => {
    const response = await axios.post('http://localhost:3002/orders/new', { order });
    return response.data;
};