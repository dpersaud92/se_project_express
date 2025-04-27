const ClothingItem = require("../models/clothingItem");

const getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() => res.status(500).send({ message: "Server error" }));
};

const createItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch(() => res.status(400).send({ message: "Invalid item data" }));
};

const deleteItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .then((item) => {
      if (item) {
        res.send({ message: "Item deleted successfully" });
      } else {
        res.status(404).send({ message: "Item not found" });
      }
    })
    .catch(() => res.status(400).send({ message: "Invalid item ID" }));
};

module.exports = { getItems, createItem, deleteItem };
