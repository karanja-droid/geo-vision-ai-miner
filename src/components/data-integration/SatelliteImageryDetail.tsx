
import React, { useState } from 'react';
import { useToast } from "@/components/ui/use-toast";
import SatelliteConnectionHeader from './satellite-imagery/SatelliteConnectionHeader';
import ConnectionStatusAlert from './satellite-imagery/ConnectionStatusAlert';
import ConnectionDetails from './satellite-imagery/ConnectionDetails';
import AvailableDatasets from './satellite-imagery/AvailableDatasets';
import ConnectionMetrics from './satellite-imagery/ConnectionMetrics';
import FooterActions from './satellite-imagery/FooterActions';

interface SatelliteImageryDetailProps {
  onBack: () => void;
}

const SatelliteImageryDetail: React.FC<SatelliteImageryDetailProps> = ({ onBack }) => {
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsRefreshing(false);
            toast({
              title: "Connection refreshed",
              description: "Satellite imagery data has been successfully updated.",
            });
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 500);
  };

  return (
    <div className="space-y-6">
      <SatelliteConnectionHeader onBack={onBack} />
      <ConnectionStatusAlert />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ConnectionDetails 
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          progress={progress}
        />
        <AvailableDatasets 
          isRefreshing={isRefreshing}
          progress={progress}
        />
      </div>

      <ConnectionMetrics />
      <FooterActions onBack={onBack} />
    </div>
  );
};

export default SatelliteImageryDetail;
