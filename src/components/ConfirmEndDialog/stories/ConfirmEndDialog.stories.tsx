
import React from 'react';
import ConfirmEndDialog from '..';

export default { title: 'UI Components/ConfirmEndDialog' };

export const simple = () => {
  return <ConfirmEndDialog
    onExit={(isEnding: boolean) => console.log(`Host exits (ending: ${isEnding})`)}
    onClose={() => console.log('ConfirmEndDialog closed.')} />;
};
