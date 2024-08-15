from datetime import datetime
import firebase_admin
import pyrebase
from firebase_admin import credentials
from firebase_admin import firestore, auth
from flask import Flask, request, jsonify
from flask_cors import CORS
import random
import logging

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

cred = credentials.Certificate("clave.json")
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
        return jsonify({"status": "error", "message": str(e.args[0].response.json()['error']['message'])})

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
            user_ref.set({'cotizaciones': {},'favoritos' : [],'archivados' : []})
              
        # Actualiza el campo 'cotizaciones' con la nueva cotización
        user_ref.update({
            f'cotizaciones.{id_cotizacion}': {'data': cotizacion, 'historial' : [], 'favorito' : False,'archivado' : False} 
        })

        return jsonify({"status": "success", "message": "Cotizacion agregada exitosamente", "cotizacion_id": id_cotizacion})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})
    
@app.route('/data/add_attr', methods=['PUT'])
def add_attr():
    id = request.args.get('id')
    cotizacion = request.args.get('id_cotizacion')
    #Atributo Archivado o Favorito ....
    attr = request.args.get('attr')
    ref = db.collection('usuarios').document(id)
    
    doc = ref.get()

    if doc.exists:
        datos = doc.to_dict().get( f'{attr}s', [])
    else:
        return {'message': 'Error: Usuario no encontrado'}

    if cotizacion not in datos:
        datos.append(cotizacion)
    
    # Actualizar la lista de archivados
    ref.update({
        f'{attr}s': datos
    })

    # Actualizar la propiedad 'Atributo' para la cotización sin sobrescribir el documento
    ref.update({
        f'cotizaciones.{cotizacion}.{attr}': True
    })

    return {'message': 'Éxito'}     

@app.route('/data/show_attr',methods=['GET'])
def show_attr():
    id = request.args.get('id')
    ref = db.collection('usuarios').document(id)    
    #Atributo Archivado o Favorito ....
    attr = request.args.get('attr')
    doc = ref.get()

    if doc.exists:
        datos = doc.to_dict().get(f'{attr}s',[])
    else:
        return ({'message': 'Error'})
    
    return ({f'datos': datos})

@app.route('/data/delete_attr', methods=['DELETE'])
def delete_attr():
    id = request.args.get('id')
    cotizacion = request.args.get('id_cotizacion')
    ref = db.collection('usuarios').document(id)
    #Atributo Archivado o Favorito ....
    attr = request.args.get('attr')
    doc = ref.get()

    if doc.exists:
        datos = doc.to_dict().get(f'{attr}s', [])
    else:
        return {'message': 'Error: Usuario no encontrado'}

    datos.remove(cotizacion)
    
    # Actualizar la lista de datos
    ref.update({
        f'{attr}s': datos
    })

    # Actualizar la propiedad 'atributo' para la cotización sin sobrescribir el documento
    ref.update({
        f'cotizaciones.{cotizacion}.{attr}': False    
    })

    return {'message': 'Éxito'}

@app.route('/data/show_cotizaciones_historial', methods=['GET'])
def show_cotizaciones_historial():
    id = request.args.get('id')
    cotizacion = request.args.get('cotizacion')
    ref = db.collection('usuarios').document(id)
    data = ref.get()
    snapshot = data.to_dict().get('cotizaciones',{})
    cotizaciones = snapshot.get(cotizacion)
    historial = cotizaciones.get('historial', [])
    return jsonify(historial)

@app.route('/data/show_cotizaciones_data', methods=['GET'])
def show_cotizaciones_data():
    id = request.args.get('id')
    cotizacion = request.args.get('cotizacion')
    ref = db.collection('usuarios').document(id)
    data = ref.get()
    snapshot = data.to_dict().get('cotizaciones',{})
    cotizaciones = snapshot.get(cotizacion)
    return jsonify(cotizaciones)

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

@app.route('/data/edit_cotizacion', methods=['PUT'])
def edit_cotizacion():
    try:
        data = request.get_json()
        logging.debug(f"Request data: {data}")

        id_cotizacion = data['id_cotizacion']
        id_usuario = data['id_usuario']
        nuevos_datos = data['datos']

        logging.debug(f"id_cotizacion: {id_cotizacion}, id_usuario: {id_usuario}, nuevos_datos: {nuevos_datos}")

        # Referencia al documento del usuario
        ref_usuario = db.collection('usuarios').document(id_usuario)
        snapshot = ref_usuario.get()

        if not snapshot.exists:
            return jsonify({"error": "El usuario no existe"}), 404

        cotizaciones_map = snapshot.to_dict().get('cotizaciones', {})
        cotizacion = cotizaciones_map.get(id_cotizacion)

        if not cotizacion:
            return jsonify({"error": "La cotización no existe"}), 404

        # Obtener la referencia al mapa 'data' dentro de la cotización específica
        ref_data = cotizacion.get('data', {})

        # Obtener el historial actual o crear uno nuevo si no existe
        historial = cotizacion.get('historial', [])

        # Agregar fecha de cambio a los datos antiguos
        historial.append({
            'fecha_cambio': datetime.utcnow(),  # Fecha y hora actuales en formato UTC
            'data': ref_data
        })

        # Actualizar los datos de la cotización
        cotizacion['data'] = {**ref_data, **nuevos_datos}
        cotizacion['historial'] = historial
        cotizaciones_map[id_cotizacion] = cotizacion

        # Actualizar el documento del usuario
        ref_usuario.update({'cotizaciones': cotizaciones_map})

        logging.debug("Documento de usuario actualizado correctamente")

        return jsonify({"message": "Cotización actualizada exitosamente", "data": nuevos_datos}), 200

    except KeyError as e:
        logging.error(f"Falta el campo requerido: {str(e)}")
        return jsonify({"error": f"Falta el campo requerido: {str(e)}"}), 400
    except Exception as e:
        logging.error(f"Error al actualizar la cotización: {str(e)}", exc_info=True)
        return jsonify({"error": f"Error al actualizar la cotización: {str(e)}"}), 500

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

@app.route('/data/get_catalogo',methods=['GET'])
def get_catalogo():
    catalogo = request.args.get('catalogo')
    ref = db.collection('catalogos').document(catalogo)
    data = ref.get().to_dict()
    return jsonify(data)
    

if __name__ == '__main__':
    app.run(host='192.168.137.1',debug=True)