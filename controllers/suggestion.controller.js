const Item = require("../models/Item");

exports.suggestItem = (request, response) => {
    //get data
    const item_name = request.body.item_name;
    const item_description = request.body.item_description;
    const item_category = request.body.item_category.toLowerCase();
    const reasons = request.body.reasons;
    if (item_name && item_description && item_category) {
        const newItem = new Item({
            item_name,
            item_description,
            item_category,
            reasons,
        });
        newItem
            .save()
            .then(item => {
                item.success = true;
                response.status(201).json(item);
            })
            .catch(error => {
                response.status(400).json(error);
            });
    }
}

exports.getSuggestions = async(request, response) => {
    try {
        const category = request.params.category.toLowerCase();
        const allItems = (category) ? await Item.find({ item_category: category }) : await Item.find();
        console.log(category);
        if (allItems) response.status(201).json(allItems);
    } catch (error) {
        response.status(400).json(error);
    }
}