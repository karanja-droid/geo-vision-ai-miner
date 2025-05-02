
import React from 'react';
import PasswordChangeForm from './PasswordChangeForm';
import AccountActions from './AccountActions';

const SecurityTab: React.FC = () => {
  return (
    <>
      <PasswordChangeForm />
      <AccountActions />
    </>
  );
};

export default SecurityTab;
