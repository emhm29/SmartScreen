import React, { useState } from 'react';
import { ScrollView, Text, Button, StyleSheet, Alert, View, Dimensions } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import { WebView } from 'react-native-webview';

const PdfEditor = () => {
  const [pdfBase64, setPdfBase64] = useState(null);

  const handleUploadPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'application/pdf',
      });
  
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
  
        if (!uri) {
          throw new Error('Invalid URI');
        }
  
        const fileData = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
        const base64Uri = `data:application/pdf;base64,${fileData}`;
        setPdfBase64(base64Uri);
  
        Alert.alert('PDF Uploaded', `PDF has been uploaded from: ${uri}`);
      } else {
        Alert.alert('Error', 'Invalid result or URI');
      }
    } catch (err) {
      Alert.alert('Error', 'Failed to upload PDF. Please try again later.');
    }
  };

  const handleDownloadPDF = async () => {
    if (pdfBase64) {
      try {
        const fileUri = `${FileSystem.documentDirectory}DownloadedPDF.pdf`;
        const base64Data = pdfBase64.split('base64,')[1]; 
        await FileSystem.writeAsStringAsync(fileUri, base64Data, { encoding: FileSystem.EncodingType.Base64 });
        Alert.alert('PDF Downloaded', `PDF has been saved to ${fileUri}`);
      } catch {
        Alert.alert('Error', 'Failed to download PDF. Please try again later.');
      }
    } else {
      Alert.alert('Error', 'No PDF data available to download.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Button title="UPLOAD PDF" onPress={handleUploadPDF} color="#77CAEE" />
      {pdfBase64 ? (
        <View style={styles.pdfContainer}>
          <WebView
            originWhitelist={['*']}
            source={{ uri: pdfBase64 }}
            style={styles.pdf}
          />
          <Button title="DOWNLOAD EDITED PDF" onPress={handleDownloadPDF} color="#77CAEE" />
        </View>
      ) : (
        <Text style={styles.noPdfText}>No PDF uploaded</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0F7FA',
  },
  pdfContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
    marginTop: 20,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 200,
  },
  noPdfText: {
    fontSize: 16,
    color: '#757575',
  },
});

export default PdfEditor;
