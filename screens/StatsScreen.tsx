import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '../config/config';
import { onValue, ref } from 'firebase/database';

export default function StatsScreen() {
  const [puntajes, setPuntajes] = useState<number[]>([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        const scoresRef = ref(db, 'users/' + user.uid + '/scores');
        onValue(scoresRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const scores = Object.values(data).map((item: any) => item.score || 0);
            setPuntajes(scores);
          } else {
            setPuntajes([]);
          }
        });
      }
    });
  }, []);

  const total = puntajes.reduce((acc, val) => acc + val, 0);
  const max = puntajes.length > 0 ? Math.max(...puntajes) : 0;
  const avg = puntajes.length > 0 ? (total / puntajes.length).toFixed(2) : 0;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuaciones</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Puntaje Total</Text>
        <Text style={styles.value}>{total}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Puntaje Más Alto</Text>
        <Text style={styles.value}>{max}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>Puntaje Promedio</Text>
        <Text style={styles.value}>{avg}</Text>
      </View>
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
    marginBottom: 30,
    color: '#22d3ee', // cian neón
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#0ea5e9',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: '#0ea5e9',
  },
  label: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 6,
  },
  value: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#facc15', // amarillo gamer
    textAlign: 'center',
  },
});