import React from 'react'
import { useFetch } from '@rickbrown/use-fetch'
import uuid from 'react-uuid'

function App() {
  const [response, error, isLoading] = useFetch(
    'https://opentdb.com/api.php?amount=10'
  )

  const [isCorrect, setIsCorrect] = React.useState('')

  const onClickHandler = (answer, correct) => {
    if (correct === answer) {
      setIsCorrect(true)
    }
    setIsCorrect(false)
  }

  if (isLoading) {
    return (
      <div>
        <p>loading</p>
      </div>
    )
  }

  if (response.data) {
    const questions = response.data.results
    console.log({ questions })
    return (
      <div>
        <ul>
          {questions.map(question => {
            const answers = [
              ...question.incorrect_answers,
              question.correct_answer,
            ]
            return (
              <li key={uuid()}>
                <h3>{question.category}</h3>
                <h4>{question.difficulty}</h4>
                <h4 dangerouslySetInnerHTML={{ __html: question.question }} />
                <ul>
                  {answers.map(answer => (
                    <p
                      dangerouslySetInnerHTML={{ __html: answer }}
                      onClick={() =>
                        onClickHandler(answer, question.correct_answer)
                      }
                    />
                  ))}
                </ul>
              </li>
            )
          })}
        </ul>
        {isCorrect ? 'Correct' : 'Incorrect'}
        {error && <div>{error.message}</div>}
      </div>
    )
  }

  return (
    <div>
      <p>hmm..</p>
    </div>
  )
}

export default App
