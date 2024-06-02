export default function generatePassword(passwordLength, includeUppercase, includeNumbers, includeSymbols) {
    let validChars = 'abcdefghijklmnopqrstuvwxyz';
  
    if (includeUppercase) validChars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) validChars += '0123456789';
    if (includeSymbols) validChars += '!@#$%^&*()_+-={}[]|\\:;"<>,.?/~';
  
    if (passwordLength < 8 || passwordLength > 18) passwordLength = 12; 

    let generatedPassword = '';
  
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * validChars.length);
      generatedPassword += validChars[randomIndex];
    }
  
    return generatedPassword;
}