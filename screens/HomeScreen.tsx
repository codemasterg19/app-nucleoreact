import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido a GameScore</Text>
      <Text style={styles.subtitle}>¡Registra tus juegos y sigue tus estadísticas como un verdadero gamer! 👾</Text>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('RegistroJuegos')}>
        <Text style={styles.cardTitle}>Registrar Puntaje</Text>
        <Text style={styles.cardDesc}>Agrega un nuevo puntaje a tu historial</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Stats')}>
        <Text style={styles.cardTitle}>Ver Estadísticas</Text>
        <Text style={styles.cardDesc}>Revisa tu progreso y puntaje promedio</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('Juegos')}>
        <Text style={styles.cardTitle}>Ver Juegos</Text>
        <Text style={styles.cardDesc}>Explora los juegos disponibles en la base</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#22d3ee',
    textAlign: 'center',
    marginBottom: 12,
    textTransform: 'uppercase',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#0ea5e9',
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  cardTitle: {
    fontSize: 18,
    color: '#facc15',
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: '#cbd5e1',
  },
});