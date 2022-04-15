from flask import Flask, request
import requests
import json

app = Flask(__name__)

BASE_API = '/api/1/vehicles'
BASE_AUTH = '/oauth2/v3'
BASE_API_TESLA = 'https://owner-api.teslamotors.com/api/1/vehicles'
BASE_AUTH_TESLA = 'https://auth.tesla.com/oauth2/v3'
TESLA_CLIENT_ID = '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384'
TESLA_CLIENT_SECRET = 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3'

@app.route(BASE_AUTH + '/token', methods=['POST'])
def access_token():
    try:
        data = request.json
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json'
        }
        body = {
            "grant_type": "refresh_token",
            "client_id": "ownerapi",
            "refresh_token": data['refresh_token'],
            "scope": "openid email offline_access"
        }
        res = requests.post(BASE_AUTH_TESLA + '/token', headers=headers, json=body)
        return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API, methods=['GET'])
def get_vehicles():
    auth = request.headers.get('Authorization')
    if auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.get(BASE_API_TESLA, headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>', methods=['GET'])
def get_vehicle(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.get(BASE_API_TESLA + f'/{id}', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/wake_up', methods=['POST'])
def wake_up(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/wake_up', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/vehicle_data', methods=['GET'])
def get_data(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.get(BASE_API_TESLA + f'/{id}/vehicle_data', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/auto_conditioning_start', methods=['POST'])
def start_ac(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/auto_conditioning_start', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/auto_conditioning_stop', methods=['POST'])
def stop_ac(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/auto_conditioning_stop', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/door_lock', methods=['POST'])
def lock_doors(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/door_lock', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/door_unlock', methods=['POST'])
def unlock_doors(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/door_unlock', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/actuate_trunk', methods=['POST'])
def toggle_trunk_or_frunk(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/actuate_trunk', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/set_sentry_mode', methods=['POST'])
def set_sentry_mode(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/set_sentry_mode', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/charge_port_door_open', methods=['POST'])
def open_charge_port(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_port_door_open', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/charge_port_door_close', methods=['POST'])
def close_charge_port(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_port_door_close', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/honk_horn', methods=['POST'])
def honk_horn(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/honk_horn', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/flash_lights', methods=['POST'])
def flash_lights(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/flash_lights', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/remote_start_drive', methods=['POST'])
def remote_start(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/remote_start_drive', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/window_control', methods=['POST'])
def vent_windows(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/window_control', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/set_temps', methods=['POST'])
def set_temp(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/set_temps', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/set_preconditioning_max', methods=['POST'])
def set_pre_ac(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/set_preconditioning_max', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/remote_steering_wheel_heater_request', methods=['POST'])
def set_steering_wheel_heater(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/remote_steering_wheel_heater_request', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

@app.route(BASE_API + '/<id>/command/charge_start', methods=['POST'])
def start_charge(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_start', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/charge_stop', methods=['POST'])
def stop_charge(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_stop', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/charge_standard', methods=['POST'])
def standard_charge(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_standard', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/charge_max_range', methods=['POST'])
def max_range_charge(id):
    auth = request.headers.get('Authorization')
    if id and auth:
        headers = {
            'User-Agent': 'apple_watch/1.0.0',
            'Content-Type': 'application/json',
            'Authorization': auth
        }
        res = requests.post(BASE_API_TESLA + f'/{id}/command/charge_max_range', headers=headers)
        return res.json(), res.status_code
    return '', 404

@app.route(BASE_API + '/<id>/command/set_charge_limit', methods=['POST'])
def set_charge_limit(id):
    try:
        data = request.json
        auth = request.headers.get('Authorization')
        if id and auth:
            headers = {
                'User-Agent': 'apple_watch/1.0.0',
                'Content-Type': 'application/json',
                'Authorization': auth
            }
            res = requests.post(BASE_API_TESLA + f'/{id}/command/set_charge_limit', headers=headers, json=data)
            return res.json(), res.status_code
    except:
        return '', 404

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)