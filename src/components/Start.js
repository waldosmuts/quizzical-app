import React from "react"

export default function Start(props) {
    return (
        <div className="start">
            <h1 className="start--header">Quizzical</h1>
            <h2 className="start--description">Go Quiz Yourself!</h2>
            <button 
                className="start--button" 
                onClick={() => props.updateGameState("options")}
            >Select A Category</button>
        </div>
    )
}