import { Alert, Button, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'

export default function Tarjeta({ datos }: any) {
    //console.log(datos);
    const [modalVisible, setModalVisible] = useState(false);
  
    return (
      <TouchableOpacity style={styles.card} onPress={() => setModalVisible(true)}>
        <Image source={{ uri: datos.imagen }} style={styles.img} />
        <View style={styles.info}>
          <Text style={styles.title}>{datos.titulo}</Text>
          <Text style={styles.platforms}>{datos.plataforma.join(', ')}</Text>
          <Text style={styles.price}>${datos.precio}</Text>
        </View>
  
        <Modal visible={modalVisible} animationType='slide' transparent={true}>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{datos.titulo}</Text>
              <Image source={{ uri: datos.imagen }} style={styles.modalImg} />
              <Text style={styles.modalText}> Plataforma: {datos.plataforma.join(', ')}</Text>
              <Text style={styles.modalText}> Precio: ${datos.precio}</Text>
              <Text style={styles.modalText}> Lanzamiento: {datos.lanzamiento}</Text>
              <Text style={styles.modalDesc}>{datos.descripcion}</Text>
  
              <Button title="Cerrar" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </Modal>
      </TouchableOpacity>
    );
  }
  
const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    margin: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  img: {
    width: '100%',
    height: 180,
    
  },
  info: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  platforms: {
    fontSize: 14,
    color: '#4b5563',
    marginTop: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10b981',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#111827',
    textAlign: 'center',
  },
  modalImg: {
    width: 200,
    height: 300,
    marginBottom: 16,
    resizeMode: 'contain',
  },
  modalText: {
    fontSize: 14,
    marginBottom: 6,
    color: '#374151',
    textAlign: 'center',
  },
  modalDesc: {
    fontSize: 13,
    color: '#6b7280',
    marginVertical: 10,
    textAlign: 'center',
  },
});