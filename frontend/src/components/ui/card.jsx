import React from 'react';

const Card = ({ className, children, ...props }) => {
  return (
    <div
      className={`
        bg-white
        border border-[#d4c9a8]
        rounded-lg
        shadow-sm
        overflow-hidden
        transition-all duration-200
        hover:shadow-md
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ className, children, ...props }) => {
  return (
    <div
      className={`
        p-6
        border-b border-[#d4c9a8]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const CardTitle = ({ className, children, ...props }) => {
  return (
    <h3
      className={`
        text-lg font-semibold text-[#4b2e2e]
        ${className}
      `}
      {...props}
    >
      {children}
    </h3>
  );
};

const CardDescription = ({ className, children, ...props }) => {
  return (
    <p
      className={`
        text-sm text-[#8b7d6b]
        ${className}
      `}
      {...props}
    >
      {children}
    </p>
  );
};

const CardContent = ({ className, children, ...props }) => {
  return (
    <div
      className={`
        p-6
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

const CardFooter = ({ className, children, ...props }) => {
  return (
    <div
      className={`
        p-6
        border-t border-[#d4c9a8]
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

Card.Header = CardHeader;
Card.Title = CardTitle;
Card.Description = CardDescription;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card; 