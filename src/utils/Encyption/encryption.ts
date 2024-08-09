// encryptionService.ts
import CryptoJS from "crypto-js";

// Function to encrypt an object
export const encryptObject = (
  obj: Record<string, any>
): Record<string, any> => {
  const encryptedObj: Record<string, any> = {};

  Object.keys(obj).forEach((key) => {
    const encryptedValue = CryptoJS.AES.encrypt(
      JSON.stringify(obj[key] ?? ""),
      process.env.REACT_APP_ENCRYPTIONKEY ?? ""
    ).toString();
    encryptedObj[key] = encryptedValue;
  });

  return encryptedObj;
};

// Function to decrypt an object
export const decryptObject = (
  encryptedObj: Record<string, any>
): Record<string, any> => {
  const decryptedObj: Record<string, any> = {};

  Object.keys(encryptedObj).forEach((key) => {
    const decryptedValue = CryptoJS.AES.decrypt(
      encryptedObj[key] ?? "",
      process.env.REACT_APP_ENCRYPTIONKEY ?? ""
    ).toString(CryptoJS.enc.Utf8);
    try {
      if (key === "role") {
        decryptedObj[key] = decryptedValue;
      } else {
        decryptedObj[key] = JSON.parse(decryptedValue);
      }
    } catch (error) {
      // Handle decryption errors here
      console.error(`Error decrypting value for key ${key}: ${error}`);
    }
  });

  return decryptedObj;
};
