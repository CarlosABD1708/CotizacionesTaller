import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

config = {
  "apiKey": "AIzaSyDizVAt_otjXOvfFoQOFMVIF-SgsKr4_bU",
  "authDomain": "cotizador-8805c.firebaseapp.com",
  "databaseURL": "https://cotizador-8805c-default-rtdb.firebaseio.com/",
  "projectId": "cotizador-8805c",
  "storageBucket": "cotizador-8805c.appspot.com",
  "messagingSenderId": "303804455786",
  "appId": "1:303804455786:web:0d7cf84af59777b4d86313",
  "measurementId": "G-HYEM2LQ2GB"
}

cred = credentials.Certificate("cotizador-8805c-firebase-adminsdk-nqno7-543cbe083c.json")
firebase_admin.initialize_app(cred)

firebase = pyrebase.initialize_app(config)
auth = firebase.auth()

db = firestore.client()
app = Flask(__name__)
CORS(app, resources={r"/data*": {"origins": "*"}})

@app.route('/data/registro', methods=['POST'])
def registro():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']
        pass2 = data['password2']
        if password != pass2:
            return jsonify({"status": "error", "message": "PASSWORDS_DO_NOT_MATCH"})
        else:
            user = auth.create_user_with_email_and_password(email, password)
            return jsonify({"status": "success", "message": "Usuario creado exitosamente"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e.args[0].response.json()['error']['message'])})

@app.route('/data/login', methods=['POST'])
def login():
    try:
        data = request.get_json()
        email = data['email']
        password = data['password']

        user = auth.sign_in_with_email_and_password(email, password)
        id = firebase_admin.auth.get_user_by_email(email).uid
        return jsonify({"status": "success", "message": "Usuario logueado exitosamente", "id": id})
    except Exception as e:
        return jsonify({"status": "error", "message": 'Errors'})

@app.route('/data/add_cotizacion', methods=['POST'])
def add_cotizacion():
    try:
        data = request.get_json()
        cotizacion = data['datos']
        id_cliente = data['id']

        # Genera un nuevo ID único para la cotización
        id_cotizacion = str(random.randint(1, 1000000000))

        # Referencia al documento del usuario
        user_ref = db.collection(u'usuarios').document(id_cliente)

        # Verifica si el documento del usuario existe
        if not user_ref.get().exists:
            # Si no existe, crea el documento con el campo 'cotizaciones'
            user_ref.set({'cotizaciones': {}})

        # Actualiza el campo 'cotizaciones' con la nueva cotización
        user_ref.update({
            f'cotizaciones.{id_cotizacion}': {'data': cotizacion}
        })

        return jsonify({"status": "success", "message": "Cotizacion agregada exitosamente", "cotizacion_id": id_cotizacion})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route('/data/show_cotizaciones', methods=['GET'])
def show_cotizaciones():
    id = request.args.get('id')
    ref = db.collection('usuarios').document(id)
    data = ref.get().to_dict()
    return jsonify(data)

@app.route('/data/delete_cotizacion', methods=['DELETE'])
def delete_cotizaciones():
    id_user = request.args.get('id_user')
    id_cotizacion = request.args.get('id_cotizacion')

    # Obtén la referencia al documento del usuario
    ref = db.collection('usuarios').document(id_user)

    # Elimina el campo específico del mapa usando la operación 'delete'
    ref.update({
        f'cotizaciones.{id_cotizacion}': firestore.DELETE_FIELD
    })

    return jsonify({'message': 'Cotización eliminada correctamente'})

@app.route('/data/editar_estado', methods=['PUT'])
def editar_estado():
    try:
        id_user = request.args.get('id_user')
        id_cotizacion = request.args.get('id_cotizacion')

        ref = db.collection('usuarios').document(id_user)
        usuario_doc = ref.get()

        if usuario_doc.exists:
            usuario_data = usuario_doc.to_dict()

            if 'cotizaciones' in usuario_data:
                cotizacion_data = usuario_data['cotizaciones'].get(id_cotizacion)

                if cotizacion_data and 'data' in cotizacion_data and 'estado' in cotizacion_data['data']:
                    estado_actual = cotizacion_data['data']['estado']

                    nuevo_estado = 'Listo' if estado_actual == 'Pendiente' else 'Pendiente'

                    ref.update({
                        f'cotizaciones.{id_cotizacion}.data.estado': nuevo_estado
                    })

                    return jsonify({'message': f'Estado actualizado a {nuevo_estado}'})
                else:
                    return jsonify({'error': 'No se encontró la cotización o el campo "data" o "estado" en la cotización'})
            else:
                return jsonify({'error': 'No se encontró el campo "cotizaciones" en el usuario'})
        else:
            return jsonify({'error': 'No se encontró el usuario'})

    except NotFound:
        return jsonify({'error': 'Documento no encontrado'})
    except Exception as e:
        return jsonify({'error': f'Error durante la actualización: {str(e)}'})

@app.route('/data/edit_cotizacion', methods=['PUT'])
def edit_cotizacion():
    try:
        data = request.get_json()
        id_cotizacion = data['id_cotizacion']
        id_usuario = data['id_usuario']
        nuevos_datos = data['datos']
        
        # Referencia al documento del usuario
        ref_usuario = db.collection('usuarios').document(id_usuario)

        # Obtener el mapa de cotizaciones del documento del usuario
        cotizaciones_map = ref_usuario.get().to_dict().get('cotizaciones', {})

        # Verificar si la cotización existe en el mapa
        if id_cotizacion not in cotizaciones_map:
            return jsonify({"error": "La cotización no existe"})

        # Obtener la referencia al mapa 'data' dentro de la cotización específica
        ref_data = cotizaciones_map[id_cotizacion].get('data', {})

        # Actualizar los datos de la cotización
        cotizaciones_map[id_cotizacion]['data'] = {**ref_data, **nuevos_datos}
        ref_usuario.update({'cotizaciones': cotizaciones_map})

        return jsonify({"data": nuevos_datos})

    except Exception as e:
        return jsonify({"error": str(e)})
    

if __name__ == '__main__':
    app.run(debug=True)