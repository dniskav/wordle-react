export interface GameContextType {
  testedWordsList: TestWord[];
  setTestedWordsList: React.Dispatch<React.SetStateAction<TestWord[]>>;
}

export type TestWord = TestLetter[]

export interface TestLetter {
  letter: string
  isInWord: boolean
  isInPosition: boolean
}
