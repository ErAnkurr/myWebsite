import type { ReactNode } from 'react';
import './style.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
}

export function Modal({ isOpen, onClose, children, ariaLabel }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      role="button"
      tabIndex={0}
      aria-label={ariaLabel ?? 'Close modal overlay'}
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div
        className="modal-shell"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
