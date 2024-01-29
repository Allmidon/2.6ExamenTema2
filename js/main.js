// Función para enviar datos mediante XMLHttpRequest
function enviarDatos() {
  var datos = {
    ip: ip ? ip.innerHTML.trim() : "",
    pais: pais ? pais.innerHTML.trim() : "",
    continente: continente ? continente.innerHTML.trim() : "",
    zona_horaria: zona_horaria ? zona_horaria.innerHTML.trim() : ""
  };

  // Agregar condiciones para verificar si el país es "Argentina", "Colombia" o "México"
  var paisLowerCase = datos.pais.toLowerCase();
  console.log(paisLowerCase);

  if (paisLowerCase == "malta") {
    enviarDatosAlPHP("js/insertar.php", datos);
  } else if (paisLowerCase == "colombia") {
    enviarDatosAlPHP("js/insertar2.php", datos);
  } else if (paisLowerCase == "india") {
    enviarDatosAlPHP("js/insertar3.php", datos);
  } else {
    // Mostrar mensaje si el país no es "Argentina", "Colombia" ni "México"
    console.log("El país que usted busca no se puede insertar a la base de datos.");
  }
}

// Función para enviar datos a un archivo PHP específico
function enviarDatosAlPHP(url, datos) {
  var xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
      } else {
        console.error("Error en la solicitud: " + this.status);
      }
    }
  };

  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  // Construir la cadena de datos para enviar
  var datosEnviados = "ip=" + encodeURIComponent(datos.ip) +
                     "&pais=" + encodeURIComponent(datos.pais) +
                     "&continente=" + encodeURIComponent(datos.continente) +
                     "&zona_horaria=" + encodeURIComponent(datos.zona_horaria);

  xhttp.send(datosEnviados);
}

// Resto del código (Función SolicitudAPI y carga al evento LOAD) permanece sin cambios
const SolicitudAPI = () => {
  axios.get("https://itp-bdd-asc-01.000webhostapp.com/php-geoip-api/index.php")
    .then(function (response) {
      console.log(response.data.ip);
      if (ip) ip.innerHTML = response.data.ip;
      if (pais) pais.innerHTML = response.data.pais;
      if (continente) continente.innerHTML = response.data.continente;
      if (zona_horaria) zona_horaria.innerHTML = response.data.zona_horaria;

      // Llamada a la función enviarDatos después de recibir y mostrar los datos
      enviarDatos();
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {
      // Si hay acciones que quieres realizar después de todo, aquí las puedes agregar
    });
};

window.addEventListener('load', SolicitudAPI);