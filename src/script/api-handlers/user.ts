const axios = require('axios');

export const logInHandler = async (user: {email: string, password: string}) => {
  try {
    const response = await axios.post('http://localhost:3002/user/login', user);
    return response.data;
  } catch (error){
    return null;
  }
}

export const rechargeAccount = async (email: string, value: number) => {
  const response = await axios.put('http://localhost:3002/user', { user: { email, value } });
  return response.data;
};

