/*import { useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function Box({ color, scale, position }, props) {
    const [ hookColor ] = useState(color);
    const [ hookScale ] = useState(scale);
    const [ hookPosition, setHookPosition ] = useState([0, 0, 0]);
    const ref = useRef();

    const randomSpeed = Math.random() * 0.03;

    useState(() => {
        setRandomPosition();
    }, [setHookPosition])

    function setRandomPosition() {
        var randomX = Math.floor((Math.random() * 3) + 1);
        randomX *= Math.round(Math.random()) ? 1 : -1;
        var randomY = Math.floor((Math.random() * 3) + 1);
        randomY *= Math.round(Math.random()) ? 1 : -1;
        var randomS = Math.floor((Math.random() * 2) + 1)

        setHookPosition([
            randomX,
            randomY,
            randomS,
        ])
    }

    useFrame(() => {
      ref.current.rotation.x = ref.current.rotation.y += randomSpeed;
    })
    return (
      <mesh
        {...props}
        position={hookPosition}
        ref={ref}
        scale={hookScale}
        onPointerOver={setRandomPosition}
        onClick={setRandomPosition}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hookColor} />
      </mesh>
    )
}  

function Background() {
    return (
        <div></div>
    )
    /*return (
        <Canvas style={{position: "absolute", float: "right"}}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
            <pointLight position={[-10, -10, -10]} />
            <Box scale="1" color="red" ></Box>
            <Box scale="1.2" color="red"></Box>
        </Canvas>
    )
}*/
// eslint-disable-next-line
export default () => { return <div></div>};