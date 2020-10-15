// Dependencias y express
var express = require("express"); 
var app = express(); 
var path = require("path"); 
const { allowedNodeEnvironmentFlags } = require("process");
var PORT = 3000; 

app.use(express.urlencoded({extended: true})); 
app.use(express.json()); 

// Mientras el server esté corriendo, cada que se visite la página el contador aumentará 1
var contadorVisitas = 0; 

// Inicializar datos 

var listaEspera = [
    {
        customerName: "Luis Espera", 
        customerEmail: "luis@espera.com",
        customerID: "1", 
        phoneNumber: "111-111-111" 

    }, 
    {
        customerName: "Juan Espera", 
        customerEmail: "juan@espera.com",
        customerID: "2", 
        phoneNumber: "222-222-222" 
    }

]; 

var reservaciones = [
    {
        customerName: "Pepe Reserva", 
        customerEmail: "luis@reserva.com",
        customerID: "3", 
        phoneNumber: "333-333-333" 
    }, 
    {
        customerName: "María Reserva", 
        customerEmail: "maria@reserva.com",
        customerID: "4", 
        phoneNumber: "444-444-444" 
    }
]; 

// Routes POST
app.post("/api/reserve", function(req, res){
    var nuevaReservacion = req.body; 
    var flagDisponible = true; 

    if(reservaciones.length < 5) reservaciones.push(nuevaReservacion);  
    else{
        listaEspera.push(nuevaReservacion); 
        flagDisponible = false; 
    }
    return res.json(flagDisponible); 
}); 

app.post("/api/clearReservations", function(req, res) {
    //Se vacía datos temporales de las reservaciones y lista de espera
    reservaciones = []; 
    listaEspera = []; 
    var taskDone = false; 
    if(reservaciones.length == 0 && listaEspera.length == 0) taskDone = true; 
    return res.json(taskDone); 
});

// Routes GET (Parecido al router de React envía el html que debe aparecer)
app.get("/", function(req, res) {
    contadorVisitas++; 
    res.sendFile(path.join(__dirname, "home.html")); 
});

app.get("/reserve", function(req, res) {
    contadorVisitas++; 
    res.sendFile(path.join(__dirname, "reserve.html")); 
});

app.get("/tables", function(req, res) {
    contadorVisitas++; 
    res.sendFile(path.join(__dirname, "tables.html")); 
}); 

app.get("/api/contadorVisitas", function(req, res) {
    return res.send(contadorVisitas.toString()); 
});

app.get("/api/tables", function(req, res) {
    return res.json(reservaciones);
}); 

app.get("api/waitlist", function(req,res) {
    return res.json(listaEspera); 
})

// Listening 
app.listen(PORT, () => {
    console.log("Server corriendo en el puerto: " +  PORT);
}); 