import { useState, useEffect, ChangeEvent } from "react";
import axios from "axios";
import type { SelectOption } from "./SelectBox";

import GetJoke from "./GetJoke";




const GetCategories = () => {
    const [categoriesState, setCategoriesState] = useState({
        categories: ['']
    })


    const fetchCategories = async () => {
        const result = await axios.get(`https://api.chucknorris.io/jokes/categories`)
        console.log(result.data)

        setCategoriesState ({
            ...categoriesState,
            categories: result.data

        })
    }
    useEffect( () => {
        fetchCategories()
    }, [])



    
    // Dropdown category selection
    const options: SelectOption[] = [
        { label: "Category", value: ''},

        ...categoriesState.categories.map( (category) => ({ label: category, value: category })),
    ]

    const [value, setValue] = useState('')

    const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value)
    }

    

    return (
        <div className="GetCategories">
            
            <GetJoke 
                category={value}
                options={options}
                onChange={onChange}
            />
            
        </div>
    )
}

export default GetCategories
