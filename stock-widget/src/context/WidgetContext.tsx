import React, { createContext, useState, ReactNode } from 'react';

interface Widget {
  id: string;
  version: number;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
  directory: string; 
}

interface WidgetContextType {
  widgets: Widget[];
  addWidget: (id: string, directory: string, version?: number) => void; 
  removeWidget: (id: string) => void;
  updateWidget: (id: string, newDirectory: string, newVersion: number) => void; 
}

export const WidgetContext = createContext<WidgetContextType | null>(null);

const getWidgetComponent = (directory: string, version: number) => {
  switch (directory) {
    case 'Stopwatch':
      switch (version) {
        case 1:
          return import(`../widgets/Stopwatch/Stopwatch.v1.tsx`);
        case 2:
          return import(`../widgets/Stopwatch/Stopwatch.v2.tsx`);
        case 3:
          return import(`../widgets/Stopwatch/Stopwatch.v3.tsx`);
        default:
          return import(`../widgets/Stopwatch/Stopwatch.v3.tsx`); 
      }
    case 'Timer':
      switch (version) {
        case 1:
          return import(`../widgets/Timer/Timer.v1.tsx`);
        case 2:
          return import(`../widgets/Timer/Timer.v2.tsx`);
        case 3:
          return import(`../widgets/Timer/Timer.v3.tsx`);
        default:
          return import(`../widgets/Timer/Timer.v3.tsx`);
      }
    default:
      throw new Error('Unknown widget directory');
  }
};

export const WidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const addWidget = (id: string, directory: string, version: number = 1) => {
    const Component = React.lazy(() => getWidgetComponent(directory, version));
    setWidgets((prev) => [...prev, { id, component: Component, version, directory }]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  const updateWidget = (id: string, newDirectory: string, newVersion: number) => {
    setWidgets((prev) =>
      prev.map((widget) => {
        if (widget.id === id && widget.version < newVersion) {
          const NewComponent = React.lazy(() => getWidgetComponent(newDirectory, newVersion));
          return { ...widget, component: NewComponent, version: newVersion, directory: newDirectory };
        }
        return widget;
      })
    );
  };

  return (
    <WidgetContext.Provider value={{ widgets, addWidget, removeWidget, updateWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};
