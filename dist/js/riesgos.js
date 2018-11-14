

function ActualizarRiesgo(){

	table = $('#tabla-datos').DataTable(
    	{
			"drawCallback": function() {
				actualizar.deleteRiesgo();			
				actualizar.updateRiesgo();
			}
    	}
    );

    this.funciones = function (){

    	$('#btn-clear').click(function(){
				$('.form-control').val('');
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

        	var _data = { 	"nombre": _nombre, 
							"descripcion": _descripcion, 
							"tipo": _tipo,
							"costo": _costo,
							"probabilidad" : _probabilidad,
							"nivelRiesgo" : _nivelRiesgo,
							"personaIdentificadora" : _personaIdentificadora,
							"idTipoRiesgo" : _idTipoRiesgo 
						};


        	if ($('#txtId').val().trim() == '' || $('#txtId').val().trim() == null){

        		$.ajax({
					method: "POST",
					url: endPoint + "/riesgos",
					data: JSON.stringify(_data),
					contentType: "application/json",
	            	dataType: "json",
				})
				.done(function(msg) {

					if (msg.codigoRespuesta == '0') {

						alertify.alert("Indra","Se registró correctamente", function(){
						});

						$(':input').val('');

						actualizar.loadRiesgo();
					}
				});

			} else {

				$.ajax({
					method: "PUT",
					url: endPoint + "/riesgos/" + $('#txtId').val(),
					data: JSON.stringify(_data),
					contentType: "application/json",
	            	dataType: "json",
				})
				.done(function(msg) {

					console.log(msg);

					if (msg.codigoRespuesta == '0') {

						alertify.alert("Indra","Se actualizó correctamente", function(){
						});

						$(':input').val('');

						actualizar.loadRiesgo();
					}
				});

			}      	

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

			table.clear().draw();

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

		});

 	}

 	this.updateRiesgo = function (){

 	 	$('.btnEditRow').click(function(e){

 	 		e.preventDefault();
 	 		var _this = $(this);
 	 		
 	 		$.ajax({
				method: "GET",
				url: endPoint + "/riesgos/" + _this.attr('href'),
			})
			.done(function(msg) {

				$('#txtId').val(msg.riesgoId);
				$('#txtNombre').val(msg.nombre);
				$('#txtDescripcion').val(msg.descripcion);
				$('#txtTipo').val(msg.tipo);
				$('#txtCosto').val(msg.costo);
				$('#txtProbabilidad').val(msg.probabilidad);
				$('#txtNivel').val(msg.nivelRiesgo);
				$('#txtIndentificador').val(msg.personaIdentificadora);

				$('html, body').animate({ scrollTop: 0 }, 'fast');				
			}); 	 			 		

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
						url: endPoint + "/riesgos/" + _this.attr('href'),
					})
					.done(function(msg) {

						if (msg.codigoRespuesta=='0'){
							
							 _this.closest('tr').find('a').css('color', '#fff');

							_this.closest('tr')
                            .children()
                            .css('background', '#ed2f5e')
                            .css('color', '#fff')
                            .delay(300)
                            .slideUp(300)
                            .queue(function() {
                                _this.closest('tr').remove().dequeue();
                                table
						        .row(_this.parents('tr'))
						        .remove()
						        .draw();
                            });							

					        //alertify.success('Se eliminó el registro');
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

			
 		}); 
    }

};


var actualizar = new ActualizarRiesgo();