import React, { useState } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, Alert, Platform } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import { PDFDocument, rgb } from 'react-native-pdf-lib';

const PdfEditor = () => {
      const [pdfContent, setPdfContent] = useState('');
      const [editedContent, setEditedContent] = useState('');
      const [pdfUri, setPdfUri] = useState(null);

      const handleUploadPDF = async () => {
            try {
                  const result = await DocumentPicker.getDocumentAsync({
                        type: 'application/pdf', // specify the MIME type for PDF files
                  });

                  console.log('DocumentPicker result:', result); // Log the result object

                  if (!result.cancelled) {
                        const { uri } = result.assets[0]; // Extract URI from the assets array
                        console.log('Selected PDF URI:', uri); // Log the URI

                        // Read the content of the selected PDF file
                        const pdfContentBase64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
                        console.log('PDF content:', pdfContentBase64); // Log the base64-encoded PDF content

                        // Decode the base64-encoded content to get the readable text
                        const decodedContent = atob(pdfContentBase64);
                        console.log('Decoded PDF content:', decodedContent); // Log the decoded PDF content

                        // Set the PDF content in the state
                        setPdfContent(decodedContent);
                        setEditedContent(decodedContent); // Set edited content as well, assuming you want to edit the uploaded PDF immediately
                        setPdfUri(uri); // Set the PDF URI
                        Alert.alert('PDF Uploaded', `PDF has been uploaded from: ${uri}`);
                  } else {
                        console.log('Document selection cancelled');
                  }
            } catch (err) {
                  console.log('Error in handleUploadPDF:', err); // Log any errors
                  Alert.alert('Error', 'Failed to upload PDF. Please try again later.');
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
            <ScrollView contentContainerStyle={styles.container}>
                  <Button title="Upload PDF" onPress={handleUploadPDF} />
                  {pdfContent ? (
                        <>
                              <Text style={styles.label}>PDF Content:</Text>
                              <TextInput
                                    style={styles.textInput}
                                    multiline
                                    value={editedContent}
                                    onChangeText={setEditedContent}
                              />
                              <Button title="Download Edited PDF" onPress={handleDownloadPDF} />
                        </>
                  ) : (
                        <Text>No PDF uploaded</Text>
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
      },
      label: {
            fontSize: 16,
            fontWeight: 'bold',
            marginVertical: 8,
      },
      textInput: {
            width: '100%',
            height: 200,
            borderColor: '#ccc',
            borderWidth: 1,
            padding: 8,
            marginVertical: 8,
      },
});

export default PdfEditor;
