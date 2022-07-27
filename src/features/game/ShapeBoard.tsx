import * as React from "react";
import * as Konva from "react-konva";
import { Box } from "@mui/material";
import ShapeFactory, { Shape } from "./shapes";
import useEventListener from "../../hooks/useEventListener";
import useTimeout from "../../hooks/useTimeout";
import { useAppDispatch } from "../../app/hooks";
import { setSide } from "./game.slice";

interface Size {
    height: number;
    width: number;
}

interface ShapeBoardProps {
    draw: boolean;
}

export default function ShapeBoard({ draw }: ShapeBoardProps) {
    const dispatch = useAppDispatch();
    const ref = React.useRef<HTMLElement>(null);
    const [size, setSize] = React.useState<Size | null>(null);
    const shape = React.useMemo<Shape>(() => {
        const shape = new ShapeFactory(size?.height, size?.width).create();
        dispatch(setSide(shape.getSide(size?.width)));
        return shape;
    }, [size]);

    React.useEffect(() => {
        if (ref.current) {
            setSize({ height: ref.current?.clientHeight, width: ref.current?.clientWidth });
        }
    }, [ref]);

    const handleResize = React.useCallback(() => {
        if (ref.current) {
            setSize({ height: ref.current?.clientHeight, width: ref.current?.clientWidth });
        }
    }, [ref]);

    useEventListener("resize", handleResize);

    useTimeout(() => setSize(null), 2000);

    return (
        <Box height="60vh" ref={ref} border={2}>
            {size && (
                <Konva.Stage height={size.height} width={size.width}>
                    <Konva.Layer>
                        {draw && shape.draw()}
                        <Konva.Line
                            x={size.width / 2}
                            y={0}
                            points={[0, 0, 0, size.height]}
                            stroke="black"
                            strokeWidth={2}
                        />
                    </Konva.Layer>
                </Konva.Stage>
            )}
        </Box>
    );
}


// const [visible, setVisible] = useState(true)

// const hide = () => setVisible(false)

// useTimeout(hide, 5000)

// return (
//     <div>
//         <p>
//             {visible
//                 ? "I'm visible for 5000ms"
//                 : 'You can no longer see this content'}
//         </p>
//     </div>
// )


// import * as React from "react";
// import * as Konva from "react-konva";
// import { Box } from "@mui/material";
// import ShapeFactory, { Shape } from "./shapes";
// import { useAppDispatch } from "../../app/hooks";
// import { setSide } from "./game.slice";

// interface Size {
//     height: number;
//     width: number;
// }

// interface ShapeBoardProps {
//     draw: boolean;
// }

// export default function ShapeBoard({ draw }: ShapeBoardProps) {
//     const dispatch = useAppDispatch();
//     const ref: React.RefObject<HTMLElement> = React.useRef(null);
//     const [size, setSize] = React.useState<Size | null>(null);

//     const shape = React.useMemo(() => {
//         const height = ref.current ? ref.current.clientHeight : window.innerHeight;
//         const width = ref.current ? ref.current.clientWidth : window.innerWidth;
//         setSize({ height, width });
//         const shape = new ShapeFactory(height, width).create();
//         dispatch(setSide(shape.getSide(width)));
//         return () => shape.draw();
//     }, [ref]);

//     return (
//         <Box height="85vh" ref={ref}>
//             {size && (
//                 <Konva.Stage height={size?.height} width={size?.width}>
//                     <Konva.Layer>
//                         {draw && shape()}
//                         <Konva.Line
//                             x={size ? size.width / 2 : window.innerWidth / 2}
//                             y={0}
//                             points={[0, 0, 0, size?.height || window.innerHeight]}
//                             stroke="black" />
//                     </Konva.Layer>
//                 </Konva.Stage>
//             )}
//         </Box>
//     );
// }
