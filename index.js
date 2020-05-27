var body = document.querySelector("body");
var table = document.createElement("table");
var btnOrdenarA = document.querySelector(".btn__ordenaA");
var btnOrdenarB = document.querySelector(".btn__ordenaB");
var selecciona = document.querySelector(".selecciona");
let arregloDeLista;
let celda;
let fila;
let dato;
var coseno1 = document.querySelector(".coseno1");
var coseno2 = document.querySelector(".coseno2");
var similHTML = document.querySelector(".similitud");
var A1, B1;
var A2, B2;
var A3, B3;
var puntop;
var magnitud;
var magnitudA;
var magnitudB;
var ejecutar = document.querySelector(".ejecutar");
var similitud;

//Cargar el archivo
$.ajax({
  url: "/respuestas.csv",
  dataType: "text"
}).done(successFunction);

function successFunction(data) {
  //Division por saltos de linea
  var datosFila = data.split("\n");
  //Arreglo donde se guarda la nueva información
  var informacion = [];


  for (let index = 0; index < datosFila.length; index++) {
    //Lectura de una linea
    let dataLinea = datosFila[index];

    //Creacion de fila Crea la tabla
    fila = document.createElement("tr");

    //Division por ;
    arregloDeLista = dataLinea.split(";");

    nombre = arregloDeLista[1];
    celdaName = document.createElement("td");
    celdaName.innerHTML = nombre;
    fila.appendChild(celdaName);

    for (let indice = 29; indice < 34; indice++) {
      //Lectura de celda
      let dataCelda = arregloDeLista[indice];

      celda = document.createElement("td");
      celda.innerHTML = dataCelda;

      fila.appendChild(celda);
    }

    table.appendChild(fila);
    //AQUI SE LE AGREGAN POSICIONES
    informacion.push({ name: arregloDeLista[1], color: arregloDeLista[29], sabor: arregloDeLista[30], grado: parseInt(arregloDeLista[31]), dinero: parseInt(arregloDeLista[32]),situacion: arregloDeLista[33]  });

  }


  let aaaa = {
    data: 1,
  }
  //console.log("Archivo Original");

  for (let indice = 0; indice < informacion.length; indice++) {
    dato = document.createElement("option");
    dato2 = document.createElement("option");
    dato.innerHTML = informacion[indice].name;
    dato2.innerHTML = informacion[indice].name;
    dato.value = "" + informacion[indice].name + "|" + informacion[indice].color  + "|" + informacion[indice].grado + "|" + informacion[indice].dinero+ "|" + informacion[indice].situacion;
    dato2.value = "" + informacion[indice].name + "|" + informacion[indice].color  + "|" + informacion[indice].grado + "|" + informacion[indice].dinero+ "|" + informacion[indice].situacion;

    coseno1.appendChild(dato);
    coseno2.appendChild(dato2);
  }

  console.log(informacion);
  btnOrdenarA.addEventListener('click', ordenarA);

  btnOrdenarB.addEventListener('click', ordenarB);

  function funcionCoseno() {
    //console.log(dato.value);

    if (coseno1.value && coseno2.value) {
      var AX = coseno1.value.split("|");
      A1 = AX[0];
      A2 = AX[1];
      A3 = AX[2];
      console.log("A1: " + A1);
      console.log("A2: " + A2);
      console.log("A2: " + A3);

      var BX = coseno2.value.split("|");
      B1 = BX[0];
      B2 = BX[1];
      B3 = BX[2];
      console.log("B1: " + B1);
      console.log("B2: " + B2);
      console.log("B2: " + B3);
    }

    if (A1 && A2 && A3 && B1 && B2 && B3) {
        puntop= (A1*B1) + (A2*B2) + (A3*B3);
        console.log("Punto P: "+puntop);

        magnitudA= Math.sqrt( Math.pow(A1,2) +  Math.pow(A2,2) + Math.pow(A3,2));
        console.log("Magnitud A: "+magnitudA);

        magnitudB= Math.sqrt( Math.pow(B1,2) +  Math.pow(B2,2) + Math.pow(B3,2));
        console.log("Magnitud B: "+magnitudB);
        
        magnitud= magnitudA*magnitudB;
        console.log("Magnitud: "+magnitud);
    }

    if(magnitud){
      similitud= puntop/magnitud;
      console.log("Similitud: "+similitud);
    }
 
  }

function ejecutarSimilitud (){
  if(similitud && (coseno1.value !== coseno2.value) ){
    var resultado = parseInt(similitud*100);
    similHTML.innerHTML = "Similitud: "+resultado+"%";
  } else{
    similHTML.innerHTML = "Similitud: 100%";
  }

}

  ejecutar.addEventListener('click', ejecutarSimilitud);

  coseno1.addEventListener("change", funcionCoseno);
  coseno2.addEventListener("change", funcionCoseno);


  function ordenarA() {
    if (selecciona.value === "grado") {
      console.log("Participantes ordenado de forma Ascendente");
      informacion.sort(function (objetoA, objetoB) {

        //Ordenar por ID
        return objetoA.grado - objetoB.grado;


      });
      
      console.log(informacion);
   
    }
    else if (selecciona.value === "color") {
      console.log("color ordenado de forma Ascendente");
      informacion.sort(function (objetoA, objetoB) {

        //Ordenar por ID
        return objetoA.color - objetoB.color;


      });
     
      console.log(informacion);


    }
    else if (selecciona.value === "sabor") {
      console.log("Columna B ordenado de forma Ascendente");
      informacion.sort(function (objetoA, objetoB) {

        //Ordenar por ID
        return objetoA.sabor - objetoB.sabor;


      });
      console.log(informacion);
    }

  }


  function ordenarB() {
    if (selecciona.value === "grado") {
      console.log("Grado ordenado de forma Descendente");
      informacion.sort(function (objetoB, objetoA) {

        //Ordenar por ID

        return objetoA.grado - objetoB.grado;


      });

      console.log(informacion);

    }
    else if (selecciona.value === "sabor") {
      console.log("Columna A ordenado de forma Descendente");
      informacion.sort(function (objetoB, objetoA) {

        //Ordenar por ID
        return objetoA.sabor - objetoB.sabor;


      });
      console.log(informacion);

    }
    else if (selecciona.value === "color") {
      console.log("Columna B ordenado de forma Descendente");
      informacion.sort(function (objetoB, objetoA) {

        //Ordenar por ID
        return objetoA.color - objetoB.color;


      });
      console.log(informacion);
    }

  }

  body.appendChild(table);

}
