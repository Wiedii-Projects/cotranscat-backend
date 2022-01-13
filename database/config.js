const mongoose = require('mongoose');


const dbConnection = async () =>{
    try {
       await  mongoose.connect(process.env.MONGOCNN, {

       })
       console.log('base de datos oneline')
    } catch (error) {
        console.log(error)
        throw new Error('Error al iniciar la base de datos')
    }
}



module.exports ={
    dbConnection
}