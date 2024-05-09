const express = require('express') /*Se trae toda la libreria al codigo*/
const data = require('../data/data.json')
const _ = require('lodash');
 
const app = express();
app.use(express.json())

/*endpoint - Para consultar - recibe 2 parametros request(llega) response(devuelve)*/
app.get('/alquilables', (req, resp)=>{
    resp.status(200).json({
        data
    })
})

/*
La variable que le pongo despues de los dos puntos, en este caso id
viaja en el req (request).
*/

app.get('/alquilables/:identificador', (req, resp)=>{
    const id = req.params.identificador
    const alquilable = data.find(e => e.id == id)

    if(alquilable)
        resp.status(200).json(alquilable)
    else
        resp.status(404).json({error: `El id ${id} no existe.`})
})

app.delete('/alquilables/:identificador', (req, resp)=>{
    const id = req.params.identificador
    const idx = data.findIndex(e => e.id == id)
    
    if(idx >= 0){
        const removed = data.splice(idx, 1)
        resp.status(200).json({
            messaje: `El alquilable con id ${id} fue eliminado.`,
            alquilable: removed
        })
    }else
        resp.status(404).json({error: `El id ${id} no existe.`})
})

app.post('/alquilables/', (req, resp)=> {
    const alquilable = req.body
    let id = 0
    if(data.length) {
        id = _.max(data.map(e=>e.id))
    }
    const aGrabar = {id: id + 1, ...alquilable} 
    
    /*
    Sin lodash
    const maxId = data.reduce(
        (actual, next) => actual > next.id ? actual : next.id 
        , 0 ) + 1*/
    data.push(aGrabar)
    resp.status(201).json(aGrabar)
})

app.put('/alquilables/:identificador', (req, resp)=>{
    const id = req.params.identificador;
    const idx = data.findIndex(e => e.id == id);

    if(idx >= 0){
        data[idx] = {id: Number(id), ...req.body}
        resp.status(200).json(data[idx])
    }else
        resp.status(404).json({error: `El id ${id} no existe.`})

})




/*listen es una promesa, cuando se inicie el servidor ejecuta la fx flecha*/
app.listen(3001, ()=>{
    console.log('La aplicacion arranco correctamente en el puerto 3001')
})

