import React from "react";

interface Props {
    children: React.ReactNode;
    heightValue: string;
}

const Slide: React.FC<Props> = ({children, heightValue}) => {
    return (
        <div 
            style={
                {
                    height: heightValue,
                    overflow: 'hidden',
                    width: '100%',
                    position:'relative'
                }
            }
        >
            {children}
        </div>
    )
}

export default Slide;