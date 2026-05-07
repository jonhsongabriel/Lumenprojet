const connectDevice = async (req, res) => {
  try {
    const { deviceSn, appId, appSecret } = req.body;

    if (!deviceSn) {
      return res.status(400).json({
        success: false,
        message: "deviceSn manquant"
      });
    }

    if (!appId || !appSecret) {
      return res.status(400).json({
        success: false,
        message: "Solarman credentials manquants"
      });
    }

    // SIMULATION API SOLARMAN (évite crash)
    const response = {
      deviceSn,
      status: "connected",
      timestamp: new Date()
    };

    return res.json({
      success: true,
      data: response
    });

  } catch (error) {
    console.error("connect-device error:", error);

    return res.status(500).json({
      success: false,
      message: "Erreur serveur"
    });
  }
};

module.exports = {
  connectDevice
};