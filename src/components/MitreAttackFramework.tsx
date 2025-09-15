import { useState } from "react";
import { Target, Shield, Eye, Zap, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MitreTechnique {
  id: string;
  name: string;
  description: string;
  tactic: string;
  detectionMethods: string[];
  mitigations: string[];
  examples: string[];
  riskLevel: "critical" | "high" | "medium" | "low";
  detectedEvents: number;
}

const MitreAttackFramework = () => {
  const [techniques] = useState<MitreTechnique[]>([
    {
      id: "T1190",
      name: "Exploit Public-Facing Application",
      description: "Adversaries may attempt to take advantage of a weakness in an Internet-facing computer or program using software, data, or commands in order to cause unintended or unanticipated behavior.",
      tactic: "Initial Access",
      detectionMethods: [
        "Web application firewall logs",
        "Network intrusion detection",
        "Application security monitoring"
      ],
      mitigations: [
        "Application isolation and sandboxing",
        "Patch management",
        "Input validation",
        "Web application firewalls"
      ],
      examples: [
        "SQL injection attacks",
        "Cross-site scripting (XSS)",
        "Remote code execution vulnerabilities"
      ],
      riskLevel: "critical",
      detectedEvents: 15
    },
    {
      id: "T1078",
      name: "Valid Accounts",
      description: "Adversaries may obtain and abuse credentials of existing accounts as a means of gaining Initial Access, Persistence, Privilege Escalation, or Defense Evasion.",
      tactic: "Initial Access",
      detectionMethods: [
        "User behavior analytics",
        "Authentication logs monitoring",
        "Geolocation analysis"
      ],
      mitigations: [
        "Multi-factor authentication",
        "Account access controls",
        "Password policies",
        "Privileged account management"
      ],
      examples: [
        "Credential stuffing attacks",
        "Password spraying",
        "Account takeover"
      ],
      riskLevel: "high",
      detectedEvents: 8
    },
    {
      id: "T1110",
      name: "Brute Force",
      description: "Adversaries may use brute force techniques to gain access to accounts when passwords are unknown or when password hashes are obtained.",
      tactic: "Credential Access",
      detectionMethods: [
        "Failed authentication monitoring",
        "Account lockout detection",
        "Rate limiting alerts"
      ],
      mitigations: [
        "Account lockout policies",
        "Multi-factor authentication",
        "Strong password requirements",
        "Rate limiting"
      ],
      examples: [
        "Password brute forcing",
        "Credential cracking",
        "Hash cracking"
      ],
      riskLevel: "medium",
      detectedEvents: 23
    },
    {
      id: "T1055",
      name: "Process Injection",
      description: "Adversaries may inject code into processes in order to evade process-based defenses as well as possibly elevate privileges.",
      tactic: "Defense Evasion",
      detectionMethods: [
        "Process monitoring",
        "Memory analysis",
        "Behavioral detection"
      ],
      mitigations: [
        "Behavior prevention on endpoint",
        "Privileged account management",
        "Application isolation"
      ],
      examples: [
        "DLL injection",
        "Process hollowing",
        "Reflective DLL loading"
      ],
      riskLevel: "high",
      detectedEvents: 3
    }
  ]);

  const [selectedTactic, setSelectedTactic] = useState("all");

  const tactics = [
    "Initial Access",
    "Execution", 
    "Persistence",
    "Privilege Escalation",
    "Defense Evasion",
    "Credential Access",
    "Discovery",
    "Lateral Movement",
    "Collection",
    "Command and Control",
    "Exfiltration",
    "Impact"
  ];

  const filteredTechniques = selectedTactic === "all" 
    ? techniques 
    : techniques.filter(t => t.tactic === selectedTactic);

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "critical":
        return "text-security-critical bg-security-critical/10 border-security-critical/50";
      case "high":
        return "text-security-high bg-security-high/10 border-security-high/50";
      case "medium":
        return "text-security-medium bg-security-medium/10 border-security-medium/50";
      case "low":
        return "text-security-low bg-security-low/10 border-security-low/50";
      default:
        return "text-muted-foreground bg-muted/10 border-muted/50";
    }
  };

  const getTacticStats = () => {
    const stats: { [key: string]: number } = {};
    techniques.forEach(technique => {
      stats[technique.tactic] = (stats[technique.tactic] || 0) + technique.detectedEvents;
    });
    return stats;
  };

  const tacticStats = getTacticStats();

  return (
    <div className="space-y-6">
      {/* MITRE ATT&CK Overview */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5 text-primary" />
            <span>MITRE ATT&CK Framework</span>
            <Badge variant="outline" className="ml-auto text-primary border-primary/50">
              {techniques.length} Techniques Monitored
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-primary/10 border border-primary/20">
              <div className="text-2xl font-bold text-primary">
                {techniques.reduce((sum, t) => sum + t.detectedEvents, 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Events</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-security-critical/10 border border-security-critical/20">
              <div className="text-2xl font-bold text-security-critical">
                {techniques.filter(t => t.riskLevel === "critical").length}
              </div>
              <div className="text-sm text-muted-foreground">Critical Risk</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-security-high/10 border border-security-high/20">
              <div className="text-2xl font-bold text-security-high">
                {techniques.filter(t => t.riskLevel === "high").length}
              </div>
              <div className="text-sm text-muted-foreground">High Risk</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-success/10 border border-success/20">
              <div className="text-2xl font-bold text-success">
                {techniques.filter(t => t.detectedEvents > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">Active Detections</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tactics Overview */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Tactics Coverage</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {tactics.map((tactic) => (
              <Button
                key={tactic}
                variant={selectedTactic === tactic ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTactic(tactic)}
                className="justify-between"
              >
                <span className="text-xs">{tactic}</span>
                {tacticStats[tactic] && (
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {tacticStats[tactic]}
                  </Badge>
                )}
              </Button>
            ))}
            <Button
              variant={selectedTactic === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTactic("all")}
            >
              All Tactics
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Techniques Details */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Eye className="h-5 w-5 text-primary" />
            <span>Techniques Analysis</span>
            <Badge variant="outline" className="ml-auto">
              {filteredTechniques.length} Techniques
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {filteredTechniques.map((technique) => (
              <div
                key={technique.id}
                className="p-6 rounded-lg border border-border/50 transition-all duration-300 hover:border-primary/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {technique.id}: {technique.name}
                      </h3>
                      <Badge className={getRiskColor(technique.riskLevel)}>
                        {technique.riskLevel.toUpperCase()}
                      </Badge>
                      <Badge variant="outline" className="text-primary border-primary/50">
                        {technique.tactic}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      {technique.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-primary">{technique.detectedEvents}</div>
                    <div className="text-xs text-muted-foreground">Events Detected</div>
                  </div>
                </div>

                <Tabs defaultValue="detection" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="detection">Detection</TabsTrigger>
                    <TabsTrigger value="mitigation">Mitigation</TabsTrigger>
                    <TabsTrigger value="examples">Examples</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="detection" className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Detection Methods:</h4>
                    {technique.detectionMethods.map((method, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Eye className="h-3 w-3 text-primary" />
                        <span className="text-muted-foreground">{method}</span>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="mitigation" className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Mitigations:</h4>
                    {technique.mitigations.map((mitigation, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <Shield className="h-3 w-3 text-success" />
                        <span className="text-muted-foreground">{mitigation}</span>
                      </div>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="examples" className="space-y-2">
                    <h4 className="text-sm font-semibold text-foreground mb-2">Attack Examples:</h4>
                    {technique.examples.map((example, index) => (
                      <div key={index} className="flex items-center space-x-2 text-sm">
                        <AlertTriangle className="h-3 w-3 text-security-medium" />
                        <span className="text-muted-foreground">{example}</span>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MitreAttackFramework;