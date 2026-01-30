import React from 'react';

const Textarea = React.forwardRef(({ className, error, label, helperText, ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-[#333333] mb-1">
          {label}
        </label>
      )}
      <textarea
        className={`
          w-full px-4 py-2.5
          border ${error ? 'border-red-500' : 'border-[#D2B48C]'}
          rounded-lg
          bg-white
          text-[#333333]
          placeholder-[#666666]
          shadow-sm
          transition-all duration-200
          focus:outline-none
          focus:ring-2
          focus:ring-opacity-50
          ${error ? 'focus:ring-red-500' : 'focus:ring-[#A0522D]'}
          focus:border-transparent
          disabled:bg-[#F5F5DC]
          disabled:cursor-not-allowed
          resize-none
          min-h-[100px]
          ${className}
        `}
        ref={ref}
        {...props}
      />
      {helperText && (
        <p className={`mt-1 text-sm ${error ? 'text-red-500' : 'text-[#666666]'}`}>
          {helperText}
        </p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

export default Textarea; 