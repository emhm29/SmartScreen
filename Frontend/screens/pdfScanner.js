import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Alert, Dimensions, Modal, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImageUploadTwo from './ImageUploadTwo'; // Ensure this component is correctly imported
import * as Print from 'expo-print';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const { width, height } = Dimensions.get('window');

const MessageCard = ({ id, secondary, imageUrl, onDelete, onConvertToPDF,claimed, navigation }) => {
  return (
    <View style={styles.messageCard}>
      <View style={styles.messageContent}>
        <Text style={styles.secondaryText}>{secondary}</Text>
        {imageUrl && (
          <>
            <TouchableOpacity style={styles.imageContainer} onPress={() => Alert.alert('Image Clicked', 'Show full image functionality here')}>
              <Image source={{ uri: imageUrl }} style={styles.messageImage} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.pdfButton} onPress={() => onConvertToPDF(imageUrl)}>
              <Text style={styles.pdfButtonText}>Convert to PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.claimButton, claimed && styles.claimButtonClaimed] } onPress={() => navigation.navigate('ClaimForm', { imageUrl })}>
              <Text style={[styles.claimButtonText, { color: 'white' }]}>Déposer une réclamation </Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TouchableOpacity onPress={() => onDelete(id)}>
        <Feather name="trash" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

const PdfScanner = () => {
  const navigation = useNavigation();
  const [inputValue, setInputValue] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [messages, setMessages] = useState([]);
  const [pdfUri, setPdfUri] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const storedMessages = await AsyncStorage.getItem('messages');
        if (storedMessages !== null) {
          setMessages(JSON.parse(storedMessages));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
      }
    };
    loadMessages();
  }, []);

  useEffect(() => {
    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem('messages', JSON.stringify(messages));
      } catch (error) {
        console.error('Error saving messages:', error);
      }
    };
    saveMessages();
  }, [messages]);

  const handleInputChange = (text) => {
    setInputValue(text);
  };

  const handlePostMessage = () => {
    if (imageUrl.trim() !== '') {
      const newMessage = {
        id: messages.length + 1,
        primary: inputValue,
        secondary: 'New message',
        imageUrl: imageUrl,
        comments: [],
      };
      const updatedMessages = [...messages, newMessage];
      setMessages(updatedMessages);
      setInputValue('');
      setImageUrl('');
      Alert.alert('Message Posted', 'Your message has been posted successfully.');
    } else {
      Alert.alert('No Image', 'Please upload an image to post a message.');
    }
  };

  const handleDeleteMessage = (id) => {
    const updatedMessages = messages.filter(message => message.id !== id);
    setMessages(updatedMessages);
  };

  const handleChangeImage = (url) => {
    setImageUrl(url);
  };

  const handleConvertToPDF = async (image) => {
    try {
      const html = `<html><body><img src="${image}" style="width: 100%; height: auto;" /></body></html>`;
      const { uri } = await Print.printToFileAsync({ html });
      setPdfUri(uri);
      setModalVisible(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handleDownloadPDF = async () => {
    if (pdfUri) {
      try {
        if (Platform.OS === 'android') {
          const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();
          if (permissions.granted) {
            const base64Data = await FileSystem.readAsStringAsync(pdfUri, { encoding: FileSystem.EncodingType.Base64 });
            const newUri = await FileSystem.StorageAccessFramework.createFileAsync(
              permissions.directoryUri,
              'DownloadedPDF.pdf',
              'application/pdf'
            );
            await FileSystem.writeAsStringAsync(newUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
            Alert.alert('PDF Downloaded', `PDF has been downloaded to ${newUri}`);
          } else {
            Alert.alert('Permission Denied', 'Unable to access storage.');
          }
        } else {
          Alert.alert('PDF Downloaded', `PDF has been saved to ${pdfUri}`);
        }
      } catch (error) {
        console.error('Error downloading PDF:', error);
      }
    }
  };

  return (
    <View style={styles.view}>
      <ScrollView style={styles.messageContainer}>
        {messages.map(message => (
          <MessageCard
            key={message.id}
            {...message}
            onDelete={handleDeleteMessage}
            onConvertToPDF={handleConvertToPDF}
            navigation={navigation}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <ImageUploadTwo changeImage={handleChangeImage} />
        <TouchableOpacity style={styles.postButton} onPress={handlePostMessage}>
          <Feather name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalView}>
          {pdfUri && (
            <WebView style={styles.webview} source={{ uri: pdfUri }} originWhitelist={['*']} allowFileAccess={true} />
          )}
          <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadPDF}>
            <Text style={styles.downloadButtonText}>Download PDF</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#E0F7FA',
    alignItems: "center",
    paddingHorizontal: width * 0.05,
  },
  claimButton: {
    marginTop: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#A7C957', // Couleur verte pour indiquer une action positive
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  claimButtonClaimed: {
    backgroundColor: 'red', // Couleur rouge pour indiquer une réclamation déjà faite
  },
  messageContainer: {
    flex: 1,
    marginTop: height * 0.1,
    width: '100%',
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  messageContent: {
    flex: 1,
  },
  secondaryText: {
    marginBottom: 5,
    fontSize: 14,
    color: '#666',
    
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  messageImage: {
    width: '100%',
    height: 200,
    
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    backgroundColor: 'rgba(240, 240, 240, 0.5)',
    width: '100%',
  },
  postButton: {
    backgroundColor: '#003366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  pdfButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 5,
    alignItems: 'center',
  },
  pdfButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  webview: {
    width: width - 40,
    height: height - 100,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  downloadButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#003366',
    borderRadius: 10,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
  },
  navigationButton: {
    position: 'absolute',
    top: 50,
    right: 20,
  },
});

export default PdfScanner;
