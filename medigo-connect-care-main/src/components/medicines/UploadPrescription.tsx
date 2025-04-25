// UploadPrescription.tsx
import React, { useState } from 'react';
import Tesseract from 'tesseract.js';

const UploadPrescription = () => {
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [medicines, setMedicines] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && (file.type === 'image/jpeg' || file.type === 'image/png')) {
      setImage(file);
    } else {
      alert('Please upload a JPG or PNG file');
    }
  };

  const extractMedicines = async () => {
    if (!image) return;
    setLoading(true);
    try {
      const { data: { text } } = await Tesseract.recognize(image, 'eng');
      const lines = text.split('\n').map(line => line.trim()).filter(Boolean);

      // Example: filtering lines that might look like medicine names
      const medicineList = lines.filter(line => /^[A-Za-z0-9\s-]{3,}$/.test(line));
      setMedicines(medicineList);
    } catch (error) {
      console.error('OCR Error:', error);
      alert('Failed to extract text.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (medicine: string) => {
    if (!cart.includes(medicine)) {
      setCart([...cart, medicine]);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded-xl space-y-4">
      <h2 className="text-2xl font-semibold text-center">Upload Prescription</h2>
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="block w-full text-sm text-gray-700"
      />
      <button
        onClick={extractMedicines}
        disabled={!image}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        {loading ? 'Extracting...' : 'Extract Medicines'}
      </button>

      {medicines.length > 0 && (
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <h3 className="font-medium">Extracted Medicines:</h3>
          <ul className="space-y-1">
            {medicines.map((med, idx) => (
              <li key={idx} className="flex justify-between items-center">
                <span>{med}</span>
                <button
                  onClick={() => addToCart(med)}
                  className="text-sm bg-green-500 text-white px-2 py-1 rounded"
                >
                  Add to Cart
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cart.length > 0 && (
        <div className="bg-green-100 p-4 rounded mt-4">
          <h3 className="font-medium">Cart:</h3>
          <ul className="list-disc list-inside">
            {cart.map((med, idx) => <li key={idx}>{med}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;
