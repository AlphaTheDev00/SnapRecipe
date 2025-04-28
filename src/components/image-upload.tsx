"use client";

import type * as React from 'react';
import { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  onImageSelect: (dataUri: string | null) => void;
  onSubmit: () => void;
  isLoading: boolean;
  className?: string;
}

export function ImageUpload({ onImageSelect, onSubmit, isLoading, className }: ImageUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    const file = event.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select an image file.');
        setSelectedFile(null);
        setPreviewUrl(null);
        onImageSelect(null);
        return;
      }

      setSelectedFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUri = reader.result as string;
        setPreviewUrl(dataUri);
        onImageSelect(dataUri); // Pass base64 string up
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
        setSelectedFile(null);
        setPreviewUrl(null);
        onImageSelect(null);
      }
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
      setPreviewUrl(null);
      onImageSelect(null);
    }
  }, [onImageSelect]);

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    onImageSelect(null);
    setError(null);
    // Reset file input value
    const fileInput = document.getElementById('ingredient-photo') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UploadCloud className="h-6 w-6 text-primary" />
          Upload Ingredient Photo
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="ingredient-photo">Select Image</Label>
          <Input
            id="ingredient-photo"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="file:text-primary file:font-medium"
            disabled={isLoading}
          />
        </div>
        {error && <p className="text-sm text-destructive">{error}</p>}
        {previewUrl && (
          <div className="mt-4 relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-md border border-border shadow-sm">
            <Image
              src={previewUrl}
              alt="Selected ingredient preview"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 h-7 w-7 rounded-full opacity-80 hover:opacity-100"
              onClick={handleRemoveImage}
              disabled={isLoading}
              aria-label="Remove image"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        )}
        {!previewUrl && !error && (
          <div className="mt-4 flex flex-col items-center justify-center p-6 border-2 border-dashed border-border rounded-md text-muted-foreground">
            <ImageIcon className="h-12 w-12 mb-2" />
            <p>Preview will appear here</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button
          onClick={onSubmit}
          disabled={!selectedFile || isLoading}
          className="w-full"
        >
          {isLoading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating Recipe...
            </>
          ) : (
            'Generate Recipe'
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
