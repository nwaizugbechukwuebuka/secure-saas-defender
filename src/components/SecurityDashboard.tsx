import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SecurityHeader from "./SecurityHeader";
import SecurityEvents from "./SecurityEvents";
import VulnerabilityAssessment from "./VulnerabilityAssessment";
import MitreAttackFramework from "./MitreAttackFramework";
import SecurityMetrics from "./SecurityMetrics";
import securityHeroBg from "@/assets/security-hero-bg.jpg";

const SecurityDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div 
      className="min-h-screen bg-background p-6"
      style={{
        backgroundImage: `linear-gradient(rgba(33, 35, 45, 0.95), rgba(33, 35, 45, 0.98)), url(${securityHeroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Security Header */}
        <SecurityHeader />

        {/* Main Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="events">Security Events</TabsTrigger>
            <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
            <TabsTrigger value="mitre">MITRE ATT&CK</TabsTrigger>
            <TabsTrigger value="metrics">Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-6">
                <SecurityEvents />
              </div>
              <div className="space-y-6">
                <SecurityMetrics />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events">
            <SecurityEvents />
          </TabsContent>

          <TabsContent value="vulnerabilities">
            <VulnerabilityAssessment />
          </TabsContent>

          <TabsContent value="mitre">
            <MitreAttackFramework />
          </TabsContent>

          <TabsContent value="metrics">
            <SecurityMetrics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SecurityDashboard;