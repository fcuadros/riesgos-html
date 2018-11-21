
function ActualizarAlertas(){

	table = $('#tabla-datos').DataTable(
    	{
			"drawCallback": function() {
//				actualizar.updateAlerta();
			}
    	}
    );

    this.funciones = function (){

    	$('#btn-clear').click(function(){
				$('.form-control').val('');
    	});


        $('#btn-registrar').click(function(){

        	var _correo = $('#txtNombre').val();
        	var _tipo =  $('#txtOpcion').val();
        	var _costo =  $('#txtEstado').val();

        	var _data = { 	"correo": _correo, 
							"opcion": _tipo, 
							"estado": _costo
						};


        	if ($('#txtId').val().trim() == '' || $('#txtId').val().trim() == null){

        		$.ajax({
					method: "POST",
					url: endPoint + "/alertas",
					data: JSON.stringify(_data),
					contentType: "application/json",
	            	dataType: "json",
				})
				.done(function(msg) {

					if (msg.codigoRespuesta == '0') {

						alertify.alert("Indra","Se registró correctamente", function(){
						});

						$(':input').val('');

						actualizar.loadAlerta();
					}
				});

			} else {

				$.ajax({
					method: "PUT",
					url: endPoint + "/alertas/" + $('#txtId').val(),
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

    this.loadAlerta = function (){		

		$.ajax({
			method: "GET",
			url: endPoint + "/alertas",
		})
		.done(function(msg) {

			table.clear().draw();

			for(var item in msg) {

				table.row.add([	msg[item].correo, 
								msg[item].opcion, 
								msg[item].estado, 
								msg[item].fechaRegistro,
								msg[item].fechaModificacion,
				]);
			};

			table.draw();

		});

 	}

}
var actualizar = new ActualizarAlertas();