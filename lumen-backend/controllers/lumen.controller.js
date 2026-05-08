const connectDevice = async (req, res) => {
  try {

    // ✅ frontend envoie maintenant serialNumber
    const { serialNumber, devicePassword } = req.body;

    // ✅ vérification champs
    if (!serialNumber || !devicePassword) {
      return res.status(400).json({
        success: false,
        message: "serialNumber ou devicePassword manquant"
      });
    }

    // =========================
    // SIMULATION CONNEXION
    // =========================

    const response = {
      deviceId: serialNumber,
      status: "connected",
      timestamp: new Date()
    };

    return res.json({
      success: true,
      deviceId: serialNumber,
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