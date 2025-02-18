import { memo } from "react";

interface props {
  letter: string,
  isInWord: boolean,
  isInPosition: boolean
}

const Box = memo(({ letter,  isInPosition = false, isInWord = false }: props) => {
  const letterGreen = isInPosition ? ' letter-green' : '' 
  const letterYellow = isInWord && !isInPosition ? ' letter-yellow' : '';
  const filledLetter = letter ? ' filled-letter' : '';
  return <div className={"letter" + filledLetter + letterGreen + letterYellow} >
    { letter}
  </div>;
})

export default Box