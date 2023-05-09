interface PasswordOptions {
  length: number;
  useNumbers: boolean;
  useSpecialChars: boolean;
  useUppercase: boolean;
  useLowercase:boolean;
}

const passwordUtils = {
  generatePassword(props: PasswordOptions, customSpecialChars: string): string {
    const { length, useNumbers, useSpecialChars, useUppercase, useLowercase } = props;

    // Define character sets for each category
    const lowercaseChars:string = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseChars:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numberChars:string = '0123456789';
    const specialChars:string = '-_+=!@#$%^&*()[]{}|;:,.<>?/';

    // Determine which categories to include based on user input
    const categories:string[] = [];

    if (useLowercase){
      categories.push(lowercaseChars);
    } 
    if (useUppercase){
      categories.push(uppercaseChars);
    } 
    if (useNumbers){
      categories.push(numberChars);
    } 
    if (useSpecialChars){
      categories.push(customSpecialChars ? customSpecialChars : specialChars);
    } 

    // Ensure that at least one character from each selected category is included
    let password:string = '';
    categories.forEach(category => {
      password += category.charAt(Math.floor(Math.random() * category.length));
    });

    // Add additional random characters to fill out the rest of the password
    while (password.length < length) {
      let category = categories[Math.floor(Math.random() * categories.length)];
      password += category.charAt(Math.floor(Math.random() * category.length));
    }

    return password;
  }
}

export default passwordUtils;
