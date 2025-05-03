
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

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
        <Accordion type="single" collapsible className="w-full">
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
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default FAQSection;
