

var _actualizarRiesgo = new ActualizarRiesgo();
var _actualizarControl = new ActualizarControl();

function ActualizarRiesgo(){

	table = $('#tabla-datos').DataTable(
    	{
    		"order": [[ 6, "desc" ]],
			"drawCallback": function() {
				_actualizarRiesgo.deleteRiesgo();			
				_actualizarRiesgo.updateRiesgo();
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

        		if (_nombre=="" || _descripcion=="" || _tipo=="" || _costo=="" || _probabilidad=="" || _nivelRiesgo=="" || _personaIdentificadora=="" || _idTipoRiesgo==""){
        			alertify.alert("Indra","Completar los campos obligatorios", function(){
					});
					return;
        		}

        		$.ajax({
					method: "POST",
					url: endPoint + "/riesgos",
					data: JSON.stringify(_data),
					contentType: "application/json",
	            	dataType: "json",
				})
				.done(function(msg) {

					if (msg.codigoRespuesta == '0') {

						alertify.alert("Indra","Se registró el riesgo correctamente", function(){
						});

						$(':input').val('');

						_actualizarRiesgo.loadRiesgo();
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

						alertify.alert("Indra","Se actualizó el riesgo correctamente", function(){
						});

						$(':input').val('');

						_actualizarRiesgo.loadRiesgo();
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

function ActualizarControl(){

	table = $('#tabla-datos').DataTable(
    	{
    		"order": [[ 0, "desc" ]],
			"drawCallback": function() {
				_actualizarControl.deleteControl();			
				_actualizarControl.updateControl();
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
					url: endPoint + "/controles",
					data: JSON.stringify(_data),
					contentType: "application/json",
	            	dataType: "json",
				})
				.done(function(msg) {

					if (msg.codigoRespuesta == '0') {

						alertify.alert("Indra","Se registró correctamente", function(){
						});

						$(':input').val('');

						_actualizarControl.loadRiesgo();
					}
				});

			} else {

				$.ajax({
					method: "PUT",
					url: endPoint + "/controles/" + $('#txtId').val(),
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

						_actualizarControl.loadRiesgo();
					}
				});

			}      	

 		});

    }

    this.loadControles = function (){		

    	var _delete = '<a href="params" class="btnActionRow btnDeleteRow" title="delete"><i class="fa fa-trash-o"></i></a>';
        var _edit   = '<a href="params" class="btnActionRow btnEditRow" title="edit"><i class="fa fa-pencil"></i></a>';

		$.ajax({
			method: "GET",
			url: endPoint + "/controles",
		})
		.done(function(msg) {

			table.clear().draw();

			for(var item in msg) {

				var buttonEdit 	 = _edit.replace("params", msg[item].idControl);
	        	var buttonDelete = _delete.replace("params", msg[item].idControl);

				table.row.add([	msg[item].descripcion, 
								msg[item].responsable, 
								msg[item].costo, 
								msg[item].fechaImplementacion, 
								msg[item].estadoImplementacion,								
								'<p class="text-center">' + buttonEdit + "&nbsp;&nbsp;&nbsp;" + buttonDelete +'</p>'

				]);
			};

			table.draw();

		});

 	}

 	this.updateControl = function (){

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

 	this.deleteControl = function (){

 	 	$('.btnDeleteRow').click(function(e){

 	 		e.preventDefault();
 	 		var _this = $(this);

 	 		alertify.confirm("Indra","Desea eliminar el registro?",
				function(){

					$.ajax({
						method: "DELETE",
						url: endPoint + "/controles/" + _this.attr('href'),
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

function VisualizarRiesgoPorNivel(){

    this.funciones = function (){

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

			$('#cboTipo').append('<option value="' + _value +'">'+ _name +'</option>')

		};


        $('#btn-calcular').click(function(){

        	var cboAnio = $('#cboAnio').val();
        	var cboMes = $('#cboMes').val();
        	var cboTipo = $('#cboTipo').val();

        	$.ajax({
				method: "GET",
				url: endPoint + "/riesgos/obtenerNumeroRiegosPorNivel?anio=" + cboAnio + "&mes="+ cboMes +"&tipoRiesgo=" + cboTipo,
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

function SimularRiesgo(){

    this.funciones = function (){		


        $('#btn-calcular').click(function(){

        	var cantidad = $('#txtIteraciones').val();

        	if (cantidad == 0 || cantidad == '') {

        		alertify.alert("Indra","Debe ingresar un numero", function(){
        			return;
				});
        	} else {

        		$.ajax({
					method: "POST",
					url: endPoint + "/riesgos/simulacion/" + cantidad,
				})
				.done(function( msg ) {

					console.log(msg)

					var json = msg;

					var _data = [];

					for(var item in json.perdida) {

						var _item = json.perdida[item];
						_data.push(_item)

					};

					$('#divPromedio').show();

					$('#txtDesviacion').html(msg.desvEstandar);
					$('#txtPromedio').html(msg.promedio);

					
					var chart = new Highcharts.Chart({
					    chart: {
					        renderTo: 'container',
					        type: 'column',
					        options3d: {
					            enabled: true,
					            alpha: 15,
					            beta: 15,
					            depth: 50,
					            viewDistance: 25
					        }
					    },
					    title: {
					        text: 'Simulación'
					    },
					    plotOptions: {
					        column: {
					            depth: 25
					        }
					    },
					    series: [{
					        data: _data
					    }]
					});

				});

        	}        	

			
 		}); 
    }

};

function VisualizarRiesgoSinControl(){

    this.funciones = function (){    	

        $('#btn-calcular').click(function(){

        	var cboAnio = $('#cboAnio').val();

        	$.ajax({
				method: "GET",
				url: endPoint + "/riesgos/obtenerDashboardRiesgosControl?anio=" + cboAnio ,
			})
			.done(function( msg ) {

				var total_titulo = msg[0].name;
				var total_data = msg[0].data;
				var total_color = msg[0].color;

				var sinControl_titulo = msg[1].name;
				var sinControl_data = msg[1].data;
				var sinControl_color = msg[1].color;

				Highcharts.chart('container', {
				    chart: {
				        type: 'areaspline'
				    },
				    title: {
				        text: 'Conteo de riesgos'
				    },
				    legend: {
				        layout: 'vertical',
				        align: 'left',
				        verticalAlign: 'top',
				        x: 150,
				        y: 100,
				        floating: true,
				        borderWidth: 1,
				        backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'
				    },
				    xAxis: {
				        categories: [
				            'Enero',
				            'Febrero',
				            'Marzo',
				            'Abril',
				            'Mayo',
				            'Junio',
				            'Julio',
				            'Agosto',
				            'Septiembre',
				            'Octubre',
				            'Noviembre',
				            'Diciembre'
				        ],
				        plotBands: [{ // visualize the weekend
				            from: 4.5,
				            to: 6.5,
				            color: 'rgba(68, 170, 213, .2)'
				        }]
				    },
				    yAxis: {
				        title: {
				            text: 'Cantidad de riesgos'
				        }
				    },
				    tooltip: {
				        shared: true,
				        valueSuffix: ' unidad(es)'
				    },
				    credits: {
				        enabled: false
				    },
				    plotOptions: {
				        areaspline: {
				            fillOpacity: 0.5
				        }
				    },
				    series: [{
				        name: total_titulo,
				        data: total_data
				    }, {
				        name: sinControl_titulo,
				        data: sinControl_data,
				        color: sinControl_color
				    }]
				   
				});				

			});

			
 		}); 
    }

};