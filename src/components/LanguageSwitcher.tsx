
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Globe } from 'lucide-react';

const LanguageSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full" aria-label={t('languages.language')}>
          <Globe className="h-[1.2rem] w-[1.2rem]" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          onClick={() => changeLanguage('en')}
          className={currentLanguage === 'en' ? 'bg-accent text-accent-foreground' : ''}
        >
          {t('languages.english')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('fr')}
          className={currentLanguage === 'fr' ? 'bg-accent text-accent-foreground' : ''}
        >
          {t('languages.french')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('sw')}
          className={currentLanguage === 'sw' ? 'bg-accent text-accent-foreground' : ''}
        >
          {t('languages.swahili')}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => changeLanguage('pt')}
          className={currentLanguage === 'pt' ? 'bg-accent text-accent-foreground' : ''}
        >
          {t('languages.portuguese')}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageSwitcher;
