import React from 'react';

const Button = React.forwardRef(({ 
  className, 
  variant = 'default', 
  size = 'md',
  isLoading,
  disabled,
  children,
  ...props 
}, ref) => {
  const baseStyles = `
    inline-flex items-center justify-center
    font-medium
    rounded-lg
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
  `;
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const variants = {
    default: `
      bg-[#4b2e2e] text-white
      hover:bg-[#3a2323]
      focus:ring-[#4b2e2e]
      shadow-sm
    `,
    secondary: `
      bg-[#f8f4e3] text-[#4b2e2e]
      hover:bg-[#f0e9d2]
      focus:ring-[#d4c9a8]
    `,
    outline: `
      border border-[#4b2e2e]
      bg-white text-[#4b2e2e]
      hover:bg-[#f8f4e3]
      focus:ring-[#4b2e2e]
    `,
    danger: `
      bg-[#c45c4c] text-white
      hover:bg-[#b34a3a]
      focus:ring-[#c45c4c]
      shadow-sm
    `,
  };

  return (
    <button
      className={`
        ${baseStyles}
        ${sizes[size]}
        ${variants[variant]}
        ${className}
      `}
      disabled={disabled || isLoading}
      ref={ref}
      {...props}
    >
      {isLoading ? (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      ) : null}
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 