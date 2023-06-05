
module.exports = {
  nextLetter: (letter) => {
      const lastChar = letter.slice(-1); 
      const nextCharCode = lastChar.charCodeAt(0) + 1; 
      const nextChar = String.fromCharCode(nextCharCode); 
      const remainingChars = letter.slice(0, -1); 
      return remainingChars + nextChar; 
    }
}