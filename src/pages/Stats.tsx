
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InteractiveVisualization from '@/components/stats/InteractiveVisualization';
import SimilarSocieties from '@/components/stats/SimilarSocieties';

const Stats = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container max-w-7xl mx-auto px-4 py-24">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Society Statistics & Comparisons</h1>
        
        <div className="space-y-12">
          <section>
            <InteractiveVisualization />
          </section>
          
          <section>
            <h2 className="text-2xl font-semibold mb-4">Related Societies</h2>
            <Tabs defaultValue="population">
              <TabsList className="mb-4">
                <TabsTrigger value="population">By Population</TabsTrigger>
                <TabsTrigger value="income">By Income</TabsTrigger>
                <TabsTrigger value="location">By Location</TabsTrigger>
              </TabsList>
              <TabsContent value="population">
                <SimilarSocieties type="population" />
              </TabsContent>
              <TabsContent value="income">
                <SimilarSocieties type="income" />
              </TabsContent>
              <TabsContent value="location">
                <SimilarSocieties type="location" />
              </TabsContent>
            </Tabs>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Stats;
