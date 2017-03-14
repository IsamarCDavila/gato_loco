
$(document).ready(init);

var currentSection = null;
var currentGameID;

function init()
{
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
   // $('#btn-nombres').click(onClickBtnJuego);
    
    $('#btn-historial').click(onClickBtnHistorial);
    $('#btn-comentar').click(onClickBtnComentar);
    
    
    
    $('#lista-juegos').on('click','button',onClickBtnItemJuego);
    
    
     

	TweenMax.from($('#saludo h1'), 1, {marginBottom:'0px', ease:Elastic.easeOut});
    
    
}
function onClickBtnItemJuego(){
    var idGame=$(this).parent().data('idgame');
    console.log(idGame);
    //getSingleGame(idGame);
    gotoSection('historial-detalle');
    getComentarios(idGame);
    currentGameID = idGame;
//getSingleGame(idGame);
    
}




function onClickBtnSaludo() {
	gotoSection('nombres');
    //gotoSection('juego');
}





function getSingleGame(_idGame){
    $.ajax({
        url:"http://test-ta.herokuapp.com/games/"+_idGame,
        type:'GET'
    }).success(function(_data){
            console.log(_data);
            //dibujarHistorial(_data);
    });
}

function onClickBtnNombre() {
	gotoSection('juego');
}
function onClickBtnJuego() {
	gotoSection('juego');
    var jugador1=document.getElementById("jugador1");
    var jugador2=document.getElementById("jugador2");
    localStorage.setItem('nombre_1',jugador1.value);
    localStorage.setItem('nombre_2',jugador2.value);
    caremoco(); 
}
function onClickBtnNombre() {
	gotoSection('juego');
}
function onClickBtnHistorial(evt){
    evt.preventDefault();
    gotoSection('historial');
    getHistorial();
    
}

function onClickBtnComentar()
{
    enviarComentario(currentGameID, $('#name').val(), $('#content').val());
    $('#name').val("");
    $('#content').val("");
}
function enviarComentario(_idGame, _name, _content)
{

    $.ajax({

        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        type:'POST',
        data:{comment:{ name:_name, content:_content, game_id:_idGame }}
	}).success(function(_data){
        console.log(_data);
        getComentarios(_idGame);
	});
}



function gotoSection(_identificadorDeSeccion)
{
	currentSection.removeClass('visible');
	var nextSection = $('#'+_identificadorDeSeccion);

	nextSection.addClass('visible');

	//TweenMax.from(nextSection, 1.5, {scale:0.2, opacity:0, ease:Elastic.easeOut});
	currentSection = nextSection;
}

function getHistorial(){
    $.ajax({
        url:"http://test-ta.herokuapp.com/games"
    }).success(function(_data){
            //console.log(_datos);
            dibujarHistorial(_data);
    });
}


function getComentarios(_idGame)
{
	$.ajax({
	url: 'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
	type:'GET'
	}).success(function(_data){
	console.log(_data);
	dibujarComentarios(_data);
	});
}

function dibujarComentarios(_datos)
{
	var lista = $('#lista-comentarios');
	lista.empty();
	for(var i in _datos)
	{
	var html = '<li class="list-group-item">'+_datos[i].name+' dice: <p>'+ _datos[i].content +'</p></li>';
	lista.append(html);
	}
}







function dibujarHistorial(_datos){
    //console.log(_datos);
    var lista=$("#lista-juegos");
    for(var i in _datos){
        //console.log(_datos[i].winner_player);
        //var html='<li class="list-group-item">Ganador: '+_datos[i].winner_player+'</li>';
        //var html='<li data-idgame="'+_datos[i].id+'" class="list-group-item">Ganador: '+_datos[i].winner_player+'</li>';
        //lista.append(html);
        var html = '<li data-idgame="'+ _datos[i].id +'" class="list-group-item">' + _datos[i].winner_player + ' le gano a '+ _datos[i].loser_player +' en ' + _datos[i].number_of_turns_to_win + ' movimientos <button class="btn">Comentar</button></li>';
 	      lista.append(html);
    }
    //lista.html(_datos);
    
}






