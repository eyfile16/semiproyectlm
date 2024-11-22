require('dotenv').config();

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((error) => {
    console.log('Error al conectar con la base de datos: ', error);
  });

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
});
