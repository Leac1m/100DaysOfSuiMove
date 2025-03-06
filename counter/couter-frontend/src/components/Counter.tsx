interface CenteredBoxProps {
  leftButtonText?: string;
  rightButtonText?: string;
  label: string;
  value: string | number;
  onDelete?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export function CenteredBox({
  leftButtonText = '-',
  rightButtonText = '+',
  label,
  value,
  onDelete,
  onIncrement,
  onDecrement,
}: CenteredBoxProps) {
  return (
    <div className="counter-container">
      <button className="box-button left" onClick={onDecrement}>{leftButtonText}</button>
      <div className="center-container">
      <div className="center-content">
        <div className="counter-label">
          <a 
            href={`https://testnet.suivision.xyz/object/${label}`} 
            target="_blank" 
            rel="noopener noreferrer"
          >
            {shortenAddress(label)}
          </a>
        </div>
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
      <button className="box-button right" onClick={onIncrement}>{rightButtonText}</button>
    </div>
  )
}

function shortenAddress(address: string, startLength = 3, endLength = 3) {
  if (!address || typeof address !== 'string' || address.length < startLength + endLength) {
    return address;
  }
  return `${address.slice(0, startLength + 2)}...${address.slice(-endLength)}`;
}