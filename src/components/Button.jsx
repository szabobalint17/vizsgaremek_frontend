export default function Button({
  content,
  onClick,
  color = 'dark',
  type = 'button',
  disabled = false,
  className = ''
}) {
  const getVariant = () => {
    if (color === 'secondary') return 'app-btn app-btn-secondary';
    if (color === 'outline-dark') return 'app-btn app-btn-outline';
    if (color === 'danger') return 'app-btn app-btn-danger';
    if (color === 'light') return 'app-btn app-btn-light';
    return 'app-btn app-btn-primary';
  };

  return (
    <button
      type={type}
      className={`${getVariant()} ${className}`.trim()}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
