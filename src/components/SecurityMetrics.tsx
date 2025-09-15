import { TrendingUp, Shield, AlertTriangle, Activity, Users, Lock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SecurityMetrics = () => {
  const metrics = {
    securityScore: 87,
    incidentsResolved: 142,
    threatDetectionRate: 94.2,
    complianceScore: 98.5,
    vulnerabilitiesFixed: 89,
    userTrainingCompletion: 76,
    systemUptime: 99.9,
    lastIncident: "3 days ago"
  };

  const recentTrends = [
    {
      metric: "Threat Detection",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: <Shield className="h-4 w-4" />
    },
    {
      metric: "Incident Response Time",
      value: "4.2 min",
      change: "-1.8 min",
      trend: "up",
      icon: <Activity className="h-4 w-4" />
    },
    {
      metric: "False Positives",
      value: "8.3%",
      change: "-3.2%",
      trend: "up",
      icon: <AlertTriangle className="h-4 w-4" />
    },
    {
      metric: "Security Training",
      value: "76%",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-4 w-4" />
    }
  ];

  const complianceFrameworks = [
    { name: "SOC 2 Type II", score: 98, status: "compliant" },
    { name: "ISO 27001", score: 95, status: "compliant" },
    { name: "GDPR", score: 92, status: "compliant" },
    { name: "HIPAA", score: 88, status: "partial" },
    { name: "PCI DSS", score: 96, status: "compliant" }
  ];

  const getComplianceColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "text-success bg-success/10 border-success/50";
      case "partial":
        return "text-security-medium bg-security-medium/10 border-security-medium/50";
      case "non-compliant":
        return "text-security-critical bg-security-critical/10 border-security-critical/50";
      default:
        return "text-muted-foreground bg-muted/10 border-muted/50";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="h-3 w-3 text-success" />
    ) : (
      <TrendingUp className="h-3 w-3 text-security-critical rotate-180" />
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Security Score */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-primary" />
            <span>Security Posture Score</span>
            <Badge variant="outline" className="ml-auto text-success border-success/50">
              Excellent
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl font-bold text-success">{metrics.securityScore}/100</div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Last Updated</div>
              <div className="text-sm font-medium">5 minutes ago</div>
            </div>
          </div>
          <Progress value={metrics.securityScore} className="h-3 mb-2" />
          <div className="text-sm text-muted-foreground">
            Your security posture is excellent. Continue monitoring for optimal protection.
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="security-elevation border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Incidents Resolved</p>
                <p className="text-2xl font-bold text-success">{metrics.incidentsResolved}</p>
              </div>
              <Activity className="h-8 w-8 text-success" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              Last incident: {metrics.lastIncident}
            </div>
          </CardContent>
        </Card>

        <Card className="security-elevation border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threat Detection</p>
                <p className="text-2xl font-bold text-primary">{metrics.threatDetectionRate}%</p>
              </div>
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <div className="mt-4">
              <Progress value={metrics.threatDetectionRate} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="security-elevation border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Vulnerabilities Fixed</p>
                <p className="text-2xl font-bold text-security-medium">{metrics.vulnerabilitiesFixed}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-security-medium" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              This month
            </div>
          </CardContent>
        </Card>

        <Card className="security-elevation border-border/50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Uptime</p>
                <p className="text-2xl font-bold text-success">{metrics.systemUptime}%</p>
              </div>
              <Activity className="h-8 w-8 text-success animate-security-pulse" />
            </div>
            <div className="mt-4 text-xs text-muted-foreground">
              30-day average
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Trends */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            <span>Performance Trends</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentTrends.map((trend, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-lg bg-primary/20">
                    {trend.icon}
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{trend.metric}</p>
                    <p className="text-2xl font-bold text-primary">{trend.value}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  {getTrendIcon(trend.trend)}
                  <span className={trend.trend === "up" ? "text-success" : "text-security-critical"}>
                    {trend.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Dashboard */}
      <Card className="security-elevation border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="h-5 w-5 text-primary" />
            <span>Compliance Status</span>
            <Badge variant="outline" className="ml-auto text-success border-success/50">
              {metrics.complianceScore}% Overall
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {complianceFrameworks.map((framework, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                <div className="flex items-center space-x-4">
                  <div className="font-medium text-foreground">{framework.name}</div>
                  <Badge className={getComplianceColor(framework.status)}>
                    {framework.status}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-sm font-mono text-primary">{framework.score}%</div>
                  <div className="w-24">
                    <Progress value={framework.score} className="h-2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecurityMetrics;