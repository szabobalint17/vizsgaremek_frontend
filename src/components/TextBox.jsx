export default function TextBox({
  title,
  placeholder,
  type = 'text',
  value,
  setValue,
  id,
  className = ''
}) {
  const inputId = id || title;

  return (
    <div className={className}>
      <label htmlFor={inputId} className="form-label">
        {title}
      </label>
      <input
        type={type}
        className="form-control"
        id={inputId}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
