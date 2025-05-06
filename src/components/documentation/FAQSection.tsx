
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const FAQSection: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Frequently Asked Questions</CardTitle>
        <CardDescription>
          Answers to common questions about using GeoVision AI Miner.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full mb-6">
          {/* General FAQs */}
          <AccordionItem value="faq-1">
            <AccordionTrigger>What types of mineral deposits can GeoVision AI Miner detect?</AccordionTrigger>
            <AccordionContent>
              GeoVision AI Miner is trained on diverse geological datasets and can detect patterns associated with various mineral deposits including copper, gold, iron, cobalt, zinc, lithium, rare earth elements, and more. The platform is regularly updated with new models for additional mineral types based on the latest research and user feedback.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-2">
            <AccordionTrigger>How accurate are the AI predictions?</AccordionTrigger>
            <AccordionContent>
              Prediction accuracy varies depending on data quality, geological complexity, and the mineral type being analyzed. In validation studies, our AI models have achieved 70-85% accuracy in identifying areas with high mineral potential. Each prediction includes a confidence score to help users gauge reliability. The system improves over time as it learns from new data and verified results.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-3">
            <AccordionTrigger>Can I import my existing geological datasets?</AccordionTrigger>
            <AccordionContent>
              Yes, GeoVision AI Miner supports importing a wide range of geological data formats including GeoJSON, Shapefile, CSV with coordinates, GeoTIFF, and various industry-specific formats. The platform includes tools for data cleaning, transformation, and validation to ensure compatibility with our analysis systems.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-4">
            <AccordionTrigger>How is data security handled?</AccordionTrigger>
            <AccordionContent>
              We implement enterprise-grade security measures including end-to-end encryption, secure access controls, and regular security audits. All data is stored in compliance with industry standards, and users have complete control over data sharing permissions. Our platform meets requirements for publicly listed mining companies and includes features to support regulatory compliance.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-5">
            <AccordionTrigger>What subscription plans are available?</AccordionTrigger>
            <AccordionContent>
              GeoVision AI Miner offers flexible subscription plans tailored to different organization sizes and needs, from small exploration companies to major mining corporations. Plans include varying levels of data storage, analysis capacity, and user seats. Contact our sales team for detailed pricing information and to discuss which plan best fits your requirements.
            </AccordionContent>
          </AccordionItem>
          
          {/* Enterprise-specific FAQs */}
          <AccordionItem value="faq-6">
            <AccordionTrigger>What security certifications does GeoVision AI Miner have?</AccordionTrigger>
            <AccordionContent>
              We are actively pursuing ISO 27001 certification, with expected completion in Q4 2025. We are also working toward SOC 2 Type II compliance, targeted for Q1 2026. Currently, our platform is fully compliant with GDPR and POPIA regulations. We conduct regular third-party security audits and penetration tests to ensure the highest levels of security.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-7">
            <AccordionTrigger>Can GeoVision AI Miner be deployed on our private infrastructure?</AccordionTrigger>
            <AccordionContent>
              Yes, we offer several deployment options for enterprise clients. These include private cloud deployments in your preferred cloud environment (AWS, Azure, GCP), on-premises installations within your organization's infrastructure, and air-gapped solutions for high-security environments. Our team works with your IT department to determine the best deployment model for your specific requirements.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-8">
            <AccordionTrigger>What kind of SLAs do you offer for enterprise customers?</AccordionTrigger>
            <AccordionContent>
              Our enterprise SLAs guarantee system availability ranging from 99.9% to 99.99%, depending on your support tier. Response times for critical issues range from 12 hours (Standard tier) to as fast as 1 hour (Platinum tier). All enterprise customers receive dedicated support contacts, regular system health checks, and comprehensive incident management. Detailed SLA terms are provided during the enterprise onboarding process.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-9">
            <AccordionTrigger>How does GeoVision AI Miner handle sensitive mining exploration data?</AccordionTrigger>
            <AccordionContent>
              We understand the sensitive nature of mining exploration data and the competitive advantage it represents. Our platform implements strict data isolation between customers, role-based access controls within organizations, and comprehensive audit logging of all data access. For enterprise deployments, we can implement additional data protection measures including geographic data storage restrictions and customized data retention policies.
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="faq-10">
            <AccordionTrigger>What training and implementation support is provided for enterprise deployments?</AccordionTrigger>
            <AccordionContent>
              Enterprise customers receive comprehensive implementation support, including initial system setup, data migration assistance, and integration with existing systems. We provide customized training programs for different user roles, from field geologists to executive users. All enterprise plans include administrator training, user onboarding materials, and access to our expert support team throughout the implementation process and beyond.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-muted/40 rounded-lg border">
          <p className="text-sm">Have additional questions about enterprise capabilities?</p>
          <Button size="sm" variant="outline" className="shrink-0" asChild>
            <Link to="/documentation#enterprise-readiness">
              View Enterprise Documentation <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
