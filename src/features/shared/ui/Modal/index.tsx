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
      {/* eslint-disable-next-line */}
      <div
        className="modal-shell"
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        // Prevent any clicks inside the dialog from bubbling up to the overlay and closing the modal
        onClick={(event) => event.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
