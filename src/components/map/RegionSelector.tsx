
import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from 'react-i18next';

interface RegionSelectorProps {
  regionFocus: string;
  onRegionChange: (region: string) => void;
}

const RegionSelector: React.FC<RegionSelectorProps> = ({ 
  regionFocus, 
  onRegionChange 
}) => {
  const { t } = useTranslation();
  
  return (
    <div className="mb-4">
      <h4 className="text-xs font-medium mb-2 text-muted-foreground">{t('regions.regionFocus')}</h4>
      <div className="flex flex-wrap gap-1">
        <Button 
          size="sm" 
          variant={regionFocus === 'global' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('global')}
        >
          {t('regions.global')}
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'africa' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('africa')}
        >
          {t('regions.africa')}
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'zambia' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('zambia')}
        >
          {t('regions.zambia')}
        </Button>
        <Button 
          size="sm" 
          variant={regionFocus === 'drc' ? 'default' : 'outline'} 
          className="h-7 px-2 text-xs"
          onClick={() => onRegionChange('drc')}
        >
          {t('regions.drc')}
        </Button>
      </div>
    </div>
  );
};

export default RegionSelector;
