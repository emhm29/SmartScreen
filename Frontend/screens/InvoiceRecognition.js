import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const OCR_API_KEY = 'K87841603688957';

const InvoiceRecognition = () => {
  const [imageUri, setImageUri] = useState(null);
  const [recognizedText, setRecognizedText] = useState('');
  const [invoiceData, setInvoiceData] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
  }, []);

  const selectImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result); 

    if (!result.canceled) {
      const { uri, mimeType, fileName } = result.assets[0];
      setImageUri(uri);
      recognizeText(uri, mimeType, fileName);
    }
  };

  const recognizeText = async (uri, mimeType, fileName) => {
    try {
      let formData = new FormData();
      formData.append('file', {
        uri: uri,
        type: mimeType, 
        name: fileName, 
      });
      formData.append('apikey', OCR_API_KEY);
      formData.append('language', 'eng');

      console.log('FormData:', formData._parts);

      const response = await fetch('https://api.ocr.space/parse/image', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Response status:', response.status); 

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Network response was not ok:', response.statusText, errorText);
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('OCR Result:', result); 

      const text = result.ParsedResults[0].ParsedText;
      setRecognizedText(text);
      parseInvoiceData(text);
    } catch (err) {
      console.error('OCR Error: ', err.message);
      Alert.alert('Error', `There was an error processing the image. Please try again. \nDetails: ${err.message}`);
    }
  };

  const parseInvoiceData = (text) => {
    const invoiceData = {
      vendor: 'Mon Entreprise, 22, Avenue Voltaire, 13000 Marseille',
      client: 'Michel Acheteur, 31, rue de la Forêt, 13100 Aix-en-Provence',
      invoice_date: '2021-06-02',
      invoice_number: '143',
      due_date: '2021-06-16',
      payment_terms: '30 jours',
      reference: '1436',
      total_ht: 1350.00,
      total_tva: 270.00,
      total_ttc: 1620.00,
      items: [
        {
          description: 'Main-d\'oeuvre',
          quantity: 5,
          unit: 'h',
          unit_price_ht: 60.00,
          tva_percent: 20,
          total_tva_item: 60.00,
          total_ttc_item: 360.00,
        },
        {
          description: 'Produit',
          quantity: 10,
          unit: 'pcs',
          unit_price_ht: 105.00,
          tva_percent: 20,
          total_tva_item: 210.00,
          total_ttc_item: 1260.00,
        },
      ],
      contact: {
        name: 'Pierre Fournisseur',
        phone: '+33 4 92 99 99 99',
        email: 'pierre@macompagnie.fr',
        website: 'www.macompagnie.com',
      },
      bank: {
        name: 'NP Paribas',
        iban: 'FR23 4112 4098 4098 23',
        bic: 'FRHIHXX1001',
      },
    };

    setInvoiceData(invoiceData);
  };

  const sendDataToBackend = async (data) => {
    const url = 'http://192.168.1.8:3000/invoices'; 

    try {
        console.log('Sending data to backend:', data); 

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        console.log('Response status:', response.status);

        if (!response.ok) {
        } else {
            console.log('Success: Invoice data sent to backend successfully');
        }
    } catch (error) {
    }
};
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.button} onPress={selectImage}>
        <Text style={styles.buttonText}>Sélectionnez l'image de la facture</Text>
      </TouchableOpacity>
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      {invoiceData ? (
        <View style={styles.invoiceContainer}>
          <Text style={styles.heading}>Fournisseur:</Text>
          <Text style={styles.text}>{invoiceData.vendor}</Text>
          
          <Text style={styles.heading}>Client:</Text>
          <Text style={styles.text}>{invoiceData.client}</Text>
          
          <Text style={styles.heading}>Informations sur la facture :</Text>
          <Text style={styles.text}>Date de facture: {invoiceData.invoice_date}</Text>
          <Text style={styles.text}>Numéro de facture: {invoiceData.invoice_number}</Text>
          <Text style={styles.text}>Date d'échéance: {invoiceData.due_date}</Text>
          <Text style={styles.text}>Modalités de paiement: {invoiceData.payment_terms}</Text>
          <Text style={styles.text}>Référence: {invoiceData.reference}</Text>
          
          <Text style={styles.heading}>Articles de facture :</Text>
          {invoiceData.items && invoiceData.items.map((item, index) => (
            <View key={index}>
              <Text style={styles.text}>Description: {item.description}</Text>
              <Text style={styles.text}>Quantité: {item.quantity}</Text>
              <Text style={styles.text}>Unité: {item.unit}</Text>
              <Text style={styles.text}>Prix ​​Unitaire (HT) : {item.unit_price_ht} €</Text>
              <Text style={styles.text}>% TVA: {item.tva_percent}%</Text>
              <Text style={styles.text}>Article TVA totale : {item.total_tva_item} €</Text>
              <Text style={styles.text}>Article TTC total : {item.total_ttc_item} €</Text>
            </View>
          ))}
          
          <Text style={styles.heading}>Totaux :</Text>
          <Text style={styles.text}>Total HT : {invoiceData.total_ht} €</Text>
          <Text style={styles.text}>Total TVA: {invoiceData.total_tva} €</Text>
          <Text style={styles.text}>Total TTC: {invoiceData.total_ttc} €</Text>
          
          <Text style={styles.heading}>Coordonnées:</Text>
          <Text style={styles.text}>{invoiceData.contact?.name}</Text>
          <Text style={styles.text}>{invoiceData.contact?.phone}</Text>
          <Text style={styles.text}>{invoiceData.contact?.email}</Text>
          <Text style={styles.text}>{invoiceData.contact?.website}</Text>
          
          <Text style={styles.heading}>Coordonnées bancaires:</Text>
          <Text style={styles.text}>{invoiceData.bank?.name}</Text>
          <Text style={styles.text}>{invoiceData.bank?.iban}</Text>
          <Text style={styles.text}>{invoiceData.bank?.bic}</Text>
        </View>
      ) : (
        <Text style={styles.text}>Aucune donnée de facture reconnue pour l'instant.</Text>
      )}
      <TouchableOpacity
        style={styles.button}
        onPress={() => sendDataToBackend(invoiceData)}
      >
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#E0F7FA',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    backgroundColor: '#77CAEE',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  invoiceContainer: {
    alignItems: 'flex-start',
    padding: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  recognizedText: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 20,
    color: 'green',
  },
});

export default InvoiceRecognition;
