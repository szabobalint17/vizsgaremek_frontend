
export default function Modal({
  open,
  title,
  children,
  color,
  submitText,
  onClose,
  onSubmit
  
})
 {
  if (!open) return null;

  const submitClass =
    color === 'danger'
      ? 'app-btn app-btn-danger'
      : color === 'secondary'
      ? 'app-btn app-btn-secondary'
      : 'app-btn app-btn-primary';

  return (
    <div className="custom-modal-overlay" onClick={onClose}>
      <div className="custom-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="custom-modal-header">
          <h3 className="custom-modal-title">{title}</h3>

          <button
            type="button"
            className="custom-modal-close"
            aria-label="Bezárás"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="custom-modal-body">{children}</div>

        <div className="custom-modal-footer">
          {submitText && (
            <button type="button" className={submitClass} onClick={onSubmit}>
              {submitText}
            </button>
          )}

          <button type="button" className="app-btn app-btn-outline" onClick={onClose}>
            Mégse
          </button>
        </div>
      </div>
    </div>
  );
}
