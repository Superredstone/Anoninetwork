import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import AnimatedTitle from "../Components/AnimatedTitle";
import Post from "../Components/Post";
import Search from "../Components/Search";
import Const from "../Const";

function Query(props) {
    const { query } = useParams();
    const  [ queryResults, setQueryResults ] = useState([]);
    const [ isLoading, setIsLoading ] = useState(false);

    useEffect(() => {
        setIsLoading(true);

        axios.post(Const.backendIP + "/queryposts", {"Content": query})
            .then((response) => {
                setIsLoading(false);
                setQueryResults(response.data.Results);
            })
            .catch((error) => {
                setIsLoading(false);
                setQueryResults("Error 404");
            })
    }, [setQueryResults, setIsLoading, query])

    return (
        <div className="card-content" style={{margin: 15}}>
            <div className="card-title">
                <AnimatedTitle text="Anoninetwork"></AnimatedTitle>
            </div>
            
            <Search></Search>

            {
                isLoading ? 
                    <div className="spinner-border loading-spinner"></div>
                :
                    <div>
                        {
                            queryResults.map((post, i) => {
                                return <Post style={{marginTop: 10}} Title={post.Title} Content={post.Content} Tags={post.Tags} key={i}></Post>
                            })
                        }
                        <div>
                            {
                                queryResults.length === 0 ?
                                    "No results found"
                                : null
                            }
                        </div>
                    </div> 
            }
        </div>
    )
}

export default Query;