const BuyNFT = require("./src/function/BuyNFT").BuyNFT;
const ADA_ETH = require("./src/function/ADA_ETH").ADA_ETH;
const TestBuyNFT = require("./src/function/TestBuyNft").TestBuyNFT;

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 6500;

app.use(bodyParser.json());
app.use(cors());


// Production Function
app.post("/payment/buyNFT", (req, res) => {
  BuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Test Function
app.post("/buyNFT", (req, res) => {
  TestBuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Test Function
app.post("/buyNFT_1", (req, res) => {
  TestBuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Test Function
app.post("/buyNFT_2", (req, res) => {
  TestBuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Test Function
app.post("/buyNFT_3", (req, res) => {
  TestBuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Test Function
app.post("/buyNFT_4", (req, res) => {
  TestBuyNFT(req.body, (status, result) => {
    if (result) {
      res.json(result);
    }
  });
});

// Function to check the status of the server
app.get("/service/online", (req, res) => {
  console.log("Is Online!");
  res.send({ status: "online" });
});

app.listen(port, () => console.log(`Listening on port ${port}!`));
