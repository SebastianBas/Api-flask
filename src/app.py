from flask import Flask, jsonify, request, render_template
from flask_mysqldb import MySQL

app = Flask(__name__)

app.config['MYSQL_HOST']='localhost'
app.config['MYSQL_USER']='root'
app.config['MYSQL_PASSWORD']=''
app.config['MYSQL_DB']='api_flask'

conexion = MySQL(app)

@app.route('/')
def inicio():
    return render_template('index.html')

@app.route('/cursos', methods=['GET'])
def listar_cursos():
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT codigo, nombre, creditos FROM curso"
        cursor.execute(sql)
        datos=cursor.fetchall()
        cursos=[]
        for fila in datos:
            curso={ 'codigo':fila[0], 'nombre':fila[1], 'creditos':fila[2]}
            cursos.append(curso)
        return jsonify({'cursos':cursos, 'mensaje': "Cursos Listados"})
    except Exception as ex:
        return jsonify({ 'Mensaje':"Error"})


@app.route('/cursos/<codigo>', methods=['GET'])
def leer_curso(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "SELECT codigo, nombre, creditos FROM curso WHERE codigo = '{0}'".format(codigo)
        cursor.execute(sql)
        datos=cursor.fetchone()
        if datos != None:
            curso={ 'codigo':datos[0], 'nombre':datos[1], 'creditos':datos[2]}
            return jsonify({'curso':curso, 'mensaje': "Curso Encontrado"})
        else:
            return jsonify({ 'mensaje': "Cursos No encontrado"})

    except Exception as ex:
        return jsonify({ 'Mensaje':"Error"})

@app.route('/cursos', methods=['POST'])
def registrar_curso():
    try:
        codigo = request.json['codigo']
        nombre = request.json['nombre']
        creditos = request.json['creditos']

        # Verificar si el curso ya existe
        cursor = conexion.connection.cursor()
        consulta_existencia = "SELECT * FROM curso WHERE codigo = %s"
        cursor.execute(consulta_existencia, (codigo,))
        curso_existente = cursor.fetchone()

        if curso_existente:
            return jsonify({'mensaje': 'Error: El curso ya existe'}), 400

        sql = "INSERT INTO curso (codigo, nombre, creditos) VALUES (%s, %s, %s)"
        cursor.execute(sql, (codigo, nombre, creditos))
        conexion.connection.commit()

        return jsonify({'mensaje': 'Curso Registrado'})

    except Exception as ex:
        print(ex)  
        return jsonify({'mensaje': 'Error'}), 500


@app.route('/cursos/<codigo>', methods=['DELETE'])
def eliminar_curso(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "DELETE FROM curso WHERE codigo = '{0}'".format(codigo)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Curso Eliminado"})
    except Exception as ex:
        return jsonify({ 'Mensaje':"Error"})

@app.route('/cursos/<codigo>', methods=['PUT'])
def actualizar_curso(codigo):
    try:
        cursor = conexion.connection.cursor()
        sql = "UPDATE curso SET nombre = '{0}', creditos = {1} WHERE codigo = '{2}'".format(request.json['nombre'], request.json['creditos'],codigo)
        cursor.execute(sql)
        conexion.connection.commit()
        return jsonify({'mensaje': "Curso Editado"})
    except Exception as ex:
        return jsonify({ 'Mensaje':"Error"})


    
def pagina_no_encontrada(error):
    return "<h1>La pagina NO EXISTE </h1>", 404

if __name__ == '__main__':
    app.secret_key="sebastian"
    app.register_error_handler(404, pagina_no_encontrada)
    app.run(debug=True)