import React, { FC, ReactNode } from 'react';
import useStyles from './styles';

interface CardProps {
    children?: ReactNode,
    title?: string,
    className?: string
}

const Card: FC<CardProps> = ({ children, title, className = '' }:CardProps) => {
  const classes = useStyles();
  return (
    <div data-testid="card" className={className}>
      {title ? <h2 className="font-semibold text-sm text-title-light dark:text-secondary">{title}</h2> : ''}
      <div className={`${classes.card} bg-white rounded-sm dark:bg-primary-dark text-body-light dark:text-secondary mt-4 p-4`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
