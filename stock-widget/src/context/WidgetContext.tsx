import React, { createContext, useState, ReactNode } from 'react';

interface Widget {
  id: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

interface WidgetContextType {
  widgets: Widget[];
  addWidget: (id: string, path: string) => void;
  removeWidget: (id: string) => void;
}

export const WidgetContext = createContext<WidgetContextType | null>(null);

export const WidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  const addWidget = (id: string, path: string) => {
    const Component = React.lazy(() => import(`../widgets/${path}.tsx`));
    setWidgets((prev) => [...prev, { id, component: Component }]);
  };

  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  return (
    <WidgetContext.Provider value={{ widgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};

