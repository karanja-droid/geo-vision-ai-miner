
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Download } from 'lucide-react';
import CertificationCard from './CertificationCard';
import SecurityFeature from './SecurityFeature';

const SecurityComplianceTab: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">Security Certifications & Compliance</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <CertificationCard 
            title="ISO 27001"
            status="In Progress"
            description="International standard for information security management systems (ISMS)."
            estimatedCompletion="Q4 2025"
          />
          <CertificationCard 
            title="SOC 2 Type II"
            status="Planned"
            description="Service Organizations Control report focusing on security, availability, and confidentiality."
            estimatedCompletion="Q1 2026"
          />
          <CertificationCard 
            title="GDPR Compliance"
            status="Implemented"
            description="Full compliance with European data protection regulations."
            estimatedCompletion="Complete"
          />
          <CertificationCard 
            title="POPIA Compliance"
            status="Implemented"
            description="Compliance with South Africa's Protection of Personal Information Act."
            estimatedCompletion="Complete"
          />
        </div>
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-4">Security Features</h3>
        <ul className="space-y-3">
          <SecurityFeature 
            title="End-to-end Encryption" 
            description="All sensitive data is encrypted both in transit and at rest using industry-standard encryption protocols."
          />
          <SecurityFeature 
            title="Role-Based Access Control (RBAC)" 
            description="Granular permission system allowing organizations to control exactly who has access to specific data and features."
          />
          <SecurityFeature 
            title="Multi-factor Authentication" 
            description="Additional security layer requiring multiple verification methods to access sensitive data."
          />
          <SecurityFeature 
            title="Security Audit Logging" 
            description="Comprehensive logging of all system access and changes for security monitoring and compliance."
          />
          <SecurityFeature 
            title="Regular Security Assessments" 
            description="Periodic third-party security audits and penetration testing to identify and address vulnerabilities."
          />
        </ul>
      </div>
      
      <div className="flex justify-center">
        <Button className="gap-2" asChild>
          <Link to="/documentation/security-whitepaper.pdf">
            <Download className="h-4 w-4" /> Download Security Whitepaper
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default SecurityComplianceTab;
