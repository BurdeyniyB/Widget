import React, { createContext, useState, ReactNode, useContext } from 'react';

// Типи віджетів та їх компонентів
interface Widget {
  id: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

// Типи контексту
interface WidgetContextType {
  widgets: Widget[];
  addWidget: (id: string, path: string) => void;
  removeWidget: (id: string) => void;
}

// Створення контексту
export const WidgetContext = createContext<WidgetContextType | null>(null);

export const WidgetProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [widgets, setWidgets] = useState<Widget[]>([]);

  // Функція для додавання віджета
  const addWidget = (id: string, path: string) => {
    const Component = React.lazy(() => import(`../widgets/${path}.tsx`));
    setWidgets((prev) => [...prev, { id, component: Component }]);
  };

  // Функція для видалення віджета
  const removeWidget = (id: string) => {
    setWidgets((prev) => prev.filter((widget) => widget.id !== id));
  };

  return (
    <WidgetContext.Provider value={{ widgets, addWidget, removeWidget }}>
      {children}
    </WidgetContext.Provider>
  );
};

// Хук для доступу до контексту
export const useWidgetContext = () => {
  const context = useContext(WidgetContext);
  if (!context) {
    throw new Error('useWidgetContext must be used within a WidgetProvider');
  }
  return context;
};
