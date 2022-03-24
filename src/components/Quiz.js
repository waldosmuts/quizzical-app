import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Question from "./Question"

export default function Quiz(props) {
    const [questions, setQuestions] = useState([])
    const [quizData, setQuizData] = useState([])
    
    useEffect(() => {
        async function getQuestions() {
            const url = `https://opentdb.com/api.php?amount=5&type=multiple${props.options.category === 1 ? "" : `&category=${props.options.category}`}${props.options.difficulty === "any" ? "" : `&difficulty=${props.options.difficulty}`}`
            const res = await fetch(url)
            const data = await res.json()
            setQuestions(data.results.map(item => {
                const questionObject = {
                    id: nanoid(),
                    question: item.question,
                    options: item.incorrect_answers.map(item => ({ id: nanoid(), value: item })),
                    answer: { id: nanoid(), value: item.correct_answer }
                }
                const rand = Math.floor(Math.random() * 3)
                 questionObject.options.splice(rand, 0, questionObject.answer)
                return questionObject
            }))
        }
        getQuestions()
    }, [])
    
    function selectOption(questionID, optionID) {
        console.log(questions.find(question => question.id === questionID))
    }
    
    const quizElements = questions.map(question => {
        return (
            <Question 
                key={question.id}
                data={question}
                selectOption={selectOption}
            />
        )
    })
        
    return (
        <div className="quiz">
            {quizElements}
        </div>
    )
}