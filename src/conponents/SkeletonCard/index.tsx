import React, { CSSProperties } from 'react';
interface CardSkeletonProps {
    style?:CSSProperties;
}

const SkeletonCard: React.FC<CardSkeletonProps> = ({style}) => {
    return (
        <div className={`skeleton`} style={style}>
        </div>
    );
};

export default SkeletonCard;