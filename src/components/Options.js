import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"

export default function Options(props) {
    const [categories, setCategories] = useState([{ id: 1, name: "Any Category" }])
    
    useEffect(() => {
        let mounted = true
        // Dynamically gets categories from API
        async function getCategories() {
            const res = await fetch("https://opentdb.com/api_category.php")
            const data = await res.json()
            if (mounted) {
                setCategories((prevCategories) => ([
                    ...prevCategories,
                    ...data.trivia_categories
                ]))
            }
        }
        getCategories()
        // Cleanup
        return () => {
            mounted = false
        }
    }, [])
    
    const categoryElements = categories.map(category => (
        <option key={nanoid()} value={category.id}>{category.name}</option>
    ))
    
    function handleSubmit(e) {
        e.preventDefault()
        props.updateGameState("quiz")
    }

    return (
        <form className="options" onSubmit={handleSubmit}>
            <label className="options--label">Category</label>
            <select 
                name="category" 
                value={props.options.category} 
                onChange={props.updateOptions}
                className="options--select"
            >
                {categoryElements}
            </select>
            <label className="options--label">Difficulty</label>
            <select 
                name="difficulty" 
                value={props.options.difficulty} 
                onChange={props.updateOptions}
                className="options--select"
            >
                <option value="any">Any Difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>
            <button className="options--button">Start Quiz</button>
        </form>
    )
}