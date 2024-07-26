// ManageComplaints.js
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import axios from 'axios';

const ManageComplaints = () => {
    const [claims, setClaims] = useState([]);

    useEffect(() => {
        const fetchClaims = async () => {
            try {
                const response = await axios.get('http://192.168.1.8:3000/claims');
                setClaims(response.data);
            } catch (error) {
                console.error('Error fetching claims:', error);
            }
        };

        fetchClaims();
    }, []);

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Gestion des Réclamations</Text>
            <FlatList
                data={claims}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.claimItem}>
                        <Text style={styles.claimText}>ID: {item.id}</Text>
                        <Text style={styles.claimText}>Name: {item.name}</Text>
                        <Text style={styles.claimText}>Email: {item.email}</Text>
                        <Text style={styles.claimText}>Description: {item.description}</Text>
                        {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={styles.image} />}
                        <Text style={styles.claimText}>Created At: {item.created_at}</Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0F7FA',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    claimItem: {
        width: '90%',
        padding: 10,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    claimText: {
        fontSize: 16,
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 10,
    },
    
});

export default ManageComplaints;
