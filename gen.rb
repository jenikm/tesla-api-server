require "date"
require "base64"

require "faraday"
require "faraday_middleware"

code_verifier = rand(36**86).to_s(36)
code_challenge = Base64.urlsafe_encode64(Digest::SHA256.hexdigest(code_verifier))
state = rand(36**20).to_s(36)
print(code_verifier)
print("\n")
print(code_challenge)
print("\n")
print(state)
print("\n")
test = "https://auth.tesla.com/oauth2/v3/authorize?redirect_uri=https://auth.tesla.com/void/callback&response_type=code&client_id=ownerapi&scope=offline_access+openid+email&code_challenge="+code_challenge+"&code_challenge_method=S256"
print(test)
print("\n")
