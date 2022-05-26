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

router.patch("/produtos/:id", async (req, res) => {
  try{
    const {filial, custo, recno} = req.body;
    const query = `UPDATE ${table} SET CTT_FILIAL='${filial}', CTT_CUSTO='${custo}' WHERE R_E_C_N_O_=${recno}`
    await exec(query);
    res.send({message:"Alterado com sucesso!"}).status(200);
    } catch (error){
      res.status(400).send(error);
    }
});

router.delete("/produtos/:id", async (req, res) => {
  try{
    const {recno} = req.body
    const query = `DELETE from ${table} WHERE R_E_C_N_O_=${recno}`;
    await exec(query);
    res.send({message:"Deletado com sucesso!"}).status(200);
  } catch (error){
    res.status(400).send(error);
  }
});

module.exports = router;
