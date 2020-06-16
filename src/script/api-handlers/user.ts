const axios = require('axios');


export const logInHandler = async (user: {email: string, password: string}) => {
  try {
    const response = await axios.post(process.env.API_URL + '/user/login', user);
    return response.data;
  } catch (error){
    return null;
  }
}

export const rechargeAccount = async (email: string, value: number) => {
  const response = await axios.put(process.env.API_URL + '/user', { user: { email, value } });
  return response.data;
};

