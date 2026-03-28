const express = require('express'); //esta fue de las lineas que tuve que cambiar para que me dejara de dar el warning raro, no se si es porque tengo iOS
const app = express();
const port = 3000; 

app.use(express.static('SOFTWAREexpress')); //aqui esto se em hizo medio confuso, pero entiendo que es lo que hace

app.get('/arbol-universidad', (req, res) => {
  res.send(`
    <h1>Árbol de mi uni</h1>
    <img src="https://tec.mx/sites/default/files/styles/16_9/public/repositorio/Campus/Guadalajara/JA/galeria/eiad-campus-guadalajara-tec-monterrey.webp?itok=ZURFubR5" alt="Jacaranda mimosifolia en campus" style="width:600px; height:auto;">
    <p>Jacaranda mimosifolia - Común en campuses de TEC, UDG, UP o ITESO en Zapopan.</p>
  `);
});


app.use((req, res) => { //en generals e me hace muy buena herramientaexpress
  res.status(404).send('Ruta no encontrada');
});


//esto me gustó porque senti que se parece un poco a las rutas (que uan vez vi el python en la prepa)
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  
});
