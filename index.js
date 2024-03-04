const express = require("express");
const cors  = require("cors");
require('./db/config');
const User = require("./db/User");
const Cart = require("./db/Cart");
const app  = express();
app.use(express.json());
app.use(cors());

app.post("/signup", async(req, res)=> {
    let user = new User(req.body);
    let results = await user.save();
    res.send(results);
});

app.post("/login", async(req, res) => {
    console.log(req.body);
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        // res.send(user);
        if (user) {
            res.send(user);
        } else {
            res.send({results: "no user found"});
        }
    } else {
        res.send({result : "No User Found"});
    }
});

app.post("/cart", async (req, res) => {
  const { name, price, image, userId } = req.body;

  try {
      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).send("User not found");
      }

      const cart = new Cart({
          name,
          price,
          image,
          userId
      });

      await cart.save();
      return res.status(200).send(cart); 
  } catch (error) {
      console.error("Error processing cart:", error);
      return res.status(500).send("Internal Server Error");
  }
});






app.get("/cartProducts/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    const cartProducts = await Cart.find({ userId });
    if (cartProducts.length > 0) {
      res.send(cartProducts);
    } else {
      res.send({ error: "No products found in the cart" });
    }
  } catch (error) {
    console.error("Error fetching cart products:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.delete("/product/:id", async(req, res) => {
    const result = await Cart.deleteOne({_id: req.params.id});
    res.send(result);
})


app.listen(5000);