import { useState } from "react";
import { AlertTriangle, Shield, Eye, Zap, Clock, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: "attack" | "vulnerability" | "anomaly" | "breach";
  severity: "critical" | "high" | "medium" | "low";
  title: string;
  description: string;
  source: string;
  mitreId?: string;
  status: "active" | "investigating" | "resolved";
}

const SecurityEvents = () => {
  const [events] = useState<SecurityEvent[]>([
    {
      id: "1",
      timestamp: "2024-01-15T14:32:00Z",
      type: "attack",
      severity: "critical",
      title: "SQL Injection Attempt Detected",
      description: "Malicious SQL injection attempt on /api/users endpoint from IP 192.168.1.100",
      source: "WAF",
      mitreId: "T1190",
      status: "active"
    },
    {
      id: "2",
      timestamp: "2024-01-15T14:28:00Z",
      type: "vulnerability",
      severity: "high",
      title: "Outdated SSL Certificate",
      description: "SSL certificate for api.securesoc.com expires in 7 days",
      source: "Certificate Monitor",
      status: "investigating"
    },
    {
      id: "3",
      timestamp: "2024-01-15T14:25:00Z",
      type: "anomaly",
      severity: "medium",
      title: "Unusual Login Pattern",
      description: "User admin@company.com logged in from 5 different countries in 10 minutes",
      source: "Identity Provider",
      mitreId: "T1078",
      status: "investigating"
    },
    {
      id: "4",
      timestamp: "2024-01-15T14:20:00Z",
      type: "attack",
      severity: "medium",
      title: "Brute Force Attack",
      description: "Multiple failed login attempts detected from IP range 203.0.113.0/24",
      source: "Auth Service",
      mitreId: "T1110",
      status: "resolved"
    },
    {
      id: "5",
      timestamp: "2024-01-15T14:15:00Z",
      type: "vulnerability",
      severity: "low",
      title: "Missing Security Headers",
      description: "X-Frame-Options header missing on 3 endpoints",
      source: "Security Scanner",
      status: "resolved"
    }
  ]);

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-security-critical" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-security-high" />;
      case "medium":
        return <Eye className="h-4 w-4 text-security-medium" />;
      case "low":
        return <Shield className="h-4 w-4 text-security-low" />;
      default:
        return <Shield className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-security-critical border-security-critical/50";
      case "high":
        return "text-security-high border-security-high/50";
      case "medium":
        return "text-security-medium border-security-medium/50";
      case "low":
        return "text-security-low border-security-low/50";
      default:
        return "text-muted-foreground border-muted/50";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-security-critical/20 text-security-critical";
      case "investigating":
        return "bg-security-medium/20 text-security-medium";
      case "resolved":
        return "bg-security-low/20 text-security-low";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  return (
    <Card className="security-elevation border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Zap className="h-5 w-5 text-primary" />
          <span>Security Events Timeline</span>
          <Badge variant="outline" className="ml-auto">
            {events.filter(e => e.status === "active").length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event, index) => (
            <div
              key={event.id}
              className={`p-4 rounded-lg border border-border/50 transition-all duration-300 hover:border-primary/50 ${
                event.severity === "critical" ? "animate-security-pulse" : ""
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  <div className="mt-1">
                    {getSeverityIcon(event.severity)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-semibold text-foreground">{event.title}</h4>
                      <Badge
                        variant="outline"
                        className={getSeverityColor(event.severity)}
                      >
                        {event.severity.toUpperCase()}
                      </Badge>
                      {event.mitreId && (
                        <Badge variant="outline" className="text-primary border-primary/50">
                          MITRE {event.mitreId}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      {event.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>{formatTimestamp(event.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3" />
                        <span>{event.source}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(event.status)}>
                    {event.status}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Investigate
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <Button variant="outline" className="w-full">
            Load More Events
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityEvents;