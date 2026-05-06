interface WidgetPanelProps {
  open: boolean;
  onClose: () => void;
}

const WidgetPanel = ({ open, onClose }: WidgetPanelProps) => {
  if (!open) return null;
  
  return (
    <>
      <div onClick={onClose} style={{position:'fixed',inset:0,zIndex:998}} />
      <div className="widgetPanel">
        <button onClick={onClose} style={{position:'absolute',top:12,right:12,background:'none',border:'none',color:'#666',fontSize:20,cursor:'pointer'}}>×</button>
        <h2 className="widgetTitle">Widgets</h2>
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8}}>
          <div style={{padding: 12, background: '#1a1a1a', borderRadius: 10}}>
            <div style={{fontSize: 11, color: '#666'}}>Weather</div>
            <div style={{fontSize: 20, fontWeight: 300}}>22°C</div>
            <div style={{fontSize: 11, color: '#666'}}>Clear</div>
          </div>
          <div style={{padding: 12, background: '#1a1a1a', borderRadius: 10}}>
            <div style={{fontSize: 11, color: '#666'}}>Calendar</div>
            <div style={{fontSize: 20, fontWeight: 300}}>May 6</div>
            <div style={{fontSize: 11, color: '#666'}}>2026</div>
          </div>
          <div style={{padding: 12, background: '#1a1a1a', borderRadius: 10}}>
            <div style={{fontSize: 11, color: '#666'}}>Battery</div>
            <div style={{fontSize: 20, fontWeight: 300}}>87%</div>
            <div style={{fontSize: 11, color: '#666'}}>Charging</div>
          </div>
          <div style={{padding: 12, background: '#1a1a1a', borderRadius: 10}}>
            <div style={{fontSize: 11, color: '#666'}}>Wi-Fi</div>
            <div style={{fontSize: 20, fontWeight: 300}}>Connected</div>
            <div style={{fontSize: 11, color: '#666'}}>5G</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WidgetPanel;