var turno ="x";
var turno2="o";
var bandera=1;
var ban=false;
var opciones=new Array(9);

function caremoco(){
    // random
oli=localStorage.getItem("nombre_1",jugador1);
chaujj=localStorage.getItem("nombre_2",jugador2);

var moco=Math.floor((Math.random()*2));
if(moco==0){
    document.getElementById("div_turno").innerHTML="turno del jugador "+ oli;
}else{
    document.getElementById("div_turno").innerHTML="turno del jugador "+ chaujj;
}
}



function marcar (id){
   
    
   var celda =document.getElementById(id);
   if (bandera%2!=0 &&opciones[id]!=0)
       {
           celda.value=turno;
           document.getElementById("div_turno").innerHTML="turno del jugador "+ oli;
           opciones[id]=1;
           
       }else if(bandera%2==0 && opciones[id]!=1){
           
           celda.value=turno2;
           document.getElementById("div_turno").innerHTML="turno del jugador "+ chaujj;
           opciones[id]=0;
       }
           bandera++;
           jugadorx(1);
           jugadorx(0);
}

function jugadorx(_option){
   if (opciones[1]==_option && opciones [2]==_option &&opciones[3]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[4]==_option && opciones [5]==_option &&opciones[6]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[7]==_option && opciones [8]==_option &&opciones[9]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[1]==_option && opciones [5]==_option &&opciones[9]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[3]==_option && opciones [5]==_option &&opciones[7]==_option){
       alert("felicidades jugador ganaste" + turno+ " ganaste");
   }else if (opciones[1]==_option && opciones [4]==_option &&opciones[7]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[2]==_option && opciones [5]==_option &&opciones[8]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }else if (opciones[3]==_option && opciones [6]==_option &&opciones[9]==_option){
       alert("felicidades jugador ganaste" +turno+"ganaste");
   }
}

   
function reiniciar(){
   location.reload();
} 

    
    
    
    
    
    
    
    