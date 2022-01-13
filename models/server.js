const express = require('express')
const cors = require('cors')
const {dbConnection} = require('../database/config')

class Server {
    constructor(){
        this.app = express()
        this.port = process.env.PORT
        this.usuariosPath = '/api/usuarios'
        this.autPath = '/api/auth'

        //conexion con Base de datos
        this.conectarDB();

        //middlewares
        this.middlewares()
        //rutas de aplicacion
        this.routes();
    }
    async conectarDB (){
        await dbConnection()
    }

    middlewares(){
        this.app.use(cors());


        //lectura y

        this.app.use(express.json())

        //directorio publico
        this.app.use( express.static('public'))
    }

    routes(){
        this.app.use(this.autPath,require('../routes/auth'))
        this.app.use(this.usuariosPath,require('../routes/usuarios'))
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`)
        }) 
    }
}


module.exports = Server