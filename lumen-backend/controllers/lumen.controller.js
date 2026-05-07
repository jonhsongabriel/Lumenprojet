const connectDevice = async (req, res) => {
  try {
    const { deviceSn, devicePassword } = req.body;

    const appId = process.env.SOLARMAN_APP_ID;
    const appSecret = process.env.SOLARMAN_APP_SECRET;

    if (!deviceSn || !devicePassword) {
      return res.status(400).json({
        success: false,
        message: "deviceSn ou devicePassword manquant"
      });
    }

    if (!appId || !appSecret) {
      return res.status(500).json({
        success: false,
        message: "Configuration Solarman manquante (.env)"
      });
    }

    // simulation connexion
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

module.exports = { connectDevice };