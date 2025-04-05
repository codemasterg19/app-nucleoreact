import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

export default function RegistroScreen({navigation}: any) {

  const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
  
    function Registro() {
  
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          alert("✅ Usuario registrado correctamente");
          navigation.navigate("Login")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          alert("❌ Error al registrar usuario");
          // ..
        });
    }
  return (
    <View style={styles.container}>
    <Text style={styles.title}> Crear Cuenta</Text>
    <Text style={styles.subtitle}>Regístrate para comenzar</Text>

    <TextInput
      placeholder='Correo electrónico'
      style={styles.input}
      onChangeText={setemail}
      value={email}
      keyboardType="email-address"
      autoCapitalize="none"
    />

    <TextInput
      placeholder='Contraseña'
      style={styles.input}
      onChangeText={setpassword}
      value={password}
      secureTextEntry
    />

    <TouchableOpacity style={styles.button} onPress={Registro}>
      <Text style={styles.buttonText}>Registrar Usuario</Text>
    </TouchableOpacity>

    <Text style={styles.loginText}>
      ¿Ya tienes cuenta?{' '}
      <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
        Inicia sesión
      </Text>
    </Text>
  </View>
)
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#f3f4f6',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 24,
},
title: {
  fontSize: 28,
  fontWeight: 'bold',
  marginBottom: 8,
  color: '#1f2937',
},
subtitle: {
  fontSize: 16,
  color: '#6b7280',
  marginBottom: 24,
},
input: {
  width: '100%',
  height: 50,
  backgroundColor: '#fff',
  borderRadius: 8,
  paddingHorizontal: 16,
  borderWidth: 1,
  borderColor: '#d1d5db',
  marginBottom: 16,
},
button: {
  backgroundColor: '#10b981',
  paddingVertical: 14,
  paddingHorizontal: 32,
  borderRadius: 8,
  width: '100%',
  alignItems: 'center',
  marginBottom: 16,
},
buttonText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 16,
},
loginText: {
  color: '#6b7280',
  fontSize: 14,
},
link: {
  color: '#10b981',
  fontWeight: 'bold',
},
})