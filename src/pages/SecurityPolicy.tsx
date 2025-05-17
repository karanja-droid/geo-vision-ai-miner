
import React from 'react';
import { Container } from "@/components/ui/container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Shield, Lock, Database, Server, User, FileCheck, Bell } from 'lucide-react';

const SecurityPolicy: React.FC = () => {
  return (
    <Container className="py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Shield className="mr-2 h-6 w-6 text-primary" />
          Security Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Our commitment to protecting your data and ensuring system security
        </p>
        
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="mr-2 h-5 w-5" />
                Authentication & Access Control
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our application implements robust authentication mechanisms to verify user identities
                and protect against unauthorized access:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Email and password authentication with strong password requirements</li>
                <li>Email verification for new account creation</li>
                <li>Account lockout after multiple failed login attempts</li>
                <li>Two-factor authentication (2FA) for administrator accounts</li>
                <li>Role-based access control (RBAC) for feature and data access</li>
                <li>Session expiration and automatic logout after periods of inactivity</li>
                <li>Security audit logging for login attempts and administrative actions</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Database className="mr-2 h-5 w-5" />
                Data Protection & Privacy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                We implement multiple measures to protect data privacy and ensure confidentiality:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Row-level security (RLS) policies for database access control</li>
                <li>Encryption of sensitive data at rest and in transit</li>
                <li>HTTPS for all data transmission using TLS 1.3</li>
                <li>Data access logging and monitoring</li>
                <li>Strict data isolation between organizations</li>
                <li>Regular security reviews and vulnerability assessments</li>
                <li>Compliance with relevant data protection regulations</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-4">
                Learn more about how we process your data in our Privacy Policy.
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                API & Application Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our API and application security measures include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Input validation and sanitization to prevent injection attacks</li>
                <li>API rate limiting to prevent abuse</li>
                <li>CORS policies to prevent cross-origin attacks</li>
                <li>Content Security Policy (CSP) to mitigate XSS attacks</li>
                <li>JWT tokens with short expiration times for API authentication</li>
                <li>Security headers configuration (X-Content-Type-Options, X-XSS-Protection, etc.)</li>
                <li>Regular security testing including penetration tests</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="mr-2 h-5 w-5" />
                Infrastructure & Operations Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our infrastructure and operations security practices include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Regular security patches and updates</li>
                <li>Network segmentation and firewalls</li>
                <li>Monitoring and alerts for suspicious activities</li>
                <li>Secure development practices and code reviews</li>
                <li>Encrypted backups and disaster recovery procedures</li>
                <li>Principle of least privilege for system access</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5" />
                Security Incident Response
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                In the event of a security incident:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>We have a dedicated team monitoring for security events</li>
                <li>Automated anomaly detection systems for early warning</li>
                <li>Documented incident response procedures</li>
                <li>User notifications for relevant security incidents</li>
                <li>Post-incident analysis and improvements</li>
              </ul>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileCheck className="mr-2 h-5 w-5" />
                Compliance & Auditing
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>
                Our compliance and auditing practices:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Regular security audits and vulnerability assessments</li>
                <li>Comprehensive audit logging of system activities</li>
                <li>Third-party security assessments</li>
                <li>Compliance with industry security standards</li>
                <li>Regular security training for our team</li>
              </ul>
              <p className="text-sm mt-4">
                For security concerns or to report vulnerabilities, please contact our security team at security@example.com
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Container>
  );
};

export default SecurityPolicy;
