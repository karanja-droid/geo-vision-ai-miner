
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const EnterpriseRegistration: React.FC = () => {
  return (
    <div className="bg-slate-50 p-6 rounded-lg border">
      <h3 className="text-xl font-semibold mb-4">Enterprise Registration Process</h3>
      <p className="mb-6 text-muted-foreground">
        Join our Enterprise Early Access Program to help shape our enterprise features and get priority access to new capabilities.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
            <span className="font-semibold">1</span>
          </div>
          <h4 className="font-medium text-center mb-2">Register Interest</h4>
          <p className="text-sm text-center text-muted-foreground">
            Complete our enterprise registration form with your organization's information
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
            <span className="font-semibold">2</span>
          </div>
          <h4 className="font-medium text-center mb-2">Initial Consultation</h4>
          <p className="text-sm text-center text-muted-foreground">
            Our enterprise team will contact you to discuss your specific requirements
          </p>
        </div>
        
        <div className="bg-white p-4 rounded-md border">
          <div className="flex justify-center items-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-3 mx-auto">
            <span className="font-semibold">3</span>
          </div>
          <h4 className="font-medium text-center mb-2">Tailored Solution</h4>
          <p className="text-sm text-center text-muted-foreground">
            Receive a customized plan and access to enterprise features and support
          </p>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button className="gap-2" asChild>
          <Link to="/signup?plan=enterprise">
            Register for Enterprise Access
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default EnterpriseRegistration;
