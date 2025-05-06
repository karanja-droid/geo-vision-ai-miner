
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FileText, Users } from 'lucide-react';
import SupportTierCard from './SupportTierCard';

const SupportSLAsTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Enterprise Support Tiers</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <SupportTierCard
            title="Standard"
            description="Included with all enterprise subscriptions"
            features={[
              "8/5 email and portal support",
              "12-hour response time for critical issues",
              "Monthly system health checks",
              "Access to knowledge base",
              "Regular software updates"
            ]}
          />
          <SupportTierCard
            title="Premium"
            description="Enhanced support for mission-critical deployments"
            features={[
              "24/7 email, portal, and phone support",
              "4-hour response time for critical issues",
              "Weekly system health checks",
              "Named support contacts",
              "Priority bug fixes",
              "Quarterly review meetings"
            ]}
            highlighted
          />
          <SupportTierCard
            title="Platinum"
            description="Maximum support for enterprise operations"
            features={[
              "24/7 email, portal, and phone support",
              "1-hour response time for critical issues",
              "Dedicated support team",
              "Weekly review meetings",
              "Direct access to engineering team",
              "Custom feature prioritization",
              "On-site support (as needed)"
            ]}
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Service Level Agreements</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-muted text-left">
              <th className="p-3 border">Service Level</th>
              <th className="p-3 border">Standard</th>
              <th className="p-3 border">Premium</th>
              <th className="p-3 border">Platinum</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            <tr>
              <td className="p-3 border font-medium">System Availability</td>
              <td className="p-3 border">99.9%</td>
              <td className="p-3 border">99.95%</td>
              <td className="p-3 border">99.99%</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">Critical Issue Response</td>
              <td className="p-3 border">12 hours</td>
              <td className="p-3 border">4 hours</td>
              <td className="p-3 border">1 hour</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">High Priority Issue Response</td>
              <td className="p-3 border">24 hours</td>
              <td className="p-3 border">8 hours</td>
              <td className="p-3 border">4 hours</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">Medium Priority Issue Response</td>
              <td className="p-3 border">48 hours</td>
              <td className="p-3 border">24 hours</td>
              <td className="p-3 border">12 hours</td>
            </tr>
            <tr>
              <td className="p-3 border font-medium">Low Priority Issue Response</td>
              <td className="p-3 border">72 hours</td>
              <td className="p-3 border">48 hours</td>
              <td className="p-3 border">24 hours</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div className="flex justify-center gap-4">
        <Button className="gap-2" asChild>
          <Link to="/signup?plan=enterprise">
            <Users className="h-4 w-4" /> Request Enterprise Support
          </Link>
        </Button>
        <Button variant="outline" className="gap-2" asChild>
          <Link to="/documentation/enterprise-sla.pdf">
            <FileText className="h-4 w-4" /> View Sample SLA
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SupportSLAsTab;
