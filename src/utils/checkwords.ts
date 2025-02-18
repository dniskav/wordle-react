export interface testLetter {
  letter: string
  isInWord: boolean
  isInPosition: boolean
}

export const checkWord = (word: string, matchWord: string) => {
  // check if the letter is in the word and if it is in the correct position
  const wordChecked: testLetter[] = []
  word.split('').forEach((letter, index) => {
    const letterOnPosition = matchWord.toLocaleUpperCase()[index] === letter.toLocaleUpperCase()
    const LetterOnWord = matchWord.toLocaleUpperCase().includes(letter.toLocaleUpperCase())

    wordChecked.push({
      letter: word.toLocaleUpperCase()[index],
      isInWord: LetterOnWord,
      isInPosition: letterOnPosition
    })
  })

  return wordChecked
}