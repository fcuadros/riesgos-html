

function ActualizarRiesgo(){

	table = $('#example1').DataTable(
    		{}
    );

    this.funciones = function (){

    	$('#ss').click(function(){

    		alertify.confirm("js","This is a confirm dialog.",
				function(){
					
				},
				function(){
					alertify.error('Se canceló la acción');
				})
			.set('labels', {ok:'Si', cancel:'No'});

    	});

        $('#btn-registrar').click(function(){

        	var _nombre = $('#txtNombre').val();
        	var _descripcion =  $('#txtDescripcion').val();
        	var _tipo =  $('#txtTipo').val();
        	var _costo =  $('#txtCosto').val();
        	var _probabilidad =  $('#txtProbabilidad').val();
        	var _nivelRiesgo =  $('#txtNivel').val();
        	var _personaIdentificadora =  $('#txtIndentificador').val();
        	var _idTipoRiesgo = 1;

        	var _data = { "nombre": _nombre, 
					"descripcion": _descripcion, 
					"tipo": _tipo,
					"costo": _costo,
					"probabilidad" : _probabilidad,
					"nivelRiesgo" : _nivelRiesgo,
					"personaIdentificadora" : _personaIdentificadora,
					"idTipoRiesgo" : _idTipoRiesgo 
			};

        	$.ajax({
				method: "POST",
				url: endPoint + "/riesgo",
				data: JSON.stringify(_data),
				contentType: "application/json",
            	dataType: "json",
			})
			.done(function(msg) {

				if (msg.codigoRespuesta == '0') {

					alertify.alert("Indra","Se registró correctamente", function(){
					});

					actualizar.loadRiesgo();
				}

				table.draw();		

			});

 		});

    }

    this.loadRiesgo = function (){

    	var _delete = '<a href="params" class="btnActionRow btnDeleteRow" title="delete"><i class="fa fa-trash-o"></i></a>';
        var _edit   = '<a href="params" class="btnActionRow btnEditRow" title="edit"><i class="fa fa-pencil"></i></a>';

		$.ajax({
			method: "GET",
			url: endPoint + "/riesgos",
		})
		.done(function(msg) {

			for(var item in msg) {

				var buttonEdit 	 = _edit.replace("params", msg[item].riesgoId);
	        	var buttonDelete = _delete.replace("params", msg[item].riesgoId);

				table.row.add([	msg[item].nombre, 
								msg[item].descripcion, 
								msg[item].personaIdentificadora, 
								msg[item].probabilidad, 
								msg[item].nivelRiesgo, 
								msg[item].costo, 
								msg[item].fechaRegistro,
								'<p class="text-center">' + buttonEdit + "&nbsp;&nbsp;&nbsp;" + buttonDelete +'</p>'

				]);
			};

			table.draw();

			actualizar.deleteRiesgo();			
			actualizar.updateRiesgo();			

		});

 	}

 	this.updateRiesgo = function (){

 	 	$('.btnEditRow').click(function(e){

 	 		e.preventDefault();
 	 		var _this = $(this);

 	 		var _tr = _this.parents('tr');

 	 		console.log(_tr);


 	 		var _nombre = $(_this).closest('tr').find('td:eq(0)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(1)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(2)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(3)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(4)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(5)').text();
 	 		var _nombre = $(_this).closest('tr').find('td:eq(6)').text();

 	 		console.log(_nombre)

        	var _descripcion =  $('#txtDescripcion').val();
        	var _tipo =  $('#txtTipo').val();
        	var _costo =  $('#txtCosto').val();
        	var _probabilidad =  $('#txtProbabilidad').val();
        	var _nivelRiesgo =  $('#txtNivel').val();
        	var _personaIdentificadora =  $('#txtIndentificador').val();
        	var _idTipoRiesgo = 1;

     //    	var _nombre = $('#txtNombre').val();
     //    	var _descripcion =  $('#txtDescripcion').val();
     //    	var _tipo =  $('#txtTipo').val();
     //    	var _costo =  $('#txtCosto').val();
     //    	var _probabilidad =  $('#txtProbabilidad').val();
     //    	var _nivelRiesgo =  $('#txtNivel').val();
     //    	var _personaIdentificadora =  $('#txtIndentificador').val();
     //    	var _idTipoRiesgo = 1;

 	 			 		

 	 	});

 	}

 	this.deleteRiesgo = function (){

 	 	$('.btnDeleteRow').click(function(e){

 	 		e.preventDefault();
 	 		var _this = $(this);

 	 		alertify.confirm("Indra","Desea eliminar el registro?",
				function(){

					$.ajax({
						method: "DELETE",
						url: endPoint + "/riesgo/" + _this.attr('href'),
					})
					.done(function(msg) {

						if (msg.codigoRespuesta=='0'){
							console.log(msg);
							table
					        .row(_this.parents('tr'))
					        .remove()
					        .draw();
						} else {
							alertify.error('No se pudo eliminar el registro');
						}
						
					});
					
				},
				function(){
					alertify.error('Se canceló la acción');
				})
				.set('labels', {ok:'Si', cancel:'No'});	 		

 	 	});

 	}

}

function VisualizarRiesgo(){

    this.funciones = function (){

		$.ajax({
			method: "POST",
			url: "getTipoRiesgo",
			data: { name: "John", location: "Boston" }
		})
		.done(function( msg ) {
			alert( "Data Saved: " + msg );
		});

    	var revisiones = {
		    "listaRevisiones": [
		        {
		            "codTipoRiesgo": 1,
		            "nombreTipoRiesgo": "Direccion"
		        },
		        {
		            "codTipoRiesgo": 2,
		            "nombreTipoRiesgo": "Operativos"
		        },
		        {
		            "codTipoRiesgo": 3,
		            "nombreTipoRiesgo": "Tecnologia"
		        },
		        {
		            "codTipoRiesgo": 4,
		            "nombreTipoRiesgo": "Financiero"
		        },
		        {
		            "codTipoRiesgo": 5,
		            "nombreTipoRiesgo": "Normativos"
		        },
		        {
		            "codTipoRiesgo": 6,
		            "nombreTipoRiesgo": "Naturales"
		        },
		        {
		            "codTipoRiesgo": 7,
		            "nombreTipoRiesgo": "Pais"
		        },
		        {
		            "codTipoRiesgo": 8,
		            "nombreTipoRiesgo": "Reputacion"
		        },
		        {
		            "codTipoRiesgo": 9,
		            "nombreTipoRiesgo": "Integridad"
		        },
		        {
		            "codTipoRiesgo": 10,
		            "nombreTipoRiesgo": "Recursos Humanos"
		        },
		        {
		            "codTipoRiesgo": 11,
		            "nombreTipoRiesgo": "Sociales"
		        },
		        {
		            "codTipoRiesgo": 12,
		            "nombreTipoRiesgo": "Politicos"
		        }
		    ]
		};

		for(var item in revisiones.listaRevisiones) {

			var _value = revisiones.listaRevisiones[item].codTipoRiesgo;
			var _name = revisiones.listaRevisiones[item].nombreTipoRiesgo;

			$('#tipo').append('<option value="' + _value +'">'+ _name +'</option>')

		};


        $('#btn-calcular').click(function(){


        	$.ajax({
				method: "GET",
				url: endPoint + "/obtenerNumeroRiegosPorNivel?anio=2018&mes=06&tipoRiesgo=0",
			})
			.done(function( msg ) {

				var json = msg;

				var _data = [];

				for(var item in json) {

					var _color;
					var _name = item;
					var _value = json[item];

					switch (_name){
						case 'Bajo':
							_color = '#28a745';
						break;
						case 'Medio':
							_color = '#ffff00';
						break;
						case 'Alto':
							_color = '#dc3545';
						break;

					}


					var _item = { name : _name, y : _value, color : _color}
					_data.push(_item)
				};
				
				Highcharts.chart('container', {
				    chart: {
				        plotBackgroundColor: null,
				        plotBorderWidth: null,
				        plotShadow: false,
				        type: 'pie',
				        options3d: {
				            enabled: true,
				            alpha: 45
				        }
				    },
				    title: {
				        text: 'Total de riesgos por cada nivel'
				    },
				    plotOptions: {
				        pie: {
				            innerSize: 100,
				            depth: 45
				        }
				    },
				    tooltip: {
				        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
				    },
				    series: [{
				        name: 'Riesgos',
				        colorByPoint: true,
				        data: _data
				    }]
				});

			});



     //    	var json = {
					// 	"Bajo" : 2,
					// 	"Medio": 2,
					// 	"Alto": 1
					// };

			
 		}); 
    }

};


var actualizar = new ActualizarRiesgo();