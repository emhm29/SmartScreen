
import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import AuthContext from '../AuthContext'; 

const Invoices = () => {
  const { token } = useContext(AuthContext);
  const [invoices, setInvoices] = useState([]);
  const [editInvoice, setEditInvoice] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({
    vendor: '',
    client: '',
    invoice_date: '',
    invoice_number: '',
    due_date: '',
    payment_terms: '',
    reference: '',
    total_ht: '',
    total_tva: '',
    total_ttc: '',
    items: []
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('http://192.168.1.8:3000/invoices', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setInvoices(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      Alert.alert('Erreur', 'Erreur lors de la récupération des factures');
    }
  };

  const handleEditInvoice = (invoice) => {
    if (!invoice.items) {
      invoice.items = [];
    }
    setEditInvoice(invoice);
    setInvoiceForm(invoice);
  };

  const handleChange = (field, value) => {
    setInvoiceForm({ ...invoiceForm, [field]: value });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...invoiceForm.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setInvoiceForm({ ...invoiceForm, items: updatedItems });
  };

  const handleUpdateInvoice = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Token not found');
      }

      const response = await axios.put(`http://192.168.1.8:3000/invoices/${editInvoice.id}`, invoiceForm, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Invoice updated:', response.data);
      fetchInvoices(); 
      setEditInvoice(null); 
      Alert.alert('Succès', 'Facture mise à jour avec succès');
    } catch (error) {
      console.error('Error updating invoice:', error);
      Alert.alert('Erreur', 'Erreur lors de la mise à jour de la facture');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {editInvoice ? (
        <View style={styles.invoiceDetail}>
          <Text style={styles.header}>Modifier la Facture</Text>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Informations Générales</Text>
            <TextInput
              style={styles.input}
              placeholder="Vendor"
              value={invoiceForm.vendor}
              onChangeText={(value) => handleChange('vendor', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Client"
              value={invoiceForm.client}
              onChangeText={(value) => handleChange('client', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Invoice Date"
              value={invoiceForm.invoice_date}
              onChangeText={(value) => handleChange('invoice_date', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Invoice Number"
              value={invoiceForm.invoice_number}
              onChangeText={(value) => handleChange('invoice_number', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Due Date"
              value={invoiceForm.due_date}
              onChangeText={(value) => handleChange('due_date', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Payment Terms"
              value={invoiceForm.payment_terms}
              onChangeText={(value) => handleChange('payment_terms', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Reference"
              value={invoiceForm.reference}
              onChangeText={(value) => handleChange('reference', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total HT"
              value={invoiceForm.total_ht}
              onChangeText={(value) => handleChange('total_ht', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total TVA"
              value={invoiceForm.total_tva}
              onChangeText={(value) => handleChange('total_tva', value)}
            />
            <TextInput
              style={styles.input}
              placeholder="Total TTC"
              value={invoiceForm.total_ttc}
              onChangeText={(value) => handleChange('total_ttc', value)}
            />
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionHeader}>Items</Text>
            {invoiceForm.items && invoiceForm.items.map((item, index) => (
              <View key={index} style={styles.itemRow}>
                <TextInput
                  style={styles.itemInput}
                  placeholder="Description"
                  value={item.description}
                  onChangeText={(value) => handleItemChange(index, 'description', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="Quantity"
                  value={item.quantity}
                  onChangeText={(value) => handleItemChange(index, 'quantity', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="Unit"
                  value={item.unit}
                  onChangeText={(value) => handleItemChange(index, 'unit', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="Unit Price HT"
                  value={item.unit_price_ht}
                  onChangeText={(value) => handleItemChange(index, 'unit_price_ht', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="TVA Percent"
                  value={item.tva_percent}
                  onChangeText={(value) => handleItemChange(index, 'tva_percent', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="Total TVA Item"
                  value={item.total_tva_item}
                  onChangeText={(value) => handleItemChange(index, 'total_tva_item', value)}
                />
                <TextInput
                  style={styles.itemInput}
                  placeholder="Total TTC Item"
                  value={item.total_ttc_item}
                  onChangeText={(value) => handleItemChange(index, 'total_ttc_item', value)}
                />
              </View>
            ))}
          </View>
          <TouchableOpacity style={styles.button} onPress={handleUpdateInvoice}>
            <Text style={styles.buttonText}>Mettre à jour</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonCancel} onPress={() => setEditInvoice(null)}>
            <Text style={styles.buttonText}>Annuler</Text>
          </TouchableOpacity>
        </View>
      ) : (
        invoices && invoices.map((invoice) => (
          <View key={invoice.id} style={styles.invoice}>
            <Text style={styles.invoiceHeader}>{invoice.vendor} - {invoice.client}</Text>
            <Text style={styles.invoiceTotal}>{invoice.total_ttc} €</Text>
            <View style={styles.itemsContainer}>
              {invoice.items && invoice.items.map((item, index) => (
                <View key={index} style={styles.item}>
                  <Text style={styles.field}>Description: {item.description}</Text>
                  <Text style={styles.field}>Quantity: {item.quantity}</Text>
                  <Text style={styles.field}>Unit: {item.unit}</Text>
                  <Text style={styles.field}>Unit Price HT: {item.unit_price_ht}</Text>
                  <Text style={styles.field}>TVA Percent: {item.tva_percent}</Text>
                  <Text style={styles.field}>Total TVA Item: {item.total_tva_item}</Text>
                  <Text style={styles.field}>Total TTC Item: {item.total_ttc_item}</Text>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => handleEditInvoice(invoice)}>
              <Text style={styles.buttonText}>Voir et Modifier</Text>
            </TouchableOpacity>
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  invoiceDetail: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  field: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  item: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  itemRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  itemInput: {
    width: '30%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  itemsContainer: {
    marginVertical: 10,
  },
  invoice: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 1,
  },
  invoiceHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  invoiceTotal: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonCancel: {
    backgroundColor: '#FF3B30',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Invoices;
