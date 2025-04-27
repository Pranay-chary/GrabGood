import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';

export function Form({
  onSubmit,
  children,
  validationSchema,
  defaultValues,
  className,
}) {
  const methods = useForm({
    resolver: validationSchema ? zodResolver(validationSchema) : undefined,
    defaultValues,
  });

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
}

export function Field({
  name,
  label,
  type = 'text',
  placeholder,
  rules,
  className,
  methods,
}) {
  const {
    register,
    formState: { errors },
  } = methods;

  const error = errors[name];

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2 rounded-md shadow-sm">
        <input
          type={type}
          id={name}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`block w-full rounded-md border-0 py-1.5 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            error
              ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
              : 'text-gray-900 ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600'
          }`}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export function TextArea({
  name,
  label,
  placeholder,
  rules,
  className,
  methods,
  rows = 3,
}) {
  const {
    register,
    formState: { errors },
  } = methods;

  const error = errors[name];

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2">
        <textarea
          id={name}
          rows={rows}
          placeholder={placeholder}
          {...register(name, rules)}
          className={`block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            error
              ? 'text-red-900 ring-red-300 placeholder:text-red-300 focus:ring-red-500'
              : 'ring-gray-300 placeholder:text-gray-400 focus:ring-blue-600'
          }`}
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export function Select({
  name,
  label,
  options,
  rules,
  className,
  methods,
}) {
  const {
    register,
    formState: { errors },
  } = methods;

  const error = errors[name];

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="relative mt-2">
        <select
          id={name}
          {...register(name, rules)}
          className={`block w-full rounded-md border-0 py-1.5 pl-3 pr-10 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 ${
            error
              ? 'text-red-900 ring-red-300 focus:ring-red-500'
              : 'text-gray-900 ring-gray-300 focus:ring-blue-600'
          }`}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export function Checkbox({
  name,
  label,
  rules,
  className,
  methods,
}) {
  const {
    register,
    formState: { errors },
  } = methods;

  const error = errors[name];

  return (
    <div className={className}>
      <div className="relative flex items-start">
        <div className="flex h-6 items-center">
          <input
            id={name}
            type="checkbox"
            {...register(name, rules)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
          />
        </div>
        <div className="ml-3 text-sm leading-6">
          <label htmlFor={name} className="font-medium text-gray-900">
            {label}
          </label>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export function FileUpload({
  name,
  label,
  accept,
  multiple,
  rules,
  className,
  methods,
}) {
  const {
    register,
    formState: { errors },
  } = methods;

  const error = errors[name];

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <input
          type="file"
          id={name}
          accept={accept}
          multiple={multiple}
          {...register(name, rules)}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error.message?.toString()}
        </p>
      )}
    </div>
  );
}

export function SubmitButton({
  children,
  isLoading,
  className,
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={`inline-flex justify-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    >
      {isLoading ? 'Loading...' : children}
    </button>
  );
} 