var IconMsj  = "<b class='dark-gray'> <span class='fa-stack fa-lg'> <i class='fa fa-square-o fa-stack-2x'></i> <i class='fa fa-exclamation fa-stack-1x'></i> </span> ATENCIÓN </b>";
var IconInfo = "<b class='dark-gray'> <span class='fa-stack fa-lg'> <i class='fa fa-square-o fa-stack-2x'></i> <i class='fa fa-info fa-stack-1x'></i> </span> ATENCIÓN </b>";
var Iconload = ["<i class='fa fa-spinner fa-spin'></i>","<i class='fa fa-spinner fa-3x fa-spin'></i>","<i class='fa fa-circle-o-notch fa-3x fa-spin'></i>","<img src='dist/img/loader.gif'>"];
//
function alertWindow(str){
 bootbox.alert(IconMsj + " <br/> <span class='dark-gray'>"+str+"</span>", function(result) {
 });
}

function getModule(id){
 switch(parseInt(id)){
  case 1:
   $("#div-content").load('pages/estimar.html');
   break;
  case 2: 
   $("#div-content").load('pages/indicador.html');
   getInfo('opc_rol');  
   listCheck('div-ind');
   break;
  case 3:
   $("#div-content").load('pages/auditoria.html');
   break; 
  case 4:
   $("#div-content").load('pages/cambios.html');
   break;
  case 5:
   $("#div-content").load('pages/portafolio.html');
   break;
  case 6:
   $("#div-content").load('pages/riesgo.html');
   break; 
  case 61:
   $("#div-content").load('pages/riesgo-calcular_riesgo.html');
   break; 
  case 62:
   $("#div-content").load('pages/riesgo-proyeccion_riesgo.html');
   break; 
  case 63:
   $("#div-content").load('pages/riesgo-actualizar_riesgo.html');
   break; 
  case 64:
   $("#div-content").load('pages/riesgo-actualizar_control.html');
   break; 
  case 65:
   $("#div-content").load('pages/riesgo-visualizar_riesgo_nivel.html');
   break;
  case 66:
  $("#div-content").load('pages/riesgo-simular-viabilidad-proyecto.html');
   break;
  case 67:
  $("#div-content").load('pages/riesgo-gestor-alertas.html');
   break;
  default: 
   $("#div-content").html('');
   break;  
 }
}

function getMenu(){
 var str = '' ;
 $('#sidebar-menu').html('');
 $.getJSON("json/menu.json", function(data) {
  for(var datos in data.module){
   str += getOptions(data.module[datos]);
  }
  str = '<li class="header">MENU</li>'+str+'<li class="header">&nbsp;</li>';
  $('#sidebar-menu').html(str);
 }); 
}

function getOptions(data){
 var icon = '<span class="pull-right-container"> <i class="fa fa-angle-left pull-right"></i></span>'; 
 var str  = (data.options ?  icon : '');
 var atr  = ''; var ul1  = ''; var ul2  = ''; var li2 = ''; 
 //
 if(data.id){
  atr =' id="'+data.id+'" onclick="getModule(this.id);" ';
 }
 var li1  = '<a href="#"'+atr+'> <i class="'+ data.icon +'"></i><span>'+ data.description +'</span>'+ str +'</a>';
 //
 if(data.options){
  var li3 = '';
  for(var index1 in data.options){
   var ul3 =''; str =  ''; 
   if(data.options[index1].id){
    atr =' id="'+data.options[index1].id+'" onclick="getModule(this.id);" ';
   }
   if(data.options[index1].options){
    str = icon;
    for(var index2 in data.options[index1].options){
     li3 += getOptions(data.options[index1].options[index2]);  
    }
    ul3 = '<ul class="treeview-menu">'+ li3 +'</ul>'; 
   }
   li2 += '<li class="treeview"><a href="#"'+atr+'><i class="'+data.options[index1].icon +'"></i>'+data.options[index1].description+ str +'</a>'+ ul3 +'</li>';
  } 
  ul2 = '<ul class="treeview-menu">'+ li2 +'</ul>'; 
 }    
 ul1 += '<li class="treeview">'+ li1 + ul2 +'</li>'; 

 return ul1;
}

