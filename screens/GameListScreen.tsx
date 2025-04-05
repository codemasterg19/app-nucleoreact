import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Tarjeta from '../components/Tarjeta';

export default function GameListScreen({navigation}: any) {

  const [data, setdata] = useState([])
 const [error, setError] = useState('');

 const getData = async () => {
  try {
    const resp = await fetch('https://jritsqmet.github.io/web-api/videojuegos.json');
    const json = await resp.json();
    setdata(json.videojuegos);
  } catch (err) {
    setError('Ocurrió un error desconocido');
  }
}

useEffect(() => {
  getData();
}, []);


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Videojuegos</Text>
      <FlatList
        data={data}
        renderItem={({ item }) => <Tarjeta datos={item} />}
        
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#1f2937',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 16,
  },
});