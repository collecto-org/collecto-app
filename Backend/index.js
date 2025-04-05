const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://collectokc:esMNd9R3meOaMVsm@cluster0.skl5wni.mongodb.net/collecto-dev?retryWrites=true&w=majority')
  .then(() => {
    console.log('✅ Conectado a MongoDB correctamente');
  })
  .catch((error) => {
    console.error('❌ Error al conectar a MongoDB:', error);
  });