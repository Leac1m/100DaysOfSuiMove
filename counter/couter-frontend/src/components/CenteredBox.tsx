interface CenteredBoxProps {
  leftButtonText?: string;
  rightButtonText?: string;
  label: string;
  value: string | number;
  onDelete?: () => void;
}

export function CenteredBox({
  leftButtonText = '-',
  rightButtonText = '+',
  label,
  value,
  onDelete,
}: CenteredBoxProps) {
  return (
    <div className="counter-container">
      <button className="box-button left">{leftButtonText}</button>
      <div className="center-container">
      <div className="center-content">
        <div className="counter-label">{label}</div>
        <div className="counter-value">Value: {value}</div>
      </div>
      {onDelete && (
        <button 
          className="delete-button" 
          onClick={onDelete}
          aria-label="Delete"
        >
          ×
        </button>
      )}
      
      </div>
      <button className="box-button right">{rightButtonText}</button>
    </div>
  )
} 