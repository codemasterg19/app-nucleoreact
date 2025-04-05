import { Alert, Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/config';

export default function WelcomeScreen({navigation}: any) {

  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")


  
  function Login() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    Alert.alert(
      "Correo inválido",
      "Por favor, ingresa un correo electrónico válido (ejemplo@correo.com).",
      [{ text: "Entendido" }]
    );
    return;
  }

  if (password.length < 6) {
    Alert.alert(
      "Contraseña inválida",
      "La contraseña debe tener al menos 6 caracteres.",
      [{ text: "Ok" }]
    );
    return;
  }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        Alert.alert(
          "Sesión iniciada",
          "Bienvenido nuevamente.",
          [{ text: "Continuar" }]
        );
        navigation.navigate("Tab")
        //console.log(user.uid)

        // ...
      })
      .catch((error) => {
        Alert.alert(
          "Error al iniciar sesión",
          "El correo o la contraseña son incorrectos. Intenta de nuevo.",
          [{ text: "Reintentar" }]
        );
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
  return (
    <View style={styles.container}>
    <Text style={styles.title}>Game Score Tracker</Text>
    <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

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

    <TouchableOpacity style={styles.button} onPress={Login}>
      <Text style={styles.buttonText}>Iniciar Sesión</Text>
    </TouchableOpacity>

    <Text style={styles.registerText}>
      ¿No tienes cuenta?{' '}
      <Text style={styles.link} onPress={() => navigation.navigate("Registro")}>
        Regístrate aquí
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
  backgroundColor: '#3b82f6',
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
registerText: {
  color: '#6b7280',
  fontSize: 14,
},
link: {
  color: '#3b82f6',
  fontWeight: 'bold',
},
})