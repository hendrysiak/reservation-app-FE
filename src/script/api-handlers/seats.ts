const axios = require('axios');

import { Seats, Flight, Order} from '../../models/orders';

export const seatsVerify = async (flight: Flight) => {
    const response = await axios.post('http://localhost:3002/orders', { flight });
    return response.data;
};
