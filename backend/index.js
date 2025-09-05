const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const { type } = require("os");
const { error, timeStamp } = require("console");

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/trendora');

app.get("/", (req, res) => {
    res.send("Express app is runnning")
});

const Product = mongoose.model("Product", {
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
    },
    new_price: {
        type: Number,
        required: true
    },
    old_price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    },

    available: {
        type: Boolean,
        default: true,
    },

});

app.post('/addproduct', async (req, res) => {
    let products = await Product.find({});
    let id;
    if (products.length > 0) {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id + 1;
    } else {
        id = 1;
    }
    const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
        quantity: req.body.quantity,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success: true,
        name: req.body.name,
    })
});

app.post("/removeproduct", async (req, res) => {
    await Product.findOneAndDelete({ id: req.body.id });
    console.log("Remove");
    res.json({
        success: true,
        name: req.body.name
    })
});

app.get("/allproducts", async (req, res) => {
    let product = await Product.find({});
    console.log("All products fetched");
    res.send(product);
});

// get product which wants to update //
app.get('/updateproduct/:id', async (req, res) => {
    let productId = req.params.id;
    let getProduct = await Product.findById(productId);
    if (!getProduct) {
        return res.status(404).json({ message: "product not found" })
    }
    res.status(200).json(getProduct)
});

// now update getted product //
app.put('/updategetproduct/:id', async (req, res) => {
    try {
        const updated = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product updated successfully", product: updated });
    } catch (err) {
        res.status(500).json({ message: "Error updating product", error: err.message });
    }
});


const addressSchema = new mongoose.Schema({
    name: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    postalCode: { type: String, required: true },
    phone: { type: String, required: true }
}, { _id: false });

// schema creating for user model //

const Users = mongoose.model('Users', {
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String
    },
    addresses: [addressSchema],
    cartData: {
        type: Object,
    },
    date: {
        type: Date,
        default: Date.now,
    }
});

// creating endpoint for register the user //

app.post("/signup", async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) {
        return res.status(400).json({ success: false, errors: "existing user found with the same email" })
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    };

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });

    await user.save();

    const data = {
        user: {
            id: user.id
        }
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({
        success: true, token
    })
});

//creating endpoint for user login //
app.post('/login', async (req, res) => {
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
        const passCompare = req.body.password === user.password;
        if (passCompare) {
            const data = {
                user: {
                    id: user.id,
                }
            };
            const token = jwt.sign(data, 'secret_ecom');
            res.json({ success: true, token, user })
        } else {
            res.json({
                success: false,
                errors: "wrong password"
            });
        }
    } else {
        res.json({
            success: false,
            errors: "Wrong email Id"
        })
    }
});

// creating endpoint for get all users with their deatils //
app.get("/allusers", async (req, res) => {
    try {
        const allUsers = await Users.find({});
        if (!allUsers) {
            res.status(404).json({ message: "All users does not found" });
        };
        res.status(200).json(allUsers);
    } catch (err) {
        console.error("Error to fetch all users", err);
        res.status(500).json({ message: "Error to find all users" });
    }
});

//creating end point for post address field in user data //
app.put("/saveaddress", async (req, res) => {
    try {
        const { _id, address } = req.body;

        if (!_id || !address) {
            return res.status(400).json({ message: "_id and address are required" });
        }

        const updatedUser = await Users.findByIdAndUpdate(
            _id,
            { $push: { addresses: address } },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "Address added successfully",
            addresses: updatedUser.addresses
        });
    } catch (err) {
        console.error("Error failed to add address", err);
        res.status(500).json({ message: "Error adding address", error: err.message });
    }
});


// get user addresses//
app.get("/getuseraddress/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user)
    } catch (err) {
        console.error("Error to get user", err);
        res.status(500).json({ message: "Error to get user", error: err.message })
    }
})
// creating endpoint for new collection data //
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("New collection fetched");
    res.send(newcollection);
});

// creating endpoint for popular in women section //
app.get("/popularinwomen", async (req, res) => {
    let products = await Product.find({ category: "women" });
    let popular_in_women = products.slice(0, 4);
    console.log("popular in women fetched");
    res.send(popular_in_women);
});

// creating middleware to fetch user //
const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ errors: "Please authenticate using valid token" })
    } else {
        try {
            const data = jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (err) {
            res.status(401).send({ errors: "please authentication using a valid token" })
        }
    }
}

// creating endpoint for adding products in cartdata //
app.post('/addtocart', fetchUser, async (req, res) => {
    console.log("added", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Added")
});

// creating endpoint to remove product from cart data //
app.post('/removefromcart', fetchUser, async (req, res) => {
    console.log("removed", req.body.itemId);
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    if (userData.cartData[req.body.itemId] > 0)
        userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
    res.send("Removed")
});

// creating get cart data //
app.post('/getcart', fetchUser, async (req, res) => {
    console.log("get cart");
    let userData = await Users.findOne({ _id: req.user.id });
    if (!userData) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(userData.cartData);
});

// reset cart//

app.post('/emptycart', fetchUser, async (req, res) => {
  try {
    let userData = await Users.findOne({ _id: req.user.id });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    let newCart = {};
    for (let i = 0; i < 300; i++) {
      newCart[i] = 0;
    }

    userData.cartData = newCart;
    await userData.save();

    res.status(200).json({
      success: true,
      message: "Cart emptied successfully",
      cartData: userData.cartData
    });
  } catch (err) {
    console.error("Error emptying cart", err);
    res.status(500).json({ message: "Error emptying cart", error: err.message });
  }
});


// schema for orders //
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    orders: [
      {
        quantity:{
            type:Number,
            required:true,
        },
        address:{
          type:String,
          required : true,
        },
        orderType: {
          type: String,
          required: true,
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],
    orderDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    orderStatus: {
      type: String,
      enum: ["Pending", "Confirmed", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

// creating endpoint for post order data //
app.post("/saveorder", async (req, res) => {
    try {
        const { userId, product } = req.body;
        if (!userId || !product) {
            res.status(400).json({ message: "All fields are required" });
        };
        const { orderType, amount,address,quantity } = product;
        const orderData = {
            userId,
            orders: [{ orderType, amount,address,quantity }],
        };
        const newOrder = new Order(orderData);
        await newOrder.save();
        res.status(201).json({
            message: "Order placed successfully",
            orderId: newOrder._id,
            order: newOrder,
        });
    } catch (err) {
        console.error("Error placing order", err);
        res.status(500).json({ message: "Error to placing order", error: err.message });
    }
});

// enpoint for getting all orders //
app.get("/getallorders",async(req,res)=>{
    try{
       const allOrders = await Order.find({});
       if(!allOrders){
        res.status(404).json({message:"All orders are not found"});
       };
       res.status(200).json(allOrders);
    }catch(err){
     console.error("Error failed to get all users",err);
     res.status(500).json({message:"Internal server error",error:err.message});
    }
});

// for only update the orderStatus //
app.put("/updatestatus/:id",async(req,res)=>{
    try{
            const {id} = req.params ;
    const {status} = req.body ;
    
    const updateStatus = await Order.findByIdAndUpdate(id,{$set:{orderStatus:status}},{new:true});

    if(!updateStatus){
        res.status(404).json({message:"Order not found"})
    };
    res.status(200).json(updateStatus)
    }catch(err){
        console.error("Error to update status",err);
        res.status(500).json({message:"Internal server error",error:err.message})
    }
})

app.listen(port, (err) => {
    if (!err) {
        console.log("server running on port" + port)
    } else {
        console.log("Error :" + err)
    }
});

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage: storage });

app.use("/images", express.static("upload/images"))

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})