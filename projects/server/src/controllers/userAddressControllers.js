const { sUserAddress } = require("../services");
const messages = require("../services/messages");
const getUserAddress = async (req, res) => {
  try {
    const { id } = req.account;
    const result = await sUserAddress.getUserAddress(id);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getUserAddressById = async (req, res) => {
  try {
    const { id } = req.params;
    const id_user = req.account.id;
    const result = await sUserAddress.getUserAddressById(id, id_user);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const createUserAddress = async (req, res) => {
  try {
    const id_user = req.account.id;
    const {
      userName,
      userProvince,
      userCity,
      longitude,
      latitude,
      userAddress,
      isMain,
    } = req.body;
    const result = await sUserAddress.createUserAddress(
      id_user,
      userName,
      userProvince,
      userCity,
      longitude,
      latitude,
      userAddress,
      isMain
    );
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const updateUserAddress = async (req, res) => {
  try {
    const id_user = req.account.id;
    const { userName, userProvince, userCity, longitude, latitude, userAddress, isMain } = req.body;
    const addressId = req.params.id; // Get addressId from request params

    const result = await sUserAddress.updateUserAddress(
      id_user,
      addressId,
      userName,
      userProvince,
      userCity,
      longitude,
      latitude,
      userAddress,
      isMain,
    );

    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};


const deleteUserAddress = async (req, res) => {
  try {
    const id_user = req.account.id
    const addressId = req.params.id;
    const result = await sUserAddress.deleteUserAddress(addressId, id_user);
    res.status(result.status).json(messages.response(result));
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

const setDefault = async (req, res) => {
  try {
    const id_user = req.account.id
    const addressId = req.params.id;
    const result = await sUserAddress.setDefault(id_user, addressId);
    res.status(result.status).json(result);
  } catch (error) {
    console.error("Error setting default:", error);
    res.status(500).json({ message: error.message }); 
  }
};

module.exports = {
  getUserAddress,
  createUserAddress,
  updateUserAddress,
  deleteUserAddress,
  getUserAddressById,
  setDefault,
};
