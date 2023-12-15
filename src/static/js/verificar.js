$(document).ready(function() {
    $('#botonBuscar').on('click', function() {
        var codigo = $('#codigoVerificar').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos/' + codigo,
            type: 'GET',
            success: function(data) {
                if (data.curso) {
                    $('#nombreVerificar').val(data.curso.nombre);
                    $('#creditosVerificar').val(data.curso.creditos);
                } else {
                    $('#resultadoVerificar').html('<p>Curso no encontrado</p>');
                }
            },
            error: function() {
                $('#resultadoVerificar').html('<p>Hubo un error al buscar el curso</p>');
            }
        });
    });
});
