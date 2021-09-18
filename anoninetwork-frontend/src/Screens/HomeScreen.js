import { useForm } from 'react-hook-form';
import axios from 'axios';
import Post from "../Components/Post";
import ReactTagInput from "@pathofdev/react-tag-input";
import { useEffect, useState } from 'react';
import AnimatedTitle from '../Components/AnimatedTitle';

const backendIP = "http://172.20.1.26:3001"

const AntiSwear = require("capo-anti-swear");
const WordFilterIT = new AntiSwear("it");
const WordFilterEN = new AntiSwear("en");

function HomeScreen() {
    const [ appState, setAppState ] = useState({
        loading: false,
        posts: [{
            Title: String,
            Content: String,
            Tags: String
        }],
    })

    const [ newTags, setNewTags ] = useState([]);

    const { handleSubmit, register, watch } = useForm();

    useEffect(() => {
        setAppState({ loading: true });

        axios.get(backendIP + "/getposts")
            .then(response => {
                setAppState({ posts: response.data.Posts, loading: false, postIndex: 0 });
            })
            .catch(error => {
                console.log(error);
            });

    }, [setAppState])

    function HandleCreatePost() {
        setAppState({ loading: true });

        const filtredTitle = WordFilterEN.clean(WordFilterIT.clean(watch("post-title")));
        const filtredContent = WordFilterEN.clean(WordFilterIT.clean(watch("post-content")));

        const data = {
            Title: filtredTitle,
            Content: filtredContent,
            Tags: newTags.join(" ")
        }

        if (String(data.Title).length < 5 || String(data.Title).length > 50  || String(data.Content).length < 5 || String(data.Content).length > 500) {
            window.location.href = "/";
        } else {

            axios.post(backendIP + "/createpost", data)
            .then(response => {
                console.log(response);
                window.location.href = "/";
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    return (
        <div className="card-content" style={{margin: 15}}>
            <div className="card-title" style={{marginTop: 8}}>
                <AnimatedTitle text="Anoninetwork" />
            </div>
            <div className="btn-container">
                <div className="btn-holder">
                    <button className="btn btn-primary rounded-circle bottom-right" data-bs-toggle="modal" data-bs-target="#createNewPostModal">+</button>
                </div>
            </div>

            <div className="modal fade" id="createNewPostModal" tabIndex="-1" aria-labelledby="createNewPostModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-body">
                            {
                                !appState.loading ? 
                                    <form className="create-post-form" onSubmit={handleSubmit(HandleCreatePost)}>
                                        <div className="form-floating">
                                            <input className="form-control" placeholder="." {...register("post-title")} autoComplete="off"></input>
                                            <label>Titolo del post</label>
                                        </div>
                                        <div className="form-floating">
                                            <textarea contentEditable suppressContentEditableWarning type="text" className="form-control create-post-content" placeholder="." style={{height: "30vh", resize: "none"}} {...register("post-content")}></textarea>
                                            <label>Contenuto del post</label>
                                        </div>
                                        <div className="form-floating">
                                            <ReactTagInput 
                                                tags={newTags} 
                                                onChange={(t) => {
                                                    t[t.length -1] = "#" + t[t.length -1]
                                                    setNewTags(t)
                                                }} 
                                                validator={(value) => {
                                                    if (WordFilterIT.check(value) || WordFilterEN.check(value)) {
                                                        return false
                                                    }
                                                    if (value === "Moderator") {
                                                        return false
                                                    } else {
                                                        return true
                                                    }
                                                }}
                                                editable={true}
                                                readOnly={false}
                                                removeOnBackspace={true}
                                                maxTags={10}
                                                placeholder="Scrivi qui i tuoi tag e premi invio per aggiungerli"
                                            />
                                        </div>
                                        <div style={{marginTop: 10}}>
                                            <i>
                                                Attenzione: se il contenuto del post o il titolo ha meno di 5 caratteri 
                                                il post non verrà creato e si verrà reindirezzati alla schermata home
                                            </i>
                                        </div>
                                        <div className="modal-footer">
                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancella</button>
                                            <button className="btn btn-success" type="submit">Crea</button>
                                        </div>
                                    </form>
                                : 
                                    <div className="spinner-border loading-spinner" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className="posts">
                {
                    !appState.loading ?
                        appState.posts.slice(0).reverse().map((x, i) => {
                            if (String(x.Tags).indexOf("#Moderator") >= 0) {
                                return <Post style={{marginTop: 10, backgroundColor: "green"}} Title={x.Title} Content={x.Content} Tags={x.Tags} key={i} />
                            } else {
                                return <Post style={{marginTop: 10}} Title={x.Title} Content={x.Content} Tags={x.Tags} key={i} />
                            }
                        })
                    : 
                    <div className="spinner-border loading-spinner" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default HomeScreen;