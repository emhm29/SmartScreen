// Frontend/ocrService.js
import axios from 'axios';

const API_ENDPOINT = 'http://192.168.1.8:3000/analyze-image';

export const recognizeTextFromImage = async (imageUri) => {
    try {
        console.log('Converting image to base64');
        const imageBase64 = await convertToBase64(imageUri);
        console.log('Image converted to base64:', imageBase64);

        console.log('Sending image to backend');
        const response = await axios.post(API_ENDPOINT, { imageBase64 });

        console.log('Response from backend:', response.data);

        const { recognizedText } = response.data;
        return recognizedText;
    } catch (error) {
        console.error('Error recognizing text from image:', error);
        throw error;
    }
};

const convertToBase64 = async (uri) => {
    console.log('Fetching image from URI:', uri);
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64data = reader.result.split(',')[1];
            console.log('Base64 data:', base64data);
            resolve(base64data);
        };
        reader.onerror = (error) => {
            console.error('Error converting image to base64:', error);
            reject(error);
        };
        reader.readAsDataURL(blob);
    });
};
