 export enum Languages {
    English,
    Danish,
    German,
    Italian,
    Swedish,
    Russian,
    Spanish,
    French
  }
  
  export interface LanguageOptions {
    language: Languages;
    alphabetUppercase: string;
    alphabetLowercase: string;
  }
  
  export const languageSelection: LanguageOptions[] = [
    { language: Languages.English, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyz' },
    { language: Languages.Danish, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÆØÅ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzæøå' },
    { language: Languages.German, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÜß', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzäöüß' },
    { language: Languages.Italian, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÈÉÌÎÒÙ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzàèéìîòù' },
    { language: Languages.Swedish, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÅÄÖ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzåäö' },
    { language: Languages.Russian, alphabetUppercase: 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ', alphabetLowercase: 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя' },
    { language: Languages.Spanish, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÉÍÑÓÚÜ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzáéíñóúü' },
    { language: Languages.French, alphabetUppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZÀÂÆÇÉÈÊËÎÏÔŒÙÛÜŸ', alphabetLowercase: 'abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôœùûüÿ' }
  ];

  interface PasswordOptions {
    length: number;
    useNumbers: boolean;
    useSpecialChars: boolean;
    useUppercase: boolean;
    useLowercase:boolean;
    useNoDuplicateChars:boolean;
  }


  const PasswordHelper = {
    generatePassword(props: PasswordOptions, customSpecialChars: string, langOptions:LanguageOptions): string {
      const { length, useNumbers, useSpecialChars, useUppercase, useLowercase, useNoDuplicateChars} = props;
   

    // Retrieve the uppercase and lowercase strings from the language object
    const uppercaseChars: string = langOptions?.alphabetUppercase || '';
    const lowercaseChars: string = langOptions?.alphabetLowercase || '';

      // Define character sets for each category
      //const lowercaseChars:string = 'abcdefghijklmnopqrstuvwxyz';
      //const uppercaseChars:string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
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

      if(useNoDuplicateChars){
        const passwordWithUniqueChars = [...new Set(password)].join("");
        return passwordWithUniqueChars
      }
      
  
      return password;
    },
  }
  
  export default PasswordHelper;
  