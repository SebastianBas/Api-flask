$(document).ready(function() {
    $('#modalRegistrar .btn-primary').on('click', function() {
        var codigo = $('#codigo').val();
        var nombre = $('#nombre').val();
        var creditos = $('#creditos').val();
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos', 
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ codigo: codigo, nombre: nombre, creditos: creditos }),
            success: function(data) {
                alert('Curso registrado exitosamente');
                $('#modalRegistrar').modal('hide');
            },
            error: function() {
                alert('Hubo un error al registrar el curso');
            }
        });
    });
});
