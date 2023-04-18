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

    const lowercaseChars = useLowercase ? 'abcdefghijklmnopqrstuvwxyz':'';
    const uppercaseChars = useUppercase ? 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' : '';
    const numberChars = useNumbers ? '0123456789' : '';
    const specialChars = useSpecialChars ? '%$#@!^&*()_+-={}[]:"|;\'<>,.?/~`': '';

    const availableChars = lowercaseChars + uppercaseChars + numberChars + (customSpecialChars ? customSpecialChars : specialChars);

    let password = '';
   
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * availableChars.length);
      password += availableChars[randomIndex];
        
      }
        return password;
    }
    
  } 

export default passwordUtils;