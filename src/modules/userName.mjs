const getUserName = () => {
  const [inputStr] = process.argv.slice(2);
  if (!inputStr) {
    return 'User'
  } else if (inputStr.startsWith('--username=') && inputStr.length > 11) {
    return inputStr.slice(11);
  } else if (inputStr.startsWith('--') && inputStr.length > 2) {
    return inputStr.slice(2);
  }
  return 'User';
}

export const userName = getUserName();