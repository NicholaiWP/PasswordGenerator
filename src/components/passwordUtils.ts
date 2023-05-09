import React from "react";

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
    const specialChars = useSpecialChars ? '-_+=!@#$%^&*()[]{}|;:,.<>?/': '';

    const availableChars = lowercaseChars + uppercaseChars + numberChars + (customSpecialChars ? customSpecialChars : specialChars);

    const password = Array.from({ length }, () => availableChars[Math.floor(Math.random() * availableChars.length)]).join('');
    
    return password;
  }
}

export default passwordUtils;