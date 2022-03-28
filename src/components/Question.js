import React from "react"
import { decode } from 'html-entities'
import { nanoid } from "nanoid"

export default function Question(props) {
    const answerElements = props.data.options.map(option => {
        let classList
        if (props.quizCheck) {
            classList = `item--option ${props.questionData.value === option.id && (option.id !== props.data.answer.id && "item--wrong")} ${option.id === props.data.answer.id && "item--correct"}`
        } else {
            classList = `item--option ${props.questionData.value === option.id && "item--selected"}`
        }
        return (
            <label
                key={nanoid()}
                className={classList}
            >
                <input type="radio" name={props.data.id} value={option.id} onChange={(e) => props.selectOption(e)} />{decode(option.value)}
            </label>
        )
    })

    return (
        <div className="quiz--item">
            <h3 className="item--question">{decode(props.data.question)}</h3>
            <div className="item--options">
                {answerElements}
            </div>
            <div className="divider" />
        </div>
    )
}