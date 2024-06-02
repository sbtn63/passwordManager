from django.contrib.auth import get_user_model
from cryptography.fernet import Fernet
import base64

def generate_encryption_key():
    return Fernet.generate_key()

def key(encrypted_key):
    clave_bytes = encrypted_key.encode()
    clave_32_bytes = clave_bytes[:32]
    clave_base64 = base64.urlsafe_b64encode(clave_32_bytes)
    return clave_base64

def create_user_with_encryption_key(email, password):
    User = get_user_model()
    encryption_key = generate_encryption_key()
    user = User.objects.create_user(email=email, password=password)
    user.encrypted_key = base64.urlsafe_b64encode(encryption_key).decode('utf-8')
    user.save()
    return user

def encrypt_password_for_user(password, encryption_key):
    cipher_suite = Fernet(encryption_key)
    password_bytes = password.encode('utf-8')
    encrypted_password_bytes = cipher_suite.encrypt(password_bytes)
    return base64.urlsafe_b64encode(encrypted_password_bytes).decode('utf-8')

def decrypt_password_for_user(encrypted_password_str, encryption_key):
    cipher_suite = Fernet(encryption_key)
    decoded_encrypted_password = base64.urlsafe_b64decode(encrypted_password_str.encode('utf-8'))
    decrypted_password_bytes = cipher_suite.decrypt(decoded_encrypted_password)
    return decrypted_password_bytes.decode('utf-8')