
import { Button } from "@/components/ui/button";
import { X, Check, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface PrescriptionPreviewProps {
  file: File;
  preview: string;
  status: "idle" | "uploading" | "verifying" | "verified" | "failed";
  onClear: () => void;
  onUpload: () => void;
  onShowDetected: () => void;
}

export default function PrescriptionPreview({
  file,
  preview,
  status,
  onClear,
  onUpload,
  onShowDetected
}: PrescriptionPreviewProps) {
  return (
    <div className="space-y-4">
      <div className="relative">
        <img
          src={preview}
          alt="Prescription preview"
          className="rounded-lg w-full max-h-60 object-cover"
        />
        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-white/80 hover:bg-white"
          onClick={onClear}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center">
        <div className="flex-1 mr-4">
          <p className="text-sm font-medium truncate">{file?.name}</p>
          <p className="text-xs text-gray-500">
            {(file?.size ? (file.size / 1024 / 1024).toFixed(2) : "0")} MB
          </p>
        </div>
        <div>
          {status === "idle" && (
            <Button 
              type="button" 
              onClick={onUpload}
              className="bg-medigo-500 hover:bg-medigo-600"
            >
              Upload & Verify
            </Button>
          )}
          
          {status === "uploading" && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Uploading...
            </Button>
          )}
          
          {status === "verifying" && (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Verifying...
            </Button>
          )}
          
          {status === "verified" && (
            <div className="flex items-center text-green-600 font-medium">
              <Check className="mr-1 h-4 w-4" />
              Verified
            </div>
          )}
          
          {status === "failed" && (
            <Button 
              type="button" 
              variant="destructive" 
              onClick={onUpload}
            >
              Try Again
            </Button>
          )}
        </div>
      </div>

      {status === "verified" && (
        <div className="bg-green-50 text-green-700 p-4 rounded-lg">
          <h4 className="font-medium flex items-center">
            <Check className="h-4 w-4 mr-2" />
            Prescription Successfully Verified
          </h4>
          <p className="text-sm mt-1">
            We've verified your prescription. You can now proceed to order the prescribed medicines.
          </p>
          <Button 
            onClick={onShowDetected}
            className={cn(
              "mt-4 w-full",
              "bg-medigo-500 hover:bg-medigo-600"
            )}
          >
            View Prescribed Medicines
          </Button>
        </div>
      )}
      
      {status === "failed" && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg">
          <h4 className="font-medium">Verification Failed</h4>
          <p className="text-sm mt-1">
            We couldn't verify your prescription. Please ensure the image is clear or try uploading a different image.
          </p>
        </div>
      )}
    </div>
  );
}
