import axios from "axios";
import { useEffect, useState } from "react";
import { Redirect, useLocation } from "react-router";
import Consts from "../Consts";

const defaultStatus = {
    error: null as any,
    isLoading: false,
    showModal: false,
    redirect: false,
    NewQuery: "",
    NewPost: {
        Title: "",
        Content: "",
    },
    Posts: [
        {
            Title: "Post title",
            Content: "Post content",
        }
    ]
}

function Home() {
    const [ Status, setStatus ] = useState(defaultStatus);

    const query = new URLSearchParams(useLocation().search).get("query");

    useEffect(() => {
        function GetPosts() {
            setStatus(S => ({...S, isLoading: true}));
            if (query) {
                axios.post(Consts.BACKEND_IP + "/queryposts", {Content: query})
                    .then((response: any) => {
                        setStatus(S => ({...S, isLoading: false, Posts: response.data.Results}));
                    })
                    .catch((error) => {
                        setStatus(S => ({...S, isLoading: false, error: error}));
                    })
            } else {
                axios.get(Consts.BACKEND_IP + "/posts")
                .then(((response: any) => {
                    setStatus(S => ({...S, isLoading: false, Posts: response.data.Posts}));
                }))
                .catch((error) => {
                    setStatus(S => ({...S, isLoading: false, error: error}));
                });
            }
        }

        GetPosts();
    }, [setStatus, query])

    function CreateNewPost() {
        if (Status.NewPost.Title.length < 4 || Status.NewPost.Title.length > 50  || Status.NewPost.Content.length < 5 || Status.NewPost.Content.length > 500) {
            setStatus({...Status, error: "Invalid post title or content lenght"});
        } else {
            setStatus({...Status, isLoading: true});
            axios.post(Consts.BACKEND_IP + "/createpost", Status.NewPost)
                .then(() => {
                    setStatus({...Status, isLoading: false});
                })
                .catch((error) => {
                    setStatus({...Status, isLoading: false, error: error});
                });
        }
    }

    function RedirectQuery() {
        new Promise(resolve => setTimeout(resolve, 500)).then(() => {
            setStatus({...Status, redirect: true});
        })
    }

    return (
        <div>
            {
                Status.showModal ?
                    <div className="fixed h-screen w-screen bg-gray-100 bg-opacity-60">
                        <div className="flex justify-center">
                            <div className="xl:w-2/5 md:4/5 sm:4/5 bg-white shadow-xl p-10 mt-10 rounded-xl">
                                <div className="w-full">
                                    <div className="flex justify-end" onClick={() => {setStatus({...Status, showModal: false})}}>
                                        <div className="bg-green-300 shadow-xl rounded-full w-5 h-5 mr-2"></div>
                                        <div className="bg-yellow-300 shadow-xl rounded-full w-5 h-5 mr-2"></div>
                                        <div className="bg-red-300 shadow-xl rounded-full w-5 h-5"></div>
                                    </div>
                                    <p className="xl:text-3xl sm:text-2xl" style={{marginTop: -10}}>Create new post</p>
                                </div>
                                <form className="mt-3" onSubmit={CreateNewPost}>
                                    <input className="p-3 shadow-xl w-full hover:bg-gray-100 rounded-xl mt-3" placeholder="Title" onChange={(e) => {setStatus({...Status, NewPost: {...Status.NewPost, Title: e.target.value}})}}></input>
                                    <textarea className="p-3 shadow-xl w-full hover:bg-gray-100 rounded-xl mt-3" placeholder="Content" onChange={(e) => {setStatus({...Status, NewPost: {...Status.NewPost, Content: e.target.value}})}}></textarea>
                                    <div className="flex justify-end">
                                        <button className="p-3 shadow-xl hover:bg-gray-100 rounded-xl mt-4 w-40" style={{marginBottom: -20}} type="submit">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                : null
            }
            <div>
                {
                    Status.error ?
                        <div className="flex justify-center">
                            <div className="bg-red-500 rounded-xl w-1/2 p-5 mt-5 text-white">
                                ERROR: <p>{Status.error}</p>
                            </div>
                        </div>
                    : null
                }
                <div className="flex justify-center pt-8">
                    <p className="text-4xl">Anoninetwork</p>
                </div>
                <div className="flex justify-center mt-3 mb-3 h-10">
                    <input className="w-3/5 p-3 shadow-xl rounded-xl hover:bg-gray-100" placeholder="Search" onChange={(e) => {setStatus({...Status, NewQuery: e.target.value})}}></input>
                    <button className="shadow-xl rounded-xl hover:bg-gray-100 p-2 ml-3" onClick={RedirectQuery}>Search</button>
                </div>
                <div className="flex justify-center">
                    <button className="hover:bg-gray-100 p-5 shadow-2xl rounded-xl w-3/5" onClick={() => setStatus({...Status, showModal: true})}>Create new post</button>
                </div>
                {
                    Status.isLoading ? 
                        <div className="p-10">Loading...</div>
                    : 
                        <div>
                            {
                                Status.Posts.slice(0).reverse().map((Post, i) => {
                                    return (
                                        <div className="flex p-5 bg-white hover:bg-gray-100 rounded-xl shadow-2xl h-auto m-5" key={i}>
                                            <span>
                                                <h1 className="text-2xl">{Post.Title}</h1>
                                                <p className="mt-2">{Post.Content}</p>
                                            </span>
                                        </div>
                                    )
                                })
                            }
                        </div>
                }
            </div>

            <div className="text-center mt-20 mb-20 w-full h-auto">
                <div>Created with &#10084; by Patrick</div>
                <a className="underline" href="https://github.com/Superredstone/Anoninetwork/">Github page</a>
            </div>

            {
                Status.redirect ? 
                    <Redirect to={"/?query=" + Status.NewQuery}></Redirect>
                : null
            }
        </div>
    )
}

export default Home;