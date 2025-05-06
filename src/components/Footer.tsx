
import React from 'react';
import { Link } from 'react-router-dom';
import { Database, Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card mt-auto border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Information */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-geo-blue text-white">
                <Database size={14} />
              </div>
              <h3 className="font-bold text-lg">GeoVision AI Miner</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Revolutionizing mineral exploration with advanced AI and geospatial analysis.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Github">
                <Github size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="mailto:contact@geovision-ai.com" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>
          
          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/interactive-map" className="text-muted-foreground hover:text-foreground transition-colors">Interactive Map</Link></li>
              <li><Link to="/satellite-vision" className="text-muted-foreground hover:text-foreground transition-colors">Satellite Vision</Link></li>
              <li><Link to="/geostructure-3d" className="text-muted-foreground hover:text-foreground transition-colors">3D Geostructure</Link></li>
              <li><Link to="/data-integration" className="text-muted-foreground hover:text-foreground transition-colors">Data Integration</Link></li>
              <li><Link to="/global-data-integration" className="text-muted-foreground hover:text-foreground transition-colors">Global Data</Link></li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/documentation" className="text-muted-foreground hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link to="/product-roadmap" className="text-muted-foreground hover:text-foreground transition-colors">Roadmap</Link></li>
              <li><Link to="/next-steps" className="text-muted-foreground hover:text-foreground transition-colors">Analysis Pipeline</Link></li>
              <li><Link to="/dataset-management" className="text-muted-foreground hover:text-foreground transition-colors">Dataset Management</Link></li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">About Us</Link></li>
              <li><Link to="/upgrade" className="text-muted-foreground hover:text-foreground transition-colors">Plans & Pricing</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Terms of Service</Link></li>
              <li><Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <Separator className="my-6" />
        
        <div className="flex flex-col sm:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} GeoVision AI Miner. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">A product of Big Box Investment Limited</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
