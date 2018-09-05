const app=require('./app')
const port = process.env.PORT || 5200
const mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/vidly')
    .then(()=> console.log('connected to MongoDB...'))
    .catch(()=> console.error(('could not connect to MongoDB', err)))



app.listen(port, () => console.log(`Server has been started on ${port}`))


