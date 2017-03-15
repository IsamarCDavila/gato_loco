$(document).ready(init);

var currentSection = null;
var currentGameId; 

function init()
{
	currentSection = $('#saludo');
	$('#btn-saludo').click(onClickBtnSaludo);
	$('#btn-nombres').click(onClickBtnNombre);
    $('#btn-nombres').click(onClickBtnJuego);
    $('#btn-historial').click(onClickBtnHistorial);
    $('#btn-inicio').click(onClickBtnInicio);
    $('#list-games').on('click','button', onClickBtnItemGame);
    $('#btn-comments').click(onClickBtnComments);

	TweenMax.from($('#saludo h1'), 1, {marginBottom:'0px', ease:Elastic.easeOut});   
}

function onClickBtnSaludo() {
	gotoSection('nombres');    
}

/*function onClickBtnNombre() {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games',
        type:'POST',
          'game': {
            'winner_player': 'Emmanuel',
            'loser_player': 'Irene',
            'number_of_turns_to_win': '8'
          }
    }).success(function(_data){
        console.log('ff');
    }); 
	gotoSection('juego');
}*/
function onClickBtnJuego() {
    /* Permite tener 0 y x en la tabla*/
	
    var jugador1=document.getElementById("jugador1");
    var jugador2=document.getElementById("jugador2");
    localStorage.setItem('nombre_1',jugador1.value);
    localStorage.setItem('nombre_2',jugador2.value);
    
    var request = new XMLHttpRequest();

    request.open('POST', 'http://test-ta.herokuapp.com/games');

    request.setRequestHeader('Content-Type', 'application/json');

    request.onreadystatechange = function () {
      if (this.readyState === 4) {
        console.log('Status:', this.status);
        console.log('Headers:', this.getAllResponseHeaders());
        console.log('Body:', this.responseText);
      }
    };

    var body = {
      'game': {
        'winner_player': jugador1.value,
        'loser_player': jugador2.value,
        'number_of_turns_to_win': '3'
      }
    };

    request.send(JSON.stringify(body));

        caremoco();
        gotoSection('juego');
}
function onClickBtnNombre() {
	gotoSection('juego');
}
function onClickBtnInicio(evt){
    gotoSection('saludo');
}
function onClickBtnHistorial(evt) {
    evt.preventDefault();
    gotoSection("historial");
    getHistorial();
}
function getHistorial(){
    $.ajax({
        url:'http://test-ta.herokuapp.com/games',
    }).success(function(_data){
       /*console.log(_data); */
        drawHistorial(_data);
    });
    //Por defecto ajax es get, para agregar post, se pone Type  
}
function drawHistorial(_datos) {
    var list = $('#list-games');
    for(var i in _datos){
        var html = '<li data-idgame="'+_datos[i].id+'"class="list-group-item">El jugador: '+_datos[i].winner_player +'le hago a '+_datos[i].loser_player+ '<button class="btn">Comentar</button></li>';
        list.append(html);
    }  
}
function onClickBtnItemGame() {
    //alert("Hola");
    var idGame = $(this).parent().data('idgame');
    getSingleGame(idGame);
    gotoSection('comments');
    getComments(idGame);
    currentGameId = idGame;
}
function getSingleGame(_idGame) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame,
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data.id);*/
    });
}
function drawComments(_datos) {
    var list = $("#list-comments");
    list.empty();
    for(var i in _datos){
        
        var html = '<li class="list-group-item">'+_datos[i].name+' dice:<p>'+_datos[i].content+'</p></li>';
        list.append(html);
    }  
}
function getComments(_idGame) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data);*/
        drawComments(_data);
    });
}
function onClickBtnComments() {
    sendComment(currentGameId,$('#name').val(),$('#content').val());
    $('#name').val("");
    $('#content').val("");
}
function sendComment(_idGame,_name,_content) {
    $.ajax({
        url:'http://test-ta.herokuapp.com/games/'+_idGame+'/comments',
        type:'POST',
        data:{comment:
               {name:_name,content:_content,game_id:_idGame}
             },
        //los : indican que lo que se encuentra delante de ellos es un parametro, o [] o {} o ?, parametros opcionales
    }).success(function(_data){
        /*console.log(_data);*/
        getComments(_idGame);
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

/*-----Animacion pra inicio----*/
//Pure JS, completely customizable preloader from GreenSock.
//Once you create an instance like var preloader = new GSPreloader(), call preloader.active(true) to open it, preloader.active(false) to close it, and preloader.active() to get the current status. Only requires TweenLite and CSSPlugin (http://www.greensock.com/gsap/)
var preloader = new GSPreloader({
  radius:42, 
  dotSize:15, 
  dotCount:10, 
  colors:["#61AC27","#555","purple","#FF6600"], //have as many or as few colors as you want.
  boxOpacity:0.2,
  boxBorder:"1px solid #AAA",
  animationOffset: 1.8, //jump 1.8 seconds into the animation for a more active part of the spinning initially (just looks a bit better in my opinion)
});

//open the preloader
preloader.active(true);

//for testing: click the window to toggle open/close the preloader
document.onclick = document.ontouchstart = function() {
  preloader.active( !preloader.active() );
};

//this is the whole preloader class/function
function GSPreloader(options) {
  options = options || {};
  var parent = options.parent || document.body,
      element = this.element = document.createElement("div"),
      radius = options.radius || 42,
      dotSize = options.dotSize || 15,
      animationOffset = options.animationOffset || 1.8, //jumps to a more active part of the animation initially (just looks cooler especially when the preloader isn't displayed for very long)
      createDot = function(rotation) {
          var dot = document.createElement("div");
        element.appendChild(dot);
        TweenLite.set(dot, {width:dotSize, height:dotSize, transformOrigin:(-radius + "px 0px"), x: radius, backgroundColor:colors[colors.length-1], borderRadius:"50%", force3D:true, position:"absolute", rotation:rotation});
        dot.className = options.dotClass || "preloader-dot";
        return dot; 
      }, 
      i = options.dotCount || 10,
      rotationIncrement = 360 / i,
      colors = options.colors || ["#61AC27","black"],
      animation = new TimelineLite({paused:true}),
      dots = [],
      isActive = false,
      box = document.createElement("div"),
      tl, dot, closingAnimation, j;
  colors.push(colors.shift());
  
  //setup background box
  TweenLite.set(box, {width: radius * 2 + 70, height: radius * 2 + 70, borderRadius:"14px", backgroundColor:options.boxColor || "white", border: options.boxBorder || "1px solid #AAA", position:"absolute", xPercent:-50, yPercent:-50, opacity:((options.boxOpacity != null) ? options.boxOpacity : 0.3)});
  box.className = options.boxClass || "preloader-box";
  element.appendChild(box);
  
  parent.appendChild(element);
  TweenLite.set(element, {position:"fixed", top:"45%", left:"50%", perspective:600, overflow:"visible", zIndex:2000});
  animation.from(box, 0.1, {opacity:0, scale:0.1, ease:Power1.easeOut}, animationOffset);
  while (--i > -1) {
    dot = createDot(i * rotationIncrement);
    dots.unshift(dot);
    animation.from(dot, 0.1, {scale:0.01, opacity:0, ease:Power1.easeOut}, animationOffset);
    //tuck the repeating parts of the animation into a nested TimelineMax (the intro shouldn't be repeated)
    tl = new TimelineMax({repeat:-1, repeatDelay:0.25});
    for (j = 0; j < colors.length; j++) {
      tl.to(dot, 2.5, {rotation:"-=360", ease:Power2.easeInOut}, j * 2.9)
        .to(dot, 1.2, {skewX:"+=360", backgroundColor:colors[j], ease:Power2.easeInOut}, 1.6 + 2.9 * j);
    }
    //stagger its placement into the master timeline
    animation.add(tl, i * 0.07);
  }
  if (TweenLite.render) {
    TweenLite.render(); //trigger the from() tweens' lazy-rendering (otherwise it'd take one tick to render everything in the beginning state, thus things may flash on the screen for a moment initially). There are other ways around this, but TweenLite.render() is probably the simplest in this case.
  }
  
  //call preloader.active(true) to open the preloader, preloader.active(false) to close it, or preloader.active() to get the current state.
  this.active = function(show) {
    if (!arguments.length) {
      return isActive;
    }
    if (isActive != show) {
      isActive = show;
      if (closingAnimation) {
        closingAnimation.kill(); //in case the preloader is made active/inactive/active/inactive really fast and there's still a closing animation running, kill it.
      }
      if (isActive) {
        element.style.visibility = "visible";
        TweenLite.set([element, box], {rotation:0});
        animation.play(animationOffset);
      } else {
        closingAnimation = new TimelineLite();
        if (animation.time() < animationOffset + 0.3) {
          animation.pause();
          closingAnimation.to(element, 1, {rotation:-360, ease:Power1.easeInOut}).to(box, 1, {rotation:360, ease:Power1.easeInOut}, 0);
        }
        closingAnimation.staggerTo(dots, 0.3, {scale:0.01, opacity:0, ease:Power1.easeIn, overwrite:false}, 0.05, 0).to(box, 0.4, {opacity:0, scale:0.2, ease:Power2.easeIn, overwrite:false}, 0).call(function() { animation.pause(); closingAnimation = null; }).set(element, {visibility:"hidden"});
      }
    }
    return this;
  };
}
/*-----Animacion pra inicio----*/



