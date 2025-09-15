import { Shield, AlertTriangle, Eye, Lock, Users, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const SecurityHeader = () => {
  const securityStatus = {
    overall: "secure",
    activeThreats: 3,
    vulnerabilities: 12,
    compliance: 98.5,
    lastScan: "2 minutes ago"
  };

  return (
    <div className="w-full">
      {/* Main Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-lg bg-primary/20 security-glow">
            <Shield className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-foreground">SecureSOC Dashboard</h1>
            <p className="text-muted-foreground">Real-time Security Operations Center</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <Badge variant="outline" className="text-success border-success/50">
            <Activity className="w-4 h-4 mr-2" />
            System Online
          </Badge>
          <Badge variant="outline" className="text-muted-foreground">
            Last Updated: {securityStatus.lastScan}
          </Badge>
        </div>
      </div>

      {/* Security Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 security-elevation border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Security Status</p>
              <p className="text-2xl font-bold text-success">SECURE</p>
            </div>
            <Shield className="h-8 w-8 text-success" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-success rounded-full mr-2 animate-security-pulse"></div>
              All systems operational
            </div>
          </div>
        </Card>

        <Card className="p-6 security-elevation border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Active Threats</p>
              <p className="text-2xl font-bold text-security-medium">{securityStatus.activeThreats}</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-security-medium" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-security-medium rounded-full mr-2 animate-security-pulse"></div>
              2 Medium, 1 Low priority
            </div>
          </div>
        </Card>

        <Card className="p-6 security-elevation border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Vulnerabilities</p>
              <p className="text-2xl font-bold text-security-high">{securityStatus.vulnerabilities}</p>
            </div>
            <Eye className="h-8 w-8 text-security-high" />
          </div>
          <div className="mt-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <div className="w-2 h-2 bg-security-high rounded-full mr-2"></div>
              2 Critical, 10 others
            </div>
          </div>
        </Card>

        <Card className="p-6 security-elevation border-border/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Compliance Score</p>
              <p className="text-2xl font-bold text-success">{securityStatus.compliance}%</p>
            </div>
            <Lock className="h-8 w-8 text-success" />
          </div>
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-success h-2 rounded-full transition-all duration-1000"
                style={{ width: `${securityStatus.compliance}%` }}
              ></div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <Badge variant="secondary" className="px-4 py-2 hover:bg-primary/20 cursor-pointer transition-colors">
          <Users className="w-4 h-4 mr-2" />
          Incident Response
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 hover:bg-primary/20 cursor-pointer transition-colors">
          <AlertTriangle className="w-4 h-4 mr-2" />
          Threat Hunting
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 hover:bg-primary/20 cursor-pointer transition-colors">
          <Eye className="w-4 h-4 mr-2" />
          Vulnerability Scan
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 hover:bg-primary/20 cursor-pointer transition-colors">
          <Shield className="w-4 h-4 mr-2" />
          Security Audit
        </Badge>
      </div>
    </div>
  );
};

export default SecurityHeader;