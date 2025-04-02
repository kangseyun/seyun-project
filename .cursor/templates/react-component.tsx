/**
 * {{ComponentName}}
 * {{ComponentDescription}}
 */
import React from 'react';

interface I{{ComponentName}}Props {
  /** Description of prop1 */
  prop1: string;
  /** Description of prop2 */
  prop2?: number;
}

/**
 * {{ComponentName}} component
 * 
 * @param {I{{ComponentName}}Props} props - Component props
 * @returns {JSX.Element} Rendered component
 */
export const {{ComponentName}}: React.FC<I{{ComponentName}}Props> = ({
  prop1,
  prop2,
}) => {
  return (
    <div>
      {/* Component implementation */}
    </div>
  );
};

export default {{ComponentName}}; 