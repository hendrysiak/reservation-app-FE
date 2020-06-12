const axios = require('axios');

export const logInHandler = async (user: {email: string, password: string}) => {
  try {
    const response = await axios.post('http://localhost:3002/user/login', user);
    return response.data;
  } catch (error){
    return null;
  }
}
