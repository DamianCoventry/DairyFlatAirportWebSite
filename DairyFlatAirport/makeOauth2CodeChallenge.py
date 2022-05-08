import base64
import hashlib
import secrets
import string


# https://stackoverflow.com/questions/2257441/random-string-generation-with-upper-case-letters-and-digits/23728630#23728630
def makeCryptographicallySecureString(length):
    return ''.join(secrets.choice(string.ascii_uppercase + string.digits) for _ in range(length))


# https://github.com/oauthlib/oauthlib/blob/b123283ba3d41acb3e787fdf68bd5907972b4bad/oauthlib/oauth2/rfc6749/grant_types/authorization_code.py#L47
def makeOauth2CodeChallenge(s):
    return base64.urlsafe_b64encode(
        hashlib.sha256(s.encode()).digest()
    ).decode().rstrip('=')


code_verifier = makeCryptographicallySecureString(50)
code_challenge = makeOauth2CodeChallenge(code_verifier)

print(f'code_verifier = {code_verifier}\ncode_challenge = {code_challenge}\n')
