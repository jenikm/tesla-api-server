from flask import Flask, request
import requests

app = Flask(__name__)

BASE_API = '/api/1/vehicles'
BASE_AUTH = '/oauth2/v3'
BASE_API_TESLA = 'https://owner-api.teslamotors.com/api/1/vehicles/'
BASE_AUTH_TESLA = 'https://auth.tesla.com/oauth2/v3/'
TESLA_CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384'
TESLA_CLIENT_SECRET = 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3'

@app.route(BASE_AUTH + '/refresh', methods=['POST'])
def refresh_token():
    
    return 'test'

@app.route(BASE_AUTH + '/token', methods=['POST'])
def access_token():
    res = requests.post(BASE_AUTH_TESLA)
    print(res.text)
    return 'res'

@app.route(BASE_API, methods=['GET'])
def vehicles():
    
    return 'test'

@app.route(BASE_API + '/<id>', methods=['GET'])
def vehicle(id):
    print(id)
    return 'test'

@app.route(BASE_API + '/<id>/vehicle_data', methods=['GET'])
def data(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/wake_up', methods=['POST'])
def wake_up(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/command/auto_conditioning_start', methods=['POST'])
def start_ac(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/command/auto_conditioning_stop', methods=['POST'])
def stop_ac(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/command/door_lock', methods=['POST'])
def lock_doors(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/command/door_unlock', methods=['POST'])
def unlock_doors(id):
    
    return 'test'

@app.route(BASE_API + '/<id>/command/actuate_trunk', methods=['POST'])
def toggle_trunk_or_frunk(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/set_sentry_mode', methods=['POST'])
def set_sentry_mode(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/charge_port_door_open', methods=['POST'])
def open_charge_port(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/charge_port_door_close', methods=['POST'])
def close_charge_port(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/honk_horn', methods=['POST'])
def honk_horn(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/flash_lights', methods=['POST'])
def flash_lights(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/remote_start_drive', methods=['POST'])
def remote_start(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/window_control', methods=['POST'])
def vent_windows(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/set_temps', methods=['POST'])
def setTemp(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/set_preconditioning_max', methods=['POST'])
def set_pre_ac(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/remote_steering_wheel_heater_request', methods=['POST'])
def setSteeringWheelHeater(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

@app.route(BASE_API + '/<id>/command/charge_start', methods=['POST'])
def start_charge(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/charge_stop', methods=['POST'])
def stop_charge(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/charge_standard', methods=['POST'])
def standard_charge(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/charge_max_range', methods=['POST'])
def max_range_charge(id):
    return 'test'

@app.route(BASE_API + '/<id>/command/set_charge_limit', methods=['POST'])
def set_charge_limit(id):
    data = request.data.decode()
    print(data)
    auth = request.headers.get('Authorization')
    if data and auth:
        print(auth)
        return 'test'
    else:
        return None, 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)