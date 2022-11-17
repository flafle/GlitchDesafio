const express = require('express');
const contenedor = require('./contenedor.js');

const objContenedor = new contenedor.Contenedor("productos.json");

const app = express();

const PORT = process.env.PORT || 8080;

app.listen(PORT,()=> console.log(`Server on ${PORT}`))
//1) a y b:

app.get('/',(req,res)=>{
    res.send("Bienvenid@s a Azafran")//ruta raíz
});
//todos los productos:
app.get("/productos", async(req,res)=>{
    let productos = await objContenedor.getAll(); 
    console.log(productos)
    res.send(productos)
})
//random productos:
app.get("/productoRandom", async(req,res)=>{
    let productos = await objContenedor.getAll();
    let randomId = ((Math.floor(Math.random() * productos.length)));
    let productoRandom = productos.find(e => e.id == randomId);
    res.send(productoRandom);    
})
// })
//app.get app.put app.post app.delete (metodos http)


