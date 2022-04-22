import base64
import string
import random
import hashlib

code_verifier = ''.join(random.choices(string.ascii_lowercase + string.digits, k=86))
m = hashlib.sha256()
m.update(code_verifier.encode())
code_challenge = base64.urlsafe_b64encode(m.hexdigest().encode())
state = ''.join(random.choices(string.ascii_lowercase + string.digits, k=20))
url = 'https://auth.tesla.com/oauth2/v3/authorize?redirect_uri=https://auth.tesla.com/void/callback&response_type=code&client_id=ownerapi&scope=offline_access+openid+email&code_challenge='+code_challenge.decode()+'&code_challenge_method=S256'

print('code_verifier: ' + code_verifier)
print('code_challenge: ' + code_challenge.decode())
print('state: ' + state)
print('Visit the following link:')
print(url)

# curl -X POST -k -H 'Content-Type: application/json' -i 'https://auth.tesla.com/oauth2/v3/token' --data '{
#   "grant_type": "authorization_code",
#   "client_id": "ownerapi",
#   "code": "",
#   "code_verifier": code_verifier,
#   "redirect_uri": "https://auth.tesla.com/void/callback"
# }'