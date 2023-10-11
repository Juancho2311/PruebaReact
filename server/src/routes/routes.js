const express = require("express");
const router = express.Router();
const historical = require("../controllers/historical.controller");

router.get("/", (req, res) => {
  res.json({
    status: 200,
  });
});

router.post("/tramos", async (req, res) => {
  console.log(req.body);
  await historical.getHistTramos(req.body, (resp) => {
    res.json(resp);
  });
});

router.post("/cliente", async (req, res) => {
  console.log(req.body);
  await historical.getHistCliente(req.body, (resp) => {
    res.json(resp);
  });
});

router.post("/tramos-cliente", async (req, res) => {
  console.log(req.body);
  await historical.getTramosCliente(req.body, (resp) => {
    res.json(resp);
    console.log(res);
  });
});

module.exports = router;
