
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Society, societies } from '@/lib/data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Users, DollarSign, MapPin, Calendar, User, 
  ArrowLeft, Globe, History, Image, Info
} from 'lucide-react';
import SocietyOverview from '@/components/society-profile/SocietyOverview';
import SocietyMap from '@/components/society-profile/SocietyMap';
import SocietyHistory from '@/components/society-profile/SocietyHistory';
import SocietyGallery from '@/components/society-profile/SocietyGallery';

const SocietyProfile = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [society, setSociety] = useState<Society | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (!id) return;
    
    const foundSociety = societies.find(s => s.id === id);
    if (foundSociety) {
      setSociety(foundSociety);
      document.title = `${foundSociety.name} | Futuristic Societies`;
    } else {
      // If society not found, redirect to home
      navigate('/');
    }
  }, [id, navigate]);

  if (!society) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse p-6">
          <p className="text-muted-foreground">Loading society details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-[72px]">
        {/* Back button and header */}
        <div className="container px-4 sm:px-6 py-6">
          <Button 
            variant="ghost" 
            size="sm" 
            className="mb-4"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Societies
          </Button>
          
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{society.name}</h1>
                <span className="text-xs font-medium px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
                  {society.category}
                </span>
              </div>
              <p className="text-muted-foreground mt-1">{society.location}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Established: {society.established}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">By {society.organizer}</span>
              </div>
            </div>
          </div>
          
          {/* Tab navigation */}
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full md:w-auto grid-cols-4 mb-8">
              <TabsTrigger value="overview" className="flex items-center gap-1">
                <Info className="h-4 w-4" />
                <span className="hidden sm:inline">Overview</span>
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span className="hidden sm:inline">Map</span>
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-1">
                <History className="h-4 w-4" />
                <span className="hidden sm:inline">History</span>
              </TabsTrigger>
              <TabsTrigger value="gallery" className="flex items-center gap-1">
                <Image className="h-4 w-4" />
                <span className="hidden sm:inline">Gallery</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <SocietyOverview society={society} />
            </TabsContent>
            
            <TabsContent value="map">
              <SocietyMap society={society} />
            </TabsContent>
            
            <TabsContent value="history">
              <SocietyHistory society={society} />
            </TabsContent>
            
            <TabsContent value="gallery">
              <SocietyGallery society={society} />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SocietyProfile;
