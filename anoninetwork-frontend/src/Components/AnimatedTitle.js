function AnimatedTitle({ text }) {
    return (
        <div className="typing">
            <h1 className="bouncing-animation">{text}</h1>
        </div>
    )
}

export default AnimatedTitle;