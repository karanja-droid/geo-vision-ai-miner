
import React from 'react';
import { useTranslation } from 'react-i18next';

interface SidebarGroupTitleProps {
  title: string;
}

const SidebarGroupTitle: React.FC<SidebarGroupTitleProps> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <h3 className="px-3 mb-1 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
      {t(`navigation.${title.toLowerCase()}`)}
    </h3>
  );
};

export default SidebarGroupTitle;
