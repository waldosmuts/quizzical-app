import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import Question from "./Question"

export default function Quiz(props) {
    const [questions, setQuestions] = useState([])
    const [quizData, setQuizData] = useState([])
    const [quizCheck, setQuizCheck] = useState(false)
    const [gameScore, setGameScore] = useState(0)

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

    useEffect(() => {
        getQuestions()
    }, [])

    useEffect(() => {
        setQuizData(() => {
            return questions.map(question => ({ id: question.id, value: "" }))
        })
    }, [questions])

    function selectOption(e) {
        setQuizData(prevQuizData => {
            const newQuizData = prevQuizData.map(question => (question.id === e.target.name ? { ...question, value: e.target.value } : question))
            return newQuizData
        })
        setGameScore(() => {
            let score = 0
            const gameAnswers = questions.map(question => question.answer.id)
            const playerAnswers = quizData.map(question => question.value)
            for (let i = 0; i < gameAnswers.length; i++) {
                gameAnswers[i] === playerAnswers[i] && score++
            }
            return score
        })
    }

    const quizElements = questions.map(question => {
        const questionData = !!quizData.find(questionData => (questionData.id === question.id)) ? quizData.find(questionData => (questionData.id === question.id)) : false
        return (
            <Question
                key={question.id}
                data={question}
                questionData={questionData}
                quizCheck={quizCheck}
                selectOption={selectOption}
            />
        )
    })

    function handleSubmit(e) {
        e.preventDefault()
        if (quizCheck) {
            setQuizCheck(false)
            props.updateGameState("options")
        } else {
            setQuizCheck(true)
        }
    }

    return (
        <form onSubmit={e => handleSubmit(e)} className="quiz">
            {quizElements}
            <div>{quizCheck && <span className="quiz--results">You Scored {gameScore}/5</span>}<button className="quiz--button">{quizCheck ? "Try Again" : "Check Answers"}</button></div>
        </form>
    )
}