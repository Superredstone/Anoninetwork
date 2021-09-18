function AnimatedTitle({ text }) {
    return (
        <div className="typing">
            <a href="/" style={{color: "black", textDecoration: "none"}}><h1 className="bouncing-animation">{text}</h1></a>
        </div>
    )
}

export default AnimatedTitle;