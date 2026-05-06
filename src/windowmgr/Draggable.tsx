import React, { useRef, useState } from 'react';

interface DraggableProps {
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Draggable: React.FC<DraggableProps> = ({ children, defaultPosition = { x: 0, y: 0 }, disabled = false, style }) => {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(defaultPosition);
  const [dragging, setDragging] = useState(false);
  const offset = useRef({ x: 0, y: 0 });

  const onMouseDown = (e: React.MouseEvent) => {
    if (disabled) return;
    setDragging(true);
    const node = nodeRef.current;
    if (node) {
      const rect = node.getBoundingClientRect();
      offset.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!dragging) return;
    setPosition({
      x: e.clientX - offset.current.x,
      y: e.clientY - offset.current.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={nodeRef}
      style={{
        position: 'fixed',
        left: position.x,
        top: position.y,
        zIndex: 100,
        boxShadow: dragging ? '0 8px 32px #0006' : '0 4px 16px #0003',
        border: '1.5px solid #2d2d2d',
        borderRadius: 12,
        background: dragging ? 'rgba(30,30,40,0.95)' : 'rgba(40,40,50,0.92)',
        transition: 'box-shadow 0.18s, background 0.18s, transform 0.18s',
        transform: dragging ? 'scale(1.025)' : 'scale(1)',
        ...style,
      }}
      aria-grabbed={dragging}
      aria-label="App window"
    >
      <div
        onMouseDown={onMouseDown}
        style={{
          cursor: disabled ? 'default' : 'grab',
          width: '100%',
          background: dragging ? 'rgba(60,60,80,0.18)' : 'rgba(60,60,80,0.09)',
          borderBottom: '1px solid #292929',
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          minHeight: 32,
          display: 'flex',
          alignItems: 'center',
          userSelect: 'none',
        }}
        aria-label="Drag window"
        tabIndex={0}
      >
        {/* The first child is assumed to be the window header */}
        {React.Children.toArray(children)[0]}
      </div>
      {/* The rest of the children */}
      {React.Children.toArray(children).slice(1)}
    </div>
  );
};

export default Draggable;
