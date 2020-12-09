const Item = require("../models/Item");

exports.suggestItem = async(request, response) => {
    try {
        const { item_name, item_description, item_category, reasons } = request.body;
        if (item_name && item_description && item_category) {
            const newItem = new Item({
                item_name,
                item_description,
                item_category,
                reasons,
            });
            const myItem = await newItem.save();
            myItem.success = true;
            response.status(201).json(myItem);
        } else {
            response.status(400).json({
                success: false,
                message: "new item could not be suggested",
            });
        }
    } catch (error) {
        response.status(500).json(error);
    }
}

exports.getSuggestions = async(request, response) => {
    try {
        const category = request.params.category.toLowerCase();
        const allItems = (category) ? await Item.find({ item_category: category }) : await Item.find();
        if (allItems) response.status(200).json(allItems);
        else response.status(404).json({
            success: false,
            message: "item(s) not found",
        });
    } catch (error) {
        response.status(400).json(error);
    }
}