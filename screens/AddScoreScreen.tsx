import { Button, Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '../config/config'
import { ref, set } from 'firebase/database'
import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform, Pressable } from 'react-native';

export default function AddScoreScreen() {

  const [ids, setids] = useState("")
  const [game, setgame] = useState("")
  const [score, setscore] = useState(0)
  const [date, setdate] = useState("")

  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const [juegos, setJuegos] = useState<any[]>([]);

  const [showDatePicker, setShowDatePicker] = useState(false);

  const formatDate = (dateObj: Date): string => {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, '0');
    const day = String(dateObj.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


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
        setJuegos(json.videojuegos); // guarda todos los juegos con título e imagen
      })
      .catch((err) => console.error("Error al cargar juegos", err));

  }, []);

  useEffect(() => {
    if (Number.isNaN(score) || score < 0) {
      setscore(0)
    }


  }, [score])


  function Guardar() {

    if (!game || score <= 0) {
      alert("Debes seleccionar un juego y el puntaje debe ser mayor a 0.");
      return;
    }

    const nuevaEntrada = {
      game: game,
      score: score,
      date: date || null,
      
    };

    set(ref(db, 'users/' + ids + "/scores/" + Date.now()), nuevaEntrada)
      .then(() => {
        alert("Puntaje guardado correctamente.");
        // Limpiar campos
        setgame("");
        setscore(0);
        setdate("");
        setgame("");
        setSelectedImage(null); 

      })
      .catch((error) => {
        console.error("Error al guardar:", error);
        alert("Ocurrió un error al guardar el puntaje.");
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
          onValueChange={(itemValue) => {
            setgame(itemValue);
            const juegoSeleccionado = juegos.find(j => j.titulo === itemValue);
            setSelectedImage(juegoSeleccionado?.imagen || null);
          }}
          style={styles.picker}
        >
          <Picker.Item label="-- Selecciona un juego --" value="" />
          {juegos.map((juego, index) => (
            <Picker.Item key={index} label={juego.titulo} value={juego.titulo} />
          ))}
        </Picker>


        {selectedImage && (
          <View style={styles.imagePreview}>
            
            <View style={{ alignItems: 'center' }}>
              <Image source={{ uri: selectedImage }} style={styles.image} />
            </View>
          </View>
        )}


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


      <Text style={styles.label}>Fecha del puntaje</Text>

      <Pressable style={styles.input} onPress={() => setShowDatePicker(true)}>
        <Text style={{ color: date ? '#000' : '#9ca3af' }}>
          {date || 'Seleccionar fecha'}
        </Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          mode="date"
          value={new Date()}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setdate(formatDate(selectedDate));
            }
          }}
        />
      )}


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
    justifyContent: 'center',
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
    justifyContent: 'space-between',
    marginVertical: 12,
    gap: 12, 
  },
  scoreButton: {
    flex: 1,
    height: 48,
    justifyContent: 'center',
  },
  scoreInput: {
    flex: 1,
    height: 48,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    marginHorizontal: 8,
  },

  imagePreview: {
    marginTop: 12,
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  

});
