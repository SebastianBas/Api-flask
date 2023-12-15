$(document).ready(function() {
    // Cuando se hace clic en el botón "Buscar"
    $('#botonBuscarActualizar').on('click', function() {
        var codigo = $('#codigoActualizar').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos/' + codigo,
            type: 'GET',
            success: function(data) {
                if (data.curso) {
                    $('#nombreActualizar').val(data.curso.nombre);
                    $('#creditosActualizar').val(data.curso.creditos);
                } else {
                    alert('Curso no encontrado');
                }
            },
            error: function() {
                alert('Hubo un error al buscar el curso');
            }
        });
    });

    // Cuando se hace clic en el botón "Actualizar"
    $('#botonActualizar').on('click', function() {
        var codigo = $('#codigoActualizar').val();
        var nombre = $('#nombreActualizar').val();
        var creditos = $('#creditosActualizar').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos/' + codigo,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify({ nombre: nombre, creditos: creditos }),
            success: function(data) {
                alert('Curso actualizado exitosamente');
                $('#modalActualizar').modal('hide'); // Cerrar el modal
            },
            error: function() {
                alert('Hubo un error al actualizar el curso');
            }
        });
    });
});
