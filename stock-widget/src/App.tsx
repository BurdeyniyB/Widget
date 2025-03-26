import React, { useState } from 'react';
import { WidgetProvider, useWidgetContext } from './context/WidgetContext';
import "./styles/global.css"

const AppContent: React.FC = () => {
  const { widgets, addWidget, removeWidget } = useWidgetContext();
  const [stopwatchCount, setStopwatchCount] = useState(1);
  const [timerCount, setTimerCount] = useState(1);

  return (
    <div>
      <h2>Welcome to the Widget App</h2>
      <div className="widget__buttons">
        <button onClick={() => {
          const id = `stopwatch-${stopwatchCount}`;
          addWidget(id, 'Stopwatch');
          setStopwatchCount(prev => prev + 1);
        }}>
          Add StopWatch Widget
        </button>

        <button onClick={() => {
          const id = `timer-${timerCount}`;
          addWidget(id, 'Timer');
          setTimerCount(prev => prev + 1);
        }}>
          Add Timer Widget
        </button>
      </div>

      <div className="widget__container">
        {widgets.map(({ id, component: Component }) => (
          <div key={id} className="widget">
            <React.Suspense fallback={<div>Loading...</div>}>
              <Component id={id} removeWidget={removeWidget} />
            </React.Suspense>
          </div>
        ))}
      </div>
    </div>
  );
};


const App: React.FC = () => (
  <WidgetProvider>
    <AppContent />
  </WidgetProvider>
);

export default App;
