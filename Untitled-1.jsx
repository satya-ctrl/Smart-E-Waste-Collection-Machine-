import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import axios from "axios";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const EWasteScanner = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  const analyzeWaste = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("model", "gemini-api");
    
    try {
      const response = await axios.post("https://api.gemini.com/analyze", formData, {
        headers: { "Authorization": `Bearer YOUR_GEMINI_API_KEY` }
      });
      setResult(response.data);
      
      await addDoc(collection(db, "ewaste"), {
        imageUrl: "uploaded-image-url",
        category: response.data.category,
        points: response.data.points,
      });
    } catch (error) {
      console.error("Error analyzing waste", error);
    }
  };

  return (
    <div className="p-6 text-center">
      <h1 className="text-xl font-bold">Smart E-Waste Scanner</h1>
      <input type="file" onChange={handleImageUpload} className="my-3" />
      <button onClick={analyzeWaste} className="bg-blue-500 text-white p-2 rounded">Analyze</button>
      {result && <p className="mt-4">Category: {result.category} | Points: {result.points}</p>}
    </div>
  );
};

export default EWasteScanner;
