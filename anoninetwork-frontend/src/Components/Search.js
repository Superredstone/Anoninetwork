import { useState } from "react";

function Search() {
    const [ query, setQuery ] = useState();

    function handleSubmit() {
        if (query === undefined) {
            window.location.href = "/";
        } else {
            window.location.href = "/query/" + query;
        }
    }

    return (
            <div className="input-group mb-3">
                <input 
                    onChange={(e) => setQuery(e.target.value)} 
                    type="text" 
                    className="form-control" 
                    autoComplete="off" 
                    placeholder="Search a post">
                </input>
                <button type="submit" onClick={handleSubmit} className="btn btn-primary">Search</button>
            </div>
    )
}

export default Search;