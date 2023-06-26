import React, { useEffect, useRef } from 'react';
import '../css/Screener.css'


const Screener = () => {

    const containerRef = useRef(null);
    const scriptRef = useRef(null);
    const iframeRef = useRef(null);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js';
        script.async = true;

        const loadWidget = () => {
            if (typeof window.TradingView === 'undefined') {
                setTimeout(loadWidget, 100);
            } else {
                const widgetConfig = {
                    width: '100%',
                    height: 523,
                    defaultColumn: 'overview',
                    defaultScreen: 'general',
                    market: 'forex',
                    showToolbar: true,
                    colorTheme: 'light',
                    locale: 'in',
                };

                new window.TradingView.widget({
                    ...widgetConfig,
                    container_id: 'tradingview-widget-container',
                });
            }
        };

        script.onload = loadWidget;

        if (containerRef.current) {
            containerRef.current.appendChild(script);
            scriptRef.current = script;
        }

        return () => {
            if (containerRef.current && scriptRef.current) {
                containerRef.current.removeChild(scriptRef.current);
            }
        };
    }, []);

    return (
        <div className="economic-calendar">
        <p style={{fontFamily:'Calibri',fontSize:'20px',fontWeight:600,color:'#5e72e4'}}>Screener</p>
        <div className="tradingview-widget-container" ref={containerRef}>
          <div className="tradingview-widget-container__widget">
            <iframe
              title="Economic Calendar"
              className="tradingview-widget-container__widget"
              ref={iframeRef}
            ></iframe>
          </div>
        </div>
      </div>
    )
}

export default Screener