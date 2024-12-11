const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    payment_mode: {
        type: String,
        required: true  
    },
    amount: {
        type: Number,
        required: true
    },
    // address: {
    //     type: mongoose.Types.ObjectId,
    //     ref: 'Address',
    //     required: true
    // },
    address: {
        emirate: {
            type: String,
            enum: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"],
            required: true
        },
        area: {
            type: String,
            required: true
        },
        address_line_1: {
            type: String,
            required: true
        },
        address_line_2: {
            type: String,
        },
        landmark: {
            type: String,
        },
        fullname: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        code: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ["home", "office"],
            default: "home",
        },
    },
    products: {   
        item: [{
            product_id: {
                type: mongoose.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            price: {
                type: Number,
            },
            size: {
                type: String,
            }
        }],
        totalPrice: {
            type: Number,
            default: 0
        }
    },
    status: {
        type: String,
        enum: ["Pending", "Placed", "Shipped", "Out for delivery", "Delivered", "Delayed", "Canceled","Returned"],
        default: "Placed"
    },
    offer: {
        type: String,
        default: "None"
    },
    delivery_days: {
        type: String,
    }
},
    {
        timestamps: true
    })

orderSchema.methods.addToOrders = function (product) {
    const products = this.products
    const isExisting = products.item.findIndex(objInItems => {
        return new String(objInItems.productId).trim() == new String(product._id).trim()
    })
    if (isExisting >= 0) {
        cart.products[isExisting].qty += 1
    } else {
        cart.products.push({
            productId: product._id,
            qty: 1
        })
    }
    cart.totalPrice += product.price
    console.log("User in schema:", this);
    return this.save()
}

orderSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Orders', orderSchema)