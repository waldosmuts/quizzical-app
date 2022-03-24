import React from "react"
import { decode } from 'html-entities'
import { nanoid } from "nanoid"

export default function Question(props) {
    const answerElements = props.data.options.map(option => {
        const answerSelected = false
        const isAnswer = option.id === props.data.answer.id
        const classList = `item--answer ${answerSelected ? "item-selected" : ""} ${isAnswer ? "item--correct" : "item--wrong"}`
        return (
            <label 
                key={nanoid()} 
                className={classList}
                onClick={() => props.selectOption(props.data.id, option.id)}
            >
                <input type="radio" name={props.data.id} value={option.id} />{decode(option.value)}
            </label>
        )
    })
    
    return (
        <div className="quiz--item">
            <h3 className="item--question">{decode(props.data.question)}</h3>
            <form className="item--form">
                {answerElements}
            </form>
            <div className="divider" />
        </div>
    )
}