import React, { useState, useEffect } from "react";
import axios from "axios";

function Form() {
    const [input, setInput] = useState("");
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleSubmit = async () => {
        try {
            const jsonInput = JSON.parse(input);
            const res = await axios.post("https://bajaj-backend-q96q.onrender.com/bfhl", jsonInput);
            
            console.log("API Response:", res.data); // Debugging API response
            
            setResponse({ ...res.data }); // Ensure re-render
            setError(null);
        } catch (err) {
            console.error("Error:", err);
            setError("Invalid JSON or server error");
        }
    };

    const handleOptionChange = (event) => {
        const { value, checked } = event.target;
        setSelectedOptions(prev =>
            checked ? [...prev, value] : prev.filter(item => item !== value)
        );
    };

    // Debugging: Log response whenever it updates
    useEffect(() => {
        console.log("Updated Response State:", response);
    }, [response]);

    return (
        <div>
            <h2>Bajaj Finserv Health Dev Challenge</h2>
            <textarea
                placeholder='Enter JSON input'
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleSubmit}>Submit</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {/* Debugging: Ensure response object is properly structured */}
            {response && console.log("Rendering Response:", response)}

            {response && Object.keys(response).length > 0 && (
                <>
                    <label>
                        <input type="checkbox" value="alphabets" onChange={handleOptionChange} />
                        Alphabets
                    </label>
                    <label>
                        <input type="checkbox" value="numbers" onChange={handleOptionChange} />
                        Numbers
                    </label>
                    <label>
                        <input type="checkbox" value="highest_alphabet" onChange={handleOptionChange} />
                        Highest Alphabet
                    </label>

                    <div>
                        {selectedOptions.includes("alphabets") && response.alphabets?.length > 0 && (
                            <p>Alphabets: {response.alphabets.join(", ")}</p>
                        )}
                        {selectedOptions.includes("numbers") && response.numbers?.length > 0 && (
                            <p>Numbers: {response.numbers.join(", ")}</p>
                        )}
                        {selectedOptions.includes("highest_alphabet") && response.highest_alphabet?.length > 0 && (
                            <p>Highest Alphabet: {response.highest_alphabet.join(", ")}</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default Form;
