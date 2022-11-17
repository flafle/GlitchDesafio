const fs = require('fs');
const { builtinModules } = require('module');


//Uso clase contenedor del desafio pasado:
class Contenedor{
    constructor(url){
        this.url = url;
        this.productos = []
        
    }

    async save(producto){
        try {
            if (this.productos.length === 0) {
                producto.id = 0;
                this.productos.push(producto);
                console.log(producto.id);
                await fs.promises.writeFile(this.url, JSON.stringify(this.productos, null, 2));
            } else {
                let lastProducto = this.productos[this.productos.length - 1];
                producto.id = lastProducto.id + 1;
                this.productos.push(producto);
                console.log(producto.id);
                await fs.promises.writeFile(this.url, JSON.stringify(this.productos, null, 2))
            }
            return producto.id
            
        } catch (error) {
            throw new Error(error);
        }
    }

    async getById(id){
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            let filtro = obj.find(producto => producto.id === id);

            if (filtro === undefined) {
                return null 
                
            } else {
                console.log(filtro);
                return filtro
            }
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAll() {
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            console.log(obj);
            return obj

        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteById(id) {
        try {
            const readed = await fs.promises.readFile(this.url, 'utf-8');
            const obj = JSON.parse(readed);
            let filtro = obj.find(producto => producto.id === id);

            if (filtro === undefined) {
                console.log('no encontrado');
                return null

            } else {
                let position = obj.indexOf(filtro);
                obj.splice(position, 1);
                this.productos = obj;
                await fs.promises.writeFile(this.url, JSON.stringify(obj, null, 2));
            }
        } catch (error) {
            throw new Error(error);
        }
    }

  
}



module.exports = {Contenedor};