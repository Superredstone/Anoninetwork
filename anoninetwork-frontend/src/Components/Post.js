import { useState } from "react";

function Post(props) {
    /*
        Sto codice è una merda unica, se non faccio i props prima di usare la 
        variabile props React mi picchia
    */

    const [ Title ] = useState(props.Title);
    const [ Tags ] = useState(props.Tags);
    const [ Content ] = useState(props.Content);

    return (
        <div className="card" style={props.style}>
            <div className="card-body">
                <h5 className="post-title">{Title}</h5>
                <p>{Content}</p>
                <i>{Tags}</i>
            </div>
        </div>
    )
}

export default Post;