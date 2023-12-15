$(document).ready(function() {
    $('#botonEliminar').on('click', function() {
        var codigo = $('#codigoEliminar').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos/' + codigo,
            type: 'DELETE',
            success: function(data) {
                alert('Curso eliminado exitosamente');
                $('#modalEliminar').modal('hide'); // Cerrar el modal
            },
            error: function() {
                alert('Hubo un error al eliminar el curso');
            }
        });
    });
});
