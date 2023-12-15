$(document).ready(function() {
    // Cuando se abre el modal de listar cursos
    $('#modalListar').on('show.bs.modal', function() {
        $.ajax({
            url: 'http://127.0.0.1:5000/cursos', 
            type: 'GET',
            success: function(data) {
                var cursos = data.cursos;
                var tablaCursos = $('#tablaCursos');
                tablaCursos.empty(); 
                for (var i = 0; i < cursos.length; i++) {
                    var fila = '<tr><td>' + cursos[i].codigo + '</td><td>' + cursos[i].nombre + '</td><td>' + cursos[i].creditos + '</td></tr>';
                    tablaCursos.append(fila);
                }
            },
            error: function() {
                alert('Hubo un error al obtener los cursos');
            }
        });
    });
});
