const axios = require("axios");

// 🔹 obtenir token
const getToken = async () => {
  try {

    const response = await axios.post(
      `https://globalapi.solarmanpv.com/account/v1.0/token?appId=${process.env.SOLARMAN_APP_ID}`,
      {
        email: process.env.SOLARMAN_EMAIL,
        password: process.env.SOLARMAN_PASSWORD,
      },
      {
        headers: {
          "Content-Type": "application/json",
          appSecret: process.env.SOLARMAN_APP_SECRET,
        },
      }
    );

    return response.data.access_token;

  } catch (error) {

    console.error(
      "Erreur Token:",
      error.response?.data || error.message
    );

    return null;
  }
};

// 🔹 connexion appareil
const connectToDevice = async (serialNumber) => {

  try {

    const token = await getToken();

    if (!token) {
      return false;
    }

    const response = await axios.post(
      "https://globalapi.solarmanpv.com/device/v1.0/info",
      {
        deviceSn: serialNumber,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          appId: process.env.SOLARMAN_APP_ID,
          appSecret: process.env.SOLARMAN_APP_SECRET,
        },
      }
    );

    console.log("SOLARMAN:", response.data);

    if (response.data) {
      return true;
    }

    return false;

  } catch (error) {

    console.error(
      "Erreur Solarman:",
      error.response?.data || error.message
    );

    return false;
  }
};

module.exports = {
  connectToDevice,
};