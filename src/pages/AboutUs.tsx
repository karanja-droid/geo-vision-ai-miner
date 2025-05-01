
import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Globe, Users, Shield, Building, Award, Handshake } from 'lucide-react';

const AboutUs: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        {/* Company Overview */}
        <div className="mb-12 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-geo-blue text-white">
              <Globe size={20} />
            </div>
            <h1 className="text-3xl font-bold">About GeoVision AI Miner</h1>
          </div>
          <p className="text-lg text-slate-600">
            Transforming the future of geological exploration with cutting-edge artificial intelligence
          </p>
        </div>

        {/* Mission & Vision */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Award className="h-6 w-6 text-geo-blue" />
              <h2 className="text-2xl font-bold">Our Mission & Vision</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">Mission</h3>
              <p className="text-slate-700">
                To revolutionize mineral exploration by combining advanced artificial intelligence with geological expertise, 
                making resource discovery more efficient, sustainable, and accessible to companies of all sizes.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Vision</h3>
              <p className="text-slate-700">
                A world where AI-powered exploration reduces environmental impact while maximizing discovery rates, 
                leading to responsible resource development that meets global demands for critical minerals.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Corporate Structure */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Building className="h-6 w-6 text-geo-blue" />
              <h2 className="text-2xl font-bold">Corporate Structure</h2>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-slate-700">
              <span className="font-semibold">GeoVision AI Miner</span> operates as a subsidiary of <span className="font-semibold">BigBox Investment Limited</span>, 
              a diversified investment company with interests in technology, resources, and sustainable development.
            </p>
            <div className="relative p-4 bg-slate-50 rounded-lg border border-slate-200">
              <div className="flex flex-col items-center">
                <div className="p-4 bg-white rounded-lg border-2 border-geo-blue shadow-md mb-4 w-64 text-center">
                  <p className="font-bold">BigBox Investment Limited</p>
                  <p className="text-sm text-slate-500">Parent Company</p>
                </div>
                <div className="h-8 border-l-2 border-geo-blue"></div>
                <div className="p-4 bg-white rounded-lg border-2 border-geo-blue shadow-md w-64 text-center">
                  <p className="font-bold">GeoVision AI Miner</p>
                  <p className="text-sm text-slate-500">Subsidiary</p>
                </div>
              </div>
            </div>
            <p className="text-slate-700">
              As part of the BigBox Investment family, GeoVision combines the financial strength and strategic vision of a global investment company
              with the agility and innovation of a specialized AI technology provider.
            </p>
          </CardContent>
        </Card>

        {/* Team */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-6 w-6 text-geo-blue" />
              <h2 className="text-2xl font-bold">Our Team</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-slate-700">
              GeoVision AI Miner brings together world-class experts in artificial intelligence, geology, mining engineering, 
              and sustainable resource development. Our interdisciplinary team includes:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Geologists & Earth Scientists</h3>
                <p className="text-slate-600">
                  Field-experienced professionals who understand the complexities of mineral deposits and geological formations.
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">AI & Data Scientists</h3>
                <p className="text-slate-600">
                  Specialists in machine learning, data modeling, and predictive analytics focused on geospatial applications.
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Mining Engineers</h3>
                <p className="text-slate-600">
                  Experts who translate geological insights into practical extraction and processing strategies.
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Sustainability Consultants</h3>
                <p className="text-slate-600">
                  Dedicated professionals ensuring our technologies support environmentally responsible resource development.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Partners */}
        <Card className="mb-12">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Handshake className="h-6 w-6 text-geo-blue" />
              <h2 className="text-2xl font-bold">Our Partners</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-slate-700">
              GeoVision AI Miner collaborates with leading organizations across the mining, technology, and academic sectors:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Mining Companies</h3>
                <p className="text-slate-600">
                  From major global producers to junior exploration firms
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Research Institutions</h3>
                <p className="text-slate-600">
                  Universities and geological survey organizations
                </p>
              </div>
              <div className="p-4 border border-slate-200 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="font-semibold text-lg mb-2">Technology Providers</h3>
                <p className="text-slate-600">
                  Satellite imagery and remote sensing specialists
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Commitment to Standards */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-geo-blue" />
              <h2 className="text-2xl font-bold">Our Commitment to Standards</h2>
            </div>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-slate-700">
              GeoVision AI Miner is committed to upholding international standards for reporting and compliance in the mining industry:
            </p>

            <div className="flex flex-wrap gap-6 justify-center">
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 mb-2">
                  <Shield className="h-10 w-10 text-geo-blue" />
                </div>
                <h3 className="font-semibold">JORC Code</h3>
                <p className="text-xs text-slate-500">Australia/International</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 mb-2">
                  <Shield className="h-10 w-10 text-geo-blue" />
                </div>
                <h3 className="font-semibold">NI 43-101</h3>
                <p className="text-xs text-slate-500">Canada/International</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 mb-2">
                  <Shield className="h-10 w-10 text-geo-blue" />
                </div>
                <h3 className="font-semibold">SAMREC</h3>
                <p className="text-xs text-slate-500">South Africa</p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 mx-auto bg-slate-100 rounded-full flex items-center justify-center border-2 border-slate-200 mb-2">
                  <Shield className="h-10 w-10 text-geo-blue" />
                </div>
                <h3 className="font-semibold">UNFC</h3>
                <p className="text-xs text-slate-500">United Nations</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Copyright Notice */}
        <div className="mt-12 text-center text-sm text-slate-500">
          <p>&copy; 2025 Big Box Investment Limited. All rights reserved.</p>
          <p className="mt-1">
            GeoVision AI Miner is a subsidiary of Big Box Investment Limited.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
