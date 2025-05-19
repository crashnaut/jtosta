// src/lib/firebase/storage.ts
import { storage } from './config';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import type { UploadResult } from 'firebase/storage';

/**
 * Upload an image to Firebase Storage
 * @param file The file to upload
 * @param path The path in storage where the file should be saved
 * @returns Promise with the public URL of the uploaded file
 */
export async function uploadImage(file: File, path: string = 'blog-images'): Promise<string> {
  try {
    // Create a unique filename using a timestamp and the original filename
    const timestamp = new Date().getTime();
    const fileName = `${timestamp}_${file.name.replace(/\s+/g, '_')}`;
    const fullPath = `${path}/${fileName}`;
    
    // Create a reference to the storage location
    const storageRef = ref(storage, fullPath);
    
    // Upload the file
    const snapshot: UploadResult = await uploadBytes(storageRef, file);
    
    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return downloadURL;
  } catch (error) {
    console.error('Error uploading image:', error);
    throw new Error('Failed to upload image. Please try again.');
  }
}

/**
 * Delete an image from Firebase Storage
 * @param url The URL of the image to delete
 */
export async function deleteImage(url: string): Promise<void> {
  try {
    // Extract the path from the URL
    // URLs look like: https://firebasestorage.googleapis.com/v0/b/[bucket]/o/[path]?token=[token]
    const decodedUrl = decodeURIComponent(url);
    const startIndex = decodedUrl.indexOf('/o/') + 3;
    const endIndex = decodedUrl.indexOf('?');
    const path = decodedUrl.substring(startIndex, endIndex);
    
    // Create a reference to the file
    const imageRef = ref(storage, path);
    
    // Delete the file
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
    throw new Error('Failed to delete image. Please try again.');
  }
}