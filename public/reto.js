/*global paginaN paginaT paginaL pagina paginaI paginaLB*/
function jugador(){
  paginaN.style.display = 'block';
  paginaI.style.display = 'none';
}

function sesion(){
  paginaI.style.display = 'none';
  paginaL.style.display = 'block';
}
function tutor(){
  paginaN.style.display = 'none';
  paginaT.style.display = 'block';
}

function anterior(){
  paginaT.style.display = 'none';
  paginaN.style.display = 'block';
}

function ingresar(){
  paginaT.style.display = 'none';
  paginaL.style.display = 'block';
}

function ingresarAqui(){
  paginaT.style.display = 'none';
  paginaL.style.display = 'block';
}

function ingresa(){
  paginaN.style.display = 'none';
  paginaL.style.display = 'block';
}

function registrar(){
  paginaL.style.display = 'none';
  paginaN.style.display = 'block';
}

function leaderboard(){
  paginaN.style.display = 'none';
  paginaL.style.display = 'none';
  paginaI.style.display = 'none';
  paginaT.style.display = 'none';
  paginaLB.style.display = 'block';
}