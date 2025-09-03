import React from 'react';

interface PageHeadingProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

export function PageHeading({ title, description, action }: PageHeadingProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm md:text-base text-muted-foreground">{description}</p>
        )}
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}