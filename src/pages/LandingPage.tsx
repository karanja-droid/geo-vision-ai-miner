import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Globe, 
  Layers, 
  BarChart, 
  Brain, 
  Shield, 
  Users,
  ChevronRight
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-900 text-white">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-md bg-geo-blue text-white">
                  <Database size={20} />
                </div>
                <h1 className="text-2xl font-bold">GeoVision AI Miner</h1>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Revolutionizing Mineral Exploration with AI
              </h2>
              <p className="text-lg md:text-xl mb-8 text-slate-300">
                Harness the power of artificial intelligence to analyze geological data, 
                identify promising deposits, and optimize your exploration strategy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-geo-blue hover:bg-blue-700">
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900" asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-lg blur-md"></div>
                <div className="relative bg-slate-800 p-6 rounded-lg grid-pattern">
                  <img 
                    src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
                    alt="Geological terrain visualization" 
                    className="w-full h-auto rounded-lg shadow-xl"
                  />
                  <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-lg shadow-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-mineral-copper"></div>
                      <div className="w-3 h-3 rounded-full bg-mineral-gold"></div>
                      <div className="w-3 h-3 rounded-full bg-mineral-cobalt"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Globe className="h-8 w-8 text-geo-blue" />}
              title="Global Data Integration"
              description="Combine satellite imagery, geological surveys, and historical mining data from around the world."
            />
            <FeatureCard 
              icon={<Brain className="h-8 w-8 text-geo-blue" />}
              title="AI-Powered Analysis"
              description="Machine learning algorithms that identify patterns and anomalies humans might miss."
            />
            <FeatureCard 
              icon={<Layers className="h-8 w-8 text-geo-blue" />}
              title="Advanced Visualization"
              description="Interactive 3D models and cross-sectional views of geological formations."
            />
            <FeatureCard 
              icon={<BarChart className="h-8 w-8 text-geo-blue" />}
              title="Resource Estimation"
              description="Accurate predictions of resource volumes and quality based on limited sampling."
            />
            <FeatureCard 
              icon={<Users className="h-8 w-8 text-geo-blue" />}
              title="Collaborative Workspace"
              description="Real-time collaboration tools for geologists, engineers, and stakeholders."
            />
            <FeatureCard 
              icon={<Shield className="h-8 w-8 text-geo-blue" />}
              title="Compliance Ready"
              description="Built-in compliance with JORC, NI 43-101, SAMREC, and UNFC standards."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-slate-100 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Exploration Strategy?</h2>
            <p className="text-lg mb-8 text-slate-700">
              Join leading mining companies and geological survey organizations that are already using GeoVision AI Miner to discover new resources more efficiently.
            </p>
            <Button size="lg" className="bg-geo-blue hover:bg-blue-700" asChild>
              <Link to="/signup">
                Get Started Today
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Standards Compliance */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">International Standards Compliant</h2>
          <p className="text-center mb-12 max-w-3xl mx-auto text-slate-700">
            Our platform adheres to all major international mining and reporting standards to ensure your data and analyses meet global requirements.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <ComplianceBadge 
              name="JORC Code" 
              description="Australia/International" 
              url="https://www.jorc.org/codes.asp"
            />
            <ComplianceBadge 
              name="NI 43-101" 
              description="Canada/International" 
              url="https://www.osc.ca/en/industry/companies-and-investment-funds/mining-companies/ni-43-101-standards-disclosure-mineral-projects"
            />
            <ComplianceBadge 
              name="SAMREC" 
              description="South Africa" 
              url="https://www.samcode.co.za/samcode-ssc/samrec"
            />
            <ComplianceBadge 
              name="UNFC" 
              description="United Nations" 
              url="https://unece.org/sustainable-energy/unfc-and-sustainable-resource-management"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Database size={20} className="text-geo-blue" />
                <h3 className="font-bold text-lg">GeoVision AI Miner</h3>
              </div>
              <p className="text-slate-400">
                AI-Powered Geological Exploration
              </p>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Product</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-slate-400 hover:text-white">Features</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Plans & Pricing</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Case Studies</Link></li>
                <li><Link to="/documentation" className="text-slate-400 hover:text-white">Documentation</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-slate-400 hover:text-white">About Us</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Careers</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Contact</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold text-lg mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/" className="text-slate-400 hover:text-white">Privacy Policy</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Terms of Service</Link></li>
                <li><Link to="/" className="text-slate-400 hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p className="text-slate-400">
              &copy; 2025 GeoVision AI Miner. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm mt-2">
              GeoVision AI Miner is a subsidiary of Big Box Investment Limited. All content, code, data, and materials on this site are the exclusive property of Big Box Investment Limited. Unauthorized use is prohibited.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Helper Component: Feature Card
const FeatureCard: React.FC<{ 
  icon: React.ReactNode;
  title: string;
  description: string;
}> = ({ icon, title, description }) => {
  return (
    <div className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
      <div className="mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-slate-600">{description}</p>
    </div>
  );
};

// Helper Component: Compliance Badge
const ComplianceBadge: React.FC<{
  name: string;
  description: string;
  url: string;
}> = ({ name, description, url }) => {
  return (
    <div className="flex flex-col items-center">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="group"
        aria-label={`Learn more about ${name}`}
      >
        <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 mb-2 transition-all group-hover:border-geo-blue group-hover:shadow-md">
          <Shield className="h-12 w-12 text-geo-blue" />
        </div>
        <h3 className="font-semibold text-center">{name}</h3>
        <p className="text-sm text-slate-500 text-center">{description}</p>
      </a>
    </div>
  );
};

export default LandingPage;
