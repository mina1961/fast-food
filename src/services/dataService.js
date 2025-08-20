const Food = require('../models/Food');


async function getAllData() {
    return await Food.find({}).lean();
};

async function getDataById(id) {
    return await Food.findById(id).lean();
}

async function create(data, authorId) {
    const record = new Food({
        name: data.name,
        category: data.category,
        description: data.description,
        price: data.price,
        imageUrl: data.imageUrl,
        available: data.available !== undefined ? data.available : true,
        author: authorId
    });
    await record.save();
    return record;
}

async function update(id, data, userId) {
    const record = await Food.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('You are not the author of this record');
    }

    // Update allowed fields
    record.name = data.name;
    record.category = data.category;
    record.description = data.description;
    record.price = data.price;
    record.imageUrl = data.imageUrl;
    if (data.available !== undefined) {
        record.available = data.available;
    }

    await record.save();
    return record;
}

async function deleteById(id, userId) {
    const record = await Food.findById(id);

    if (!record) {
        throw new ReferenceError('Record not found ' + id);
    }

    if (record.author.toString() != userId) {
        throw new Error('You are not the author of this record');
    }

    await Food.findByIdAndDelete(id);
}

module.exports = {
    getAllData,
    getDataById,
    create,
    update,
    deleteById
}