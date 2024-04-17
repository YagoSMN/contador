$(document).ready(function() {
  $("#text").mask("00:00:00");
})

var clock;
var contador;
var hasInitialized = false;

function timer(e) {
  e.preventDefault();

  if(hasInitialized){
    clearInterval(clock);
    hasInitialized = false;
    $('input[type="submit"]').css("background-color", "blueviolet").val("START");
    $("#finish").show("slow");
    return;
  }
  if(parseInt($("#text").val().substring(0, 2)) > 60) return alert("Insira horas válidas! < 60");  
  if(parseInt($("#text").val().substring(3, 5)) > 60) return alert("Insira minutos válidos! < 60");
  if(parseInt($("#text").val().substring(6, 8)) > 60) return alert("Insira segundos válidos! < 60");

  contador = (parseInt($("#text").val().substring(0, 2)) * 3600) + (parseInt($("#text").val().substring(3, 5)) * 60) + parseInt($("#text").val().substring(6, 8));
  if(!contador) return alert("Insira um tempo válido");
  $('input[type="submit"]').css("background-color", "red").val("STOP");
  hasInitialized = true;

  clock = setInterval(function() {
    contador--;
    $("#text").val(formatarHora(contador));
    if (contador <= 0) {
      clearInterval(clock);
      alert("FINISHED");
      $('input[type="submit"]').css("background-color", "blueviolet").val("START");
    }
  }, 1000);
}

function stopTimer(){
  var result = confirm("Are you sure?");
  if(!result) return;
  clearInterval(clock);
  $("#text").val("");
  $("#finish").hide("slow");
}


function formatarHora(segundos) {
  var hora = Math.floor(segundos / 3600);
  var minutos = Math.floor((segundos % 3600) / 60);
  var segundo = segundos % 60;
  var horaFormatada = hora < 10 ? "0" + hora : hora;
  var minutosFormatados = minutos < 10 ? "0" + minutos : minutos;
  var segundoFormatado = segundo < 10 ? "0" + segundo : segundo;

  return `${horaFormatada}:${minutosFormatados}:${segundoFormatado}`;
}
