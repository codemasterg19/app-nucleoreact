import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/config'
import { ref, set } from 'firebase/database'
import { Picker } from '@react-native-picker/picker'

export default function AddScoreScreen() {

  const [ids, setids] = useState("")
  const [game, setgame] = useState("")
  const [score, setscore] = useState(0)
  const [date, setdate] = useState("")
  const [listaTitulos, setListaTitulos] = useState<string[]>([]);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;

        setids(uid)

      } else {
        // User is signed out
        // ...
      }
    });

  }, [])

  useEffect(() => {
    fetch('https://jritsqmet.github.io/web-api/videojuegos.json')
      .then((resp) => resp.json())
      .then((json) => {
        const titulos = json.videojuegos.map((juego: any) => juego.titulo);
        setListaTitulos(titulos); // Guardamos solo los nombres
      })
      .catch((err) => console.error("Error al cargar juegos", err));
  }, []);

  useEffect(() => {
    if (Number.isNaN(score) || score < 0) {
      setscore(0)
    }


  }, [score])


  function Guardar() {

    set(ref(db, 'users/' + ids + "/scores/" + Date.now()), {
      game: game,
      score: score,
      date: date

    });
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎮 Registro de Puntajes</Text>

      <TextInput
        placeholder='ID de usuario'
        style={styles.input}
        value={ids}
        editable={false}
      />

      <Text style={styles.label}>Seleccionar juego</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={game}
          onValueChange={(itemValue) => setgame(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="-- Selecciona un juego --" value="" />
          {listaTitulos.map((titulo, index) => (
            <Picker.Item key={index} label={titulo} value={titulo} />
          ))}
        </Picker>
      </View>

      <View style={styles.scoreContainer}>
  <View style={styles.scoreButton}>
    <Button
      title="−"
      onPress={() => setscore((prev) => Math.max(0, prev - 1))}
    />
  </View>

  <TextInput
    placeholder="Puntaje"
    style={styles.scoreInput}
    value={score.toString()}
    onChangeText={(texto) => {
      const num = parseInt(texto);
      if (!isNaN(num)) {
        setscore(Math.min(Math.max(num, 0), 999999));
      } else {
        setscore(0);
      }
    }}
    keyboardType="numeric"
  />

  <View style={styles.scoreButton}>
    <Button
      title="+"
      onPress={() => setscore((prev) => Math.min(999999, prev + 1))}
    />
  </View>
</View>


      <TextInput
        placeholder='Fecha (ej. 2025-04-04)'
        style={styles.input}
        onChangeText={(texto) => setdate(texto)}
        value={date}
      />

      <View style={styles.buttonContainer}>
        <Button title='Guardar' onPress={Guardar} color="#10b981" />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0f172a',
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    marginTop: 12,
    marginBottom: 4,
    color: '#374151',
    marginHorizontal: 4,
  },
  input: {
    height: 48,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#d1d5db',
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    backgroundColor: '#ffffff',
    marginVertical: 8,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 8,
    overflow: 'hidden',
  },

  scoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 12,
    gap: 8, // si usas React Native 0.71+
  },
  
  scoreButton: {
    width: 100,
    height: 48,
    justifyContent: 'center',
  },
  
  scoreInput: {
    width: 100,
    height: 48,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  
  
});