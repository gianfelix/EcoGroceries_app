const { default: axios } = require("axios");
const db = require("../models");
const Voucher = db.Voucher;
const Category = db.Category;
const cron = require("node-cron");

const vouchersControllers = {
  scheduleDeleteExpiredVouchers: () => {
    cron.schedule("* * * * *", async () => {
      try {
        const today = new Date();

        const response = await axios.get("http://localhost:8000/api/vouchers");
        const vouchers = response.data;

        for (const voucher of vouchers) {
          const timeValid = voucher.timeValid;

          if (timeValid === 0 || timeValid === null) {
            if (timeValid === null) {
              console.log("Time validity not set for voucher ID:", voucher.id);
            } else {
              console.log(
                "Voucher is valid indefinitely, skipping expiry check."
              );
            }
            continue;
          }

          const expiryDate = new Date(voucher.updatedAt);
          expiryDate.setDate(expiryDate.getDate() + timeValid);

          if (expiryDate > today) {
            console.log(`Voucher with ID ${voucher.id} is not yet expired.`);
          } else {
            console.log(`Voucher with ID ${voucher.id} has expired.`);

            await Voucher.destroy({
              where: {
                id: voucher.id,
              },
            });
            console.log(
              `Voucher with ID ${voucher.id} and the name: ${voucher.name} has been destroyed.`
            );
          }
        }
      } catch (error) {
        console.error("Error destroying expired vouchers:", error);
      }
    });
  },

  createVoucher: async (req, res) => {
    try {
      const {
        name,
        details,
        discountPercent,
        discountPrice,
        timeValid,
        minTotPrice,
        maxDiscPrice,
        limit,
        id_category,
      } = req.body;

      const ecoGroceriesCode = "EG";
      const nameCode = name ? name.toUpperCase().toString().slice(0, 4) : "";
      const randomCode = Math.floor(Math.random() * 100 + 1);
      const timeValidCode = timeValid
        ? timeValid.toString().padStart(2, "0")
        : "00";

      const codeVoucher = `${ecoGroceriesCode}${nameCode}${randomCode}${timeValidCode}`;

      const newVoucherData = {
        name,
        details,
        discountPercent,
        discountPrice,
        timeValid,
        minTotPrice,
        maxDiscPrice,
        codeVoucher,
        limit,
      };

      if (id_category) {
        newVoucherData.id_category = id_category;
      }

      const newVoucher = await Voucher.create(newVoucherData);

      const voucherData = await Voucher.findOne({
        where: {
          id: newVoucher.id,
        },
        include: [
          {
            model: Category,
            attributes: ["id", "category"],
          },
        ],
      });

      return res.status(201).json({
        message: "Voucher has been created",
        data: voucherData,
      });
    } catch (error) {
      console.error(error);
      console.log("check error:", error);
      return res
        .status(500)
        .json({ message: "Error creating voucher", error: error.message });
    }
  },

  updateVoucher: async (req, res) => {
    try {
      const voucherId = req.params.id;
      const {
        name,
        details,
        discountPercentage,
        discountPrice,
        timeValid,
        minTotPrice,
        maxDiscPrice,
        codeVoucher,
        limit,
        id_category,
      } = req.body;

      const voucher = await Voucher.findByPk(voucherId);

      if (!voucher) {
        return res.status(404).json({ message: "Voucher not found" });
      }

      voucher.name = name;
      voucher.details = details;
      voucher.discountPercentage = discountPercentage;
      voucher.discountPrice = discountPrice;
      voucher.timeValid = timeValid;
      voucher.minTotPrice = minTotPrice;
      voucher.maxDiscPrice = maxDiscPrice;
      voucher.codeVoucher = codeVoucher;
      voucher.limit = limit;
      voucher.id_category = id_category;

      await voucher.save();

      return res.status(200).json(voucher);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error updating voucher" });
    }
  },

  getAllVouchers: async (req, res) => {
    try {
      const vouchers = await Voucher.findAll({
        include: [
          {
            model: Category,
            attributes: ["id", "category"],
          },
        ],
      });

      return res.status(200).json(vouchers);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Error fetching vouchers" });
    }
  },
};

module.exports = vouchersControllers;
