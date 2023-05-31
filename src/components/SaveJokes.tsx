import React, { useState, useEffect } from 'react';


interface SaveJokesProps {
  initialValue?: number;
  fetchChosenJoke: () => Promise<string>;
}



const SaveJokes: React.FC<SaveJokesProps> = ({ initialValue = 0, fetchChosenJoke }) => {
    const [value, setValue] = useState(initialValue);
    const [controlMessage, setControlMessage] = useState('');


    useEffect(() => {
        setControlMessage('');
    }, [value]);



    

    const incrementValue = () => {
        setValue((prevValue) => prevValue + 1);
    };

    const decrementValue = () => {
        setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(event.target.value, 10);

        if (isNaN(newValue)) {
            setValue(0);
        } else {
            setValue(newValue);
        }
    };


    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const { value: inputValue } = event.target;

        if (inputValue.trim() === '') {
            setValue(0);
        } else {
            setValue(parseInt(inputValue, 10));
        }
    };



    
    let numOfJokes = value;
    const handleSaveJokesClick = async () => {
        if( value === 0 || value > 100) {
            setControlMessage('You can pick a number from 1 to 100.');
            return;
        }
        try {
            const jokes = [];

            for (let i = 0; i < numOfJokes; i++) {
                const joke = await fetchChosenJoke();
                jokes.push(joke);
            }

            const formattedJokes = jokes.map((joke: string) => joke + '\n\n').join('');

            const filename = 'jokes.txt';
            const blob = new Blob([formattedJokes], { type: 'text/plain' });

            const downloadLink = document.createElement('a');
            downloadLink.href = URL.createObjectURL(blob);
            downloadLink.download = filename;
            downloadLink.click();
            URL.revokeObjectURL(downloadLink.href);
        
        } catch (error) {
            console.error('Error fetching or saving jokes:', error);
        }

        setControlMessage('');
    };




    return (
        <div className='counter'>
            <div className='counter-top'>
                <div className="counter-group">
                    <div
                        className="button minus"
                        onClick={decrementValue}
                    >
                        -
                    </div>

                    <input
                        type="number"
                        step="1"
                        max=""
                        //value={value}
                        value={Number(value).toString()}
                        name="quantity"
                        className="quantity-field"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />


                    <div
                        className="button plus"
                        onClick={incrementValue}
                    >
                        +
                    </div>
                </div>

                
                <div className='saveJokes' onClick={handleSaveJokesClick}>
                        Save jokes
                </div>
            </div>

            {controlMessage && <div className='controlMessage'>{controlMessage}</div>}
        </div>
    );
};

export default SaveJokes;