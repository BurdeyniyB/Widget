import React, { Suspense } from "react";
import { useWidgets } from "../hooks/useWidgets";

const WidgetLoader: React.FC = () => {
    const { widgets } = useWidgets(); // Отримуємо віджети з контексту

    return (
        <div>
            {widgets.map(({ id, component: Component }) => (
                <Suspense fallback={<div>Loading {id}...</div>} key={id}>
                    <Component />
                </Suspense>
            ))}
        </div>
    );
};

export default WidgetLoader;
