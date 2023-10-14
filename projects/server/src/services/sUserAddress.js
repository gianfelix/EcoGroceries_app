const db = require("../models");
const UserAddress = db.User_Address;
const sequelize = db.sequelize;
const { Op } = require('sequelize')
const messages = require("./messages");


const getUserAddress = async () => {
  const result = await UserAddress.findAll();
  if (!result) {
    return messages.errorClient(400, "Alamat pengguna tidak ditemukan");
  }
  return messages.success("successfully get user address", result);
};

const getUserAddressById = async (id) => {
  const result = await UserAddress.findAll({
    where: { id_user: id },
  });
  if (!result) {
    return messages.errorClient(400, "Alamat pengguna tidak ditemukan");
  }
  return messages.success("successfully get user address", result);
};

const createUserAddress = async (
  id_user,
  userName,
  userProvince,
  userCity,
  longitude,
  latitude,
  userAddress,
  isMain
) => {
  try {
    // Create a new user address using the User_Address model
    const newUserAddress = await UserAddress.create({
      id_user,
      userName: userName,
      userProvince: userProvince,
      userCity: userCity,
      longitude: longitude,
      latitude: latitude,
      userAddress: userAddress,
      isMain: isMain || false,
    });

    return newUserAddress;
  } catch (error) {
    throw error;
  }
};

const deleteUserAddress = async (addressId) => {
  try {
    const existingAddress = await UserAddress.findOne({
      where: { id: addressId },
    });

    if (!existingAddress) {
      return messages.errorClient(400, "Alamat pengguna tidak ditemukan");
    }
    await existingAddress.destroy();
    return messages.success("Alamat pengguna berhasil dihapus");
  } catch (error) {
    return messages.errorServer(500, error.message);
  }
};

const updateUserAddress = async (
  id_user,
  addressId,
  userName,
  userProvince,
  userCity,
  longitude,
  latitude,
  userAddress,
  isMain
) => {
  try {
    const existingAddress = await UserAddress.findOne({
      where: { id: addressId, id_user }, 
    });
    console.log(existingAddress)
    if (!existingAddress) {
      return {
        status: 400,
        message: "Alamat pengguna tidak ditemukan",
      };
    }

    await sequelize.transaction(async (t) => {
      await existingAddress.update(
        {
          userName: userName,
          userProvince: userProvince,
          userCity: userCity,
          longitude: longitude,
          latitude: latitude,
          userAddress: userAddress,
          isMain: isMain || false,
        },
        { transaction: t }
      );
    });

    return {
      status: 200,
      message: "Alamat pengguna berhasil diperbarui",
      data: existingAddress,
    };
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      message: "Internal server error",
    };
  }
};

const setDefault = async (id_user, addressId) => {
  try {
    const existingAddress = await UserAddress.findOne({
      where: { id_user: id_user, id: addressId },
    });

    if (!existingAddress) {
      return { status: 400, message: "Alamat pengguna tidak ditemukan" };
    }

    await sequelize.transaction(async (t) => {
      // Update isMain to false for all addresses except the selected one
      await UserAddress.update(
        { isMain: false },
        { where: { id_user: id_user, id: { [Op.not]: addressId } }, transaction: t }
      );

      // Set isMain to true for the selected address
      await existingAddress.update(
        { isMain: true },
        { transaction: t }
      );
    });

    return { status: 200, message: "Alamat pengguna berhasil diatur sebagai alamat utama" };
  } catch (error) {
    console.error(error);
    return { status: 500, message: "Internal server error" };
  }
};


  
module.exports = {
  getUserAddress,
  getUserAddressById,
  createUserAddress,
  deleteUserAddress,
  updateUserAddress,
  setDefault,
};
