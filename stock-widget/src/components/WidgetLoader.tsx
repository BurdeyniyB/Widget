import React, { Suspense } from "react";
import { useWidgets } from "../hooks/useWidgets";

const WidgetLoader: React.FC = () => {
    const { widgets, removeWidget } = useWidgets();

    return (
        <div className="widget__container">
            {widgets.map(({ id, version, component: Component }) => (
                <div key={id} className="widget">
                    <Suspense fallback={<div>Loading {id}...</div>}>
                        <Component id={id} version={version} removeWidget={() => removeWidget(id)} />
                    </Suspense>
                </div>
            ))}
        </div>
    );
};

export default WidgetLoader;
