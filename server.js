const express = require("express");
const Parse = require("parse/node.js");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


Parse.initialize(
  "jkOXA2vgoPRHDsnlUs7SbEzLlSu782TpiDedZYs8", 
  "OS4T49WJFOXSaHtt8TutHelUfMNOpSRaKwbuwyqe"  
);
Parse.serverURL = "https://parseapi.back4app.com/";


app.get("/", (req, res) => {
  
  res.sendFile(path.join(__dirname, "index.html"));
});


app.get("/vendas", async (req, res) => {
  try {
    const Vendas = Parse.Object.extend("Vendas");
    const query = new Parse.Query(Vendas);
    const resultados = await query.find();

    
    const dados = resultados.map(obj => ({
      id: obj.id,
      categoria: obj.get("categoria"),
      valor: obj.get("valor")
    }));

    res.json(dados); 
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});

app.post("/vendas", async (req, res) => {
  try {
    const { categoria, valor } = req.body; 

    const Vendas = Parse.Object.extend("Vendas");
    const venda = new Vendas();
    
    venda.set("categoria", categoria);
    venda.set("valor", valor); 

    const resultado = await venda.save(); 

    res.status(201).json({ id: resultado.id, categoria, valor });
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
});
module.exports = app;
