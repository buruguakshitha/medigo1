
import { pipeline } from "@huggingface/transformers";

export const scanPrescription = async (imageElement: HTMLImageElement) => {
  try {
    // Use OCR pipeline for text extraction
    const recognizer = await pipeline("text-recognition", "microsoft/trocr-base-printed");
    const result = await recognizer(imageElement);
    
    // Extract text from the results - the pipeline returns a string
    const detectedText = typeof result === 'string' ? result : '';

    // Split into lines and clean up
    const lines = detectedText.split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0);

    return lines;
  } catch (error) {
    console.error("Error in text detection:", error);
    throw error;
  }
};

