interface FormFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: 'text' | 'date' | 'time' | 'email';
  multiline?: boolean;
  rows?: number;
  required?: boolean;
}

export function FormField({
  label,
  value,
  onChange,
  placeholder = '',
  type = 'text',
  multiline = false,
  rows = 3,
  required = false
}: FormFieldProps) {
  const baseStyles = 'w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors';

  return (
    <div>
      <label className="block text-gray-700 mb-2">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          rows={rows}
          required={required}
          className={`${baseStyles} resize-none`}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={baseStyles}
        />
      )}
    </div>
  );
}
