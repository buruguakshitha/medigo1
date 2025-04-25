import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DetectedMedicines from "./DetectedMedicines";
import PrescriptionPreview from "./PrescriptionPreview";
import { scanPrescription } from "@/utils/prescriptionScanner";

const availableMedicines = [
  // ... keep existing code (mock medicines data array)
];

export default function PrescriptionUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "uploading" | "verifying" | "verified" | "failed">("idle");
  const [showDetectedMedicines, setShowDetectedMedicines] = useState(false);
  const [detectedMedicines, setDetectedMedicines] = useState<any[]>([]);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);

      setStatus("idle");
      setDetectedMedicines([]);
    }
  };

  const handleUpload = async () => {
    if (!file || !preview) return;

    setStatus("uploading");
    
    try {
      const img = new Image();
      img.src = preview;
      await new Promise((resolve) => {
        img.onload = resolve;
      });

      setStatus("verifying");
      
      const detectedNames = await scanPrescription(img);
      
      const matchedMedicines = availableMedicines.filter(medicine =>
        detectedNames.some(name => 
          medicine.name.toLowerCase().includes(name.toLowerCase())
        )
      );

      setDetectedMedicines(matchedMedicines);
      setStatus("verified");
      toast({
        title: "Prescription verified",
        description: "Your prescription has been scanned and verified successfully.",
      });

      setShowDetectedMedicines(true);
    } catch (error) {
      console.error("Error processing prescription:", error);
      setStatus("failed");
      toast({
        variant: "destructive",
        title: "Verification failed",
        description: "We couldn't process your prescription. Please ensure the image is clear and try again.",
      });
    }
  };

  const handleClear = () => {
    setFile(null);
    setPreview(null);
    setStatus("idle");
    setDetectedMedicines([]);
  };

  return (
    <>
      <Card className="w-full">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-medium">Upload Prescription</h3>
              <p className="text-sm text-gray-500 mt-1">
                Upload a clear image of your prescription to order prescribed medicines
              </p>
            </div>

            {!preview ? (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center">
                <Upload className="h-10 w-10 text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 text-center mb-4">
                  Drag and drop your prescription here or click to browse
                </p>
                <input
                  id="prescription-upload"
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <label htmlFor="prescription-upload">
                  <Button
                    type="button"
                    variant="outline"
                    className="cursor-pointer"
                  >
                    Select File
                  </Button>
                </label>
              </div>
            ) : (
              <PrescriptionPreview
                file={file!}
                preview={preview}
                status={status}
                onClear={handleClear}
                onUpload={handleUpload}
                onShowDetected={() => setShowDetectedMedicines(true)}
              />
            )}
          </div>
        </CardContent>
      </Card>

      <DetectedMedicines
        isOpen={showDetectedMedicines}
        onClose={() => setShowDetectedMedicines(false)}
        detectedMedicines={detectedMedicines}
      />
    </>
  );
}
