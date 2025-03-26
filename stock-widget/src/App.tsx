import React, { useState } from 'react';
import { WidgetProvider } from './context/WidgetContext';
import "./styles/global.css"
import WidgetLoader from './components/WidgetLoader';
import { useWidgets } from './hooks/useWidgets';

const AppContent: React.FC = () => {
  const { addWidget } = useWidgets();
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

     <WidgetLoader />
    </div>
  );
};


const App: React.FC = () => (
  <WidgetProvider>
    <AppContent />
  </WidgetProvider>
);

export default App;
