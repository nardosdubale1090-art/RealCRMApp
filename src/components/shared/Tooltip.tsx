// /src/component/shared/Tooltip.tsx

import React, { useState, useRef, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  disabled?: boolean;
  children: React.ReactElement;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({
  content,
  position = 'top',
  disabled = false,
  children,
  className,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState<{ top: number; left: number } | null>(null);

  const triggerRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const portalRoot = document.getElementById('portal-root');

  const updatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const { scrollY, scrollX } = window;

    let top = 0,
      left = 0;
    const offset = 8;

    switch (position) {
      case 'bottom':
        top = scrollY + triggerRect.bottom + offset;
        left =
          scrollX +
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
      case 'left':
        top =
          scrollY +
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        left = scrollX + triggerRect.left - tooltipRect.width - offset;
        break;
      case 'right':
        top =
          scrollY +
          triggerRect.top +
          triggerRect.height / 2 -
          tooltipRect.height / 2;
        left = scrollX + triggerRect.right + offset;
        break;
      case 'top':
      default:
        top = scrollY + triggerRect.top - tooltipRect.height - offset;
        left =
          scrollX +
          triggerRect.left +
          triggerRect.width / 2 -
          tooltipRect.width / 2;
        break;
    }

    const margin = 8;
    if (left < margin) left = margin;
    if (left + tooltipRect.width > window.innerWidth - margin) {
      left = window.innerWidth - tooltipRect.width - margin;
    }
    if (top < margin) {
      top = scrollY + triggerRect.bottom + offset;
    }
    if (top + tooltipRect.height > window.innerHeight - margin) {
      top = scrollY + triggerRect.top - tooltipRect.height - offset;
    }

    setCoords({ top, left });
  };

  // Run positioning as soon as tooltip is shown
  useLayoutEffect(() => {
    if (isVisible) {
      updatePosition();
    }
  }, [isVisible, content, position]);

  const handleMouseEnter = () => {
    if (!disabled) {
      setIsVisible(true);
    }
  };

  const handleMouseLeave = () => !disabled && setIsVisible(false);

  const childProps: any = {
    ref: triggerRef,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onFocus: handleMouseEnter,
    onBlur: handleMouseLeave,
    'aria-describedby': isVisible ? 'tooltip' : undefined,
    className: `${(children.props as { className?: string }).className || ''} ${
      className || ''
    }`.trim(),
  };

  const triggerElement = React.cloneElement(children, childProps);

  const arrowClasses: Record<string, string> = {
    top: 'bottom-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-t-gray-800',
    bottom:
      'top-[-5px] left-1/2 -translate-x-1/2 border-l-transparent border-r-transparent border-b-gray-800',
    left: 'right-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-l-gray-800',
    right:
      'left-[-5px] top-1/2 -translate-y-1/2 border-t-transparent border-b-transparent border-r-gray-800',
  };

  const tooltipContent = (
    <div
      ref={tooltipRef}
      role="tooltip"
      id="tooltip"
      // 🔑 First render hidden, then fade in only after coords are ready
      className={`fixed z-50 px-3 py-1.5 text-xs font-semibold text-white bg-gray-800 rounded-md shadow-lg transition-opacity transition-transform duration-200 whitespace-nowrap ${
        isVisible && coords ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        top: coords?.top ?? -9999,
        left: coords?.left ?? -9999,
        visibility: coords ? 'visible' : 'hidden',
      }}
    >
      {content}
      <div className={`absolute w-0 h-0 border-[5px] ${arrowClasses[position]}`} />
    </div>
  );

  return (
    <>
      {triggerElement}
      {portalRoot && ReactDOM.createPortal(tooltipContent, portalRoot)}
    </>
  );
};

export default Tooltip;
