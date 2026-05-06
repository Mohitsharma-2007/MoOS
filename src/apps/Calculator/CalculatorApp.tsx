import { useState } from 'react';

const buttonStyle: React.CSSProperties = {
  padding: '24px 0',
  fontSize: 28,
  borderRadius: 16,
  border: 'none',
  background: 'rgba(255,255,255,0.15)',
  color: '#fff',
  fontWeight: 600,
  boxShadow: '0 2px 10px #0001',
  backdropFilter: 'blur(2px)',
  cursor: 'pointer',
  transition: 'background 0.2s',
};

interface CalculatorAppProps {
  maximized?: boolean;
}

const CalculatorApp = ({ maximized }: CalculatorAppProps) => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        // eslint-disable-next-line no-eval
        setResult(eval(input).toString());
      } catch {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else {
      setInput(input + value);
    }
  };

  const buttons = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
  ];

  const isMax = !!maximized;
  // Windows Calculator style colors
  const darkBg = '#1b1b1b';
  const darkPanel = '#232323';
  const buttonBg = '#2d2d2d';
  const buttonFg = '#fff';
  const buttonSpecial = '#1a8cff';
  const buttonRed = '#ff5b5b';
  const border = '#333';

  // Windows Calculator button layout
  const winButtons = [
    ['MC', 'MR', 'M+', 'M-', 'MS', 'Mv'],
    ['%', 'CE', 'C', '⌫'],
    ['⅟x', 'x²', '²√x', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '−'],
    ['1', '2', '3', '+'],
    ['+∕−', '0', '.', '='],
  ];

  return (
    <div
      style={{
        width: isMax ? '100vw' : 340,
        height: isMax ? '100vh' : 'auto',
        background: darkBg,
        color: buttonFg,
        borderRadius: isMax ? 0 : 20,
        margin: isMax ? 0 : '0 auto',
        boxShadow: isMax ? 'none' : '0 8px 32px 0 #0008',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'Segoe UI, Arial, sans-serif',
        transition: 'all 0.3s',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        padding: isMax ? '18px 32px 0 32px' : '12px 18px 0 18px',
        background: darkBg,
        fontSize: isMax ? 26 : 18,
        fontWeight: 600,
        borderBottom: `1px solid ${border}`,
        minHeight: isMax ? 56 : 36,
      }}>
        <span style={{marginRight: 12, fontSize: isMax ? 28 : 20, cursor: 'pointer'}}>≡</span>
        <span style={{fontWeight: 700, fontSize: isMax ? 26 : 18}}>Standard</span>
        <span style={{marginLeft: 14, fontSize: isMax ? 22 : 16, opacity: 0.7}}>🡹</span>
        <span style={{marginLeft: 'auto', fontSize: isMax ? 22 : 16}}>⏲</span>
      </div>
      {/* Result and history (maximized only) */}
      <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        width: '100%',
        background: darkPanel,
        padding: isMax ? '18px 32px 0 32px' : '12px 18px 0 18px',
        minHeight: isMax ? 120 : 70,
        borderBottom: `1px solid ${border}`,
      }}>
        {isMax && (
          <div style={{flex: 1, color: '#eee', fontSize: 16, opacity: 0.7, minWidth: 180}}>
            <div style={{marginBottom: 8}}>History</div>
            <div style={{fontSize: 13, opacity: 0.6}}>There's no history yet.</div>
          </div>
        )}
        <div style={{flex: isMax ? 2 : 1, textAlign: 'right', fontSize: isMax ? 64 : 36, fontWeight: 600, color: '#fff', paddingTop: isMax ? 0 : 10, paddingRight: isMax ? 18 : 0}}>
          {result || input || '0'}
        </div>
      </div>
      {/* Buttons */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        background: darkPanel,
        overflow: 'hidden',
      }}>
        {isMax && (
          <div style={{
            width: 220,
            minWidth: 180,
            maxWidth: 260,
            background: darkPanel,
            color: '#eee',
            fontSize: 16,
            opacity: 0.7,
            padding: '24px 12px 0 32px',
            borderRight: `1px solid ${border}`,
            height: '100%',
          }}>
            <div style={{marginBottom: 8}}>History</div>
            <div style={{fontSize: 13, opacity: 0.6}}>There's no history yet.</div>
          </div>
        )}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: isMax ? 'repeat(6, 1fr)' : 'repeat(4, 1fr)',
            gridAutoRows: isMax ? 'minmax(70px, 1fr)' : 'minmax(48px, 1fr)',
            gap: isMax ? 16 : 8,
            padding: isMax ? '28px 32px 32px 32px' : '18px',
            overflow: 'auto',
            alignItems: 'stretch',
            justifyItems: 'stretch',
            minWidth: isMax ? 0 : 320,
            maxWidth: isMax ? undefined : 400,
            margin: '0 auto',
            borderLeft: isMax ? `1px solid ${border}` : undefined,
            background: darkPanel,
          }}
        >
          {winButtons.flat().map((btn, idx) => (
            <button
              key={btn}
              style={{
                background: btn === '=' ? buttonSpecial : btn === 'C' || btn === 'CE' ? buttonRed : buttonBg,
                color: btn === '=' ? '#fff' : '#fff',
                border: `1px solid ${border}`,
                borderRadius: 8,
                fontSize: isMax ? 32 : 20,
                fontWeight: btn === '=' ? 700 : 500,
                boxShadow: isMax ? '0 2px 8px #0002' : '0 1px 3px #0002',
                cursor: 'pointer',
                outline: 'none',
                transition: 'background 0.15s',
                gridColumn: isMax && btn === '=' ? '6' : undefined,
                gridRow: isMax && btn === '=' ? '7' : undefined,
                marginTop: 0,
                minHeight: isMax ? 70 : 48,
                minWidth: 0,
                width: '100%',
                height: '100%',
                opacity: btn === '' ? 0 : 1,
                fontFamily: 'inherit',
              }}
              onClick={() => handleButtonClick(btn)}
            >
              {btn}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalculatorApp;
