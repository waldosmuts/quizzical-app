import React, { useState } from "react"
import Start from "./components/Start"
import Options from "./components/Options"
import Quiz from "./components/Quiz"

export default function App() {
    const [options, setOptions] = useState({ category: 1, difficulty: "any", gameState: "start" })
    
    function updateOptions(e) {
        const { name, value } = e.target
        setOptions(prevOptions => ({
            ...prevOptions,
            [name]: value
        }))
    }
    
    function updateGameState(newGameState) {
        setOptions(prevOptions => ({
            ...prevOptions,
            gameState: newGameState
        }))
    }
    
    return (
        <div className="wrapper">
            <img className="blob" src="./images/blob-right.svg" alt="" />
            {options.gameState === "start" && 
                <Start updateGameState={updateGameState} 
            />}
            {options.gameState === "options" && 
                <Options 
                    options={options} 
                    updateOptions={updateOptions} 
                    updateGameState={updateGameState} 
                />
            }
            {options.gameState === "quiz" && 
                <Quiz 
                    options={options} 
                    updateGameState={updateGameState} 
                />
            }
            <img className="blob" src="./images/blob-left.svg" alt="" />
        </div>
    )
}