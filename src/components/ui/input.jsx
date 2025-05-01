import React from 'react';

const Input = React.forwardRef(({ className, error, label, helperText, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#4b2e2e] mb-1">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5
          border ${error ? 'border-[#c45c4c]' : 'border-[#d4c9a8]'}
          rounded-lg
          bg-white
          text-[#4b2e2e]
          placeholder-[#8b7d6b]
          shadow-sm
          transition-all duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-opacity-50
          ${error ? 'focus:ring-[#c45c4c]' : 'focus:ring-[#4b2e2e]'}
          focus:border-transparent
          disabled:bg-[#f8f4e3]
          disabled:cursor-not-allowed
          ${className}
        `}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-[#c45c4c]' : 'text-[#8b7d6b]'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input; 