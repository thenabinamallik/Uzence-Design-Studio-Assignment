import React, { useState } from 'react';
import clsx from 'clsx';
import type { InputFieldProps } from "../../types/InputField";

const sizeMap = {
  sm: 'px-2 py-1 text-sm',
  md: 'px-3 py-2 text-base',
  lg: 'px-4 py-3 text-lg',
};

const variantMap = {
  filled: 'bg-gray-100 border border-transparent focus:border-blue-500',
  outlined: 'bg-transparent border border-gray-300 focus:border-blue-500',
  ghost: 'bg-transparent border border-transparent focus:border-blue-500',
};

export const InputField: React.FC<InputFieldProps> = ({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = 'outlined',
  size = 'md',
  type = 'text',
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="flex flex-col space-y-1 w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}

      <div className="relative w-full">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            'w-full rounded-md outline-none transition-all duration-150',
            sizeMap[size],
            variantMap[variant],
            disabled && 'opacity-50 cursor-not-allowed',
            invalid && 'border-red-500'
          )}
        />
        {type === 'password' && (
          <button
            type="button"
            tabIndex={-1}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-blue-500"
            onClick={() => setShowPassword((s) => !s)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>

      {invalid && errorMessage ? (
        <p className="text-xs text-red-500">{errorMessage}</p>
      ) : helperText ? (
        <p className="text-xs text-gray-500">{helperText}</p>
      ) : null}
    </div>
  );
};
