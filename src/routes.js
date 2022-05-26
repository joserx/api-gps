const express = require("express");
const { exec, table } = require("./database");

const router = express.Router();

router.get("/produtos", async (req, res) => {
  try {
    const result = await exec(`SELECT * FROM ${table}`);
    res.json(result.recordset).status(200);
  } catch (error) {
    res.json(error).status(400);
  }
});

router.get("/produtos/:id?", (req, res) => {
  let filter = "";
  if (req.params.id) filter = " WHERE ID=" + parseInt(req.params.id);
  exec(`SELECT * FROM ${table}` + filter, res);
});

router.post("/produtos", async (req, res) => {
  try {
    const { filial, custo, recno } = req.body;
    const query = `INSERT INTO ${table}(CTT_CUSTO, CTT_FILIAL, R_E_C_N_O_) VALUES ('${custo}','${filial}','${recno}')`;
    await exec(query);
    res.send({ message: "Criado com sucesso!" }).status(200);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.patch("/produtos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const nome = req.body.nome.substring(0, 150);
  const preco = req.body.preco.substring(0, 11);
  exec(
    `UPDATE ${table} SET Nome='${nome}', Preco='${preco}' WHERE ID=${id}`,
    res
  );
});

router.delete("/produtos/:id", (req, res) => {
  exec(`DELETE ${table} WHERE ID=` + parseInt(req.params.id), res);
});

module.exports = router;
