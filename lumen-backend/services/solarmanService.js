// services/solarmanService.js

const axios = require("axios");

const connectToDevice = async (serialNumber) => {
  try {
    const response = await axios.post(
      "https://globalapi.solarmanpv.com/device/v1.0/info",
      {
        deviceSn: serialNumber,
      },
      {
        headers: {
          "Content-Type": "application/json",
          appId: process.env.SOLARMAN_APP_ID,
          appSecret: process.env.SOLARMAN_APP_SECRET,
        },
      }
    );

    if (response.data && response.data.success) {
      return true;
    }

    return false;

  } catch (error) {
    console.error("Erreur Solarman:", error.message);
    return false;
  }
};

module.exports = {
  connectToDevice,
};