import React from 'react';
import { twMerge } from 'tailwind-merge';
import { vTooltip as tooltip, type DVTooltipProps as TooltipProps } from '@tailus/themer';

type PayloadEntry = {
    name: string;
    value: number;
    color: string;
};

interface CustomTooltipProps extends React.HTMLAttributes<HTMLDivElement>, TooltipProps {
    active: boolean;
    payload: PayloadEntry[];
    label: string;
}

const { root, title, separator, content, entry: entryTheme, entryValue, entryNameContainer, entryName, entryIndicator } = tooltip();

export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label, mixed, fancy, indicator, className }) => {
    if (mixed && fancy) {
        throw new Error('Tooltip cannot be both mixed and fancy');
    }

    if (active && payload && payload.length) {
        return (
            <div role="tooltip" className={root({ fancy, mixed, className: twMerge('relative z-50', payload.length < 2 && 'px-3 py-2', className) })}>
                {payload.length > 1 && (
                    <>
                        <span className={title()}>{label}</span>
                        <div role="separator" className={separator({ fancy })} />
                    </>
                )}

                <div className={content()}>
                    {payload.map((entry: PayloadEntry, index: number) => (
                        <div key={index} className={entryTheme()}>
                            <div className={entryNameContainer()}>
                                <div
                                    aria-hidden
                                    className={entryIndicator({ indicator })}
                                    style={
                                        {
                                            '--entry-indicator-color': entry.color
                                        } as React.CSSProperties
                                    }
                                />
                                <span className={entryName()}>{payload.length > 1 ? <>{entry.name}</> : <>{label}</>}</span>
                            </div>
                            <span className={entryValue()}>{entry.value}</span>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
