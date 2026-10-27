export function Field({ name, id = name, label, error, type = "text", ...rest }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        className="input"
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}

export function TextAreaField({
  name,
  id = name,
  label,
  error,
  rows = 4,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        className="input"
        aria-invalid={Boolean(error)}
        {...rest}
      />
      {error ? <p className="form-error">{error}</p> : null}
    </div>
  );
}
