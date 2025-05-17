
import React, { useState } from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Filter, Download, AlertCircle } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AuditLog {
  id: string;
  user_id: string;
  action: string;
  entity: string;
  entity_id: string;
  details: any;
  created_at: string;
}

interface AuditLogsViewerProps {
  auditLogs: AuditLog[];
  loading: boolean;
}

const AuditLogsViewer: React.FC<AuditLogsViewerProps> = ({ auditLogs, loading }) => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState<string>("");
  const [entityFilter, setEntityFilter] = useState<string>("");
  const [timeRange, setTimeRange] = useState<string>("all");
  
  // Get unique actions and entities for filters
  const uniqueActions = [...new Set(auditLogs.map(log => log.action))];
  const uniqueEntities = [...new Set(auditLogs.map(log => log.entity))];
  
  // Calculate stats for security events
  const securityEvents = auditLogs.filter(log => 
    ['failed_login', 'password_reset', 'role_change', 'unauthorized_access_attempt'].includes(log.action)
  );
  
  // Filter logs based on search and filters
  const filteredLogs = auditLogs.filter(log => {
    // Apply search term filter
    const matchesSearch = !searchTerm || 
      JSON.stringify(log).toLowerCase().includes(searchTerm.toLowerCase());
    
    // Apply action filter  
    const matchesAction = !actionFilter || log.action === actionFilter;
    
    // Apply entity filter
    const matchesEntity = !entityFilter || log.entity === entityFilter;
    
    // Apply time range filter
    let matchesTimeRange = true;
    if (timeRange !== "all") {
      const logDate = new Date(log.created_at);
      const now = new Date();
      
      switch (timeRange) {
        case "24h":
          matchesTimeRange = now.getTime() - logDate.getTime() <= 24 * 60 * 60 * 1000;
          break;
        case "7d":
          matchesTimeRange = now.getTime() - logDate.getTime() <= 7 * 24 * 60 * 60 * 1000;
          break;
        case "30d":
          matchesTimeRange = now.getTime() - logDate.getTime() <= 30 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    
    return matchesSearch && matchesAction && matchesEntity && matchesTimeRange;
  });
  
  const exportLogs = () => {
    try {
      // Create CSV content
      const headers = "ID,User ID,Action,Entity,Entity ID,Created At,Details\n";
      const rows = filteredLogs.map(log => 
        `"${log.id}","${log.user_id}","${log.action}","${log.entity}","${log.entity_id}","${log.created_at}","${JSON.stringify(log.details).replace(/"/g, '""')}"`
      ).join('\n');
      
      const csvContent = `${headers}${rows}`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      // Create download link
      const a = document.createElement('a');
      a.setAttribute('href', url);
      a.setAttribute('download', `audit-logs-${new Date().toISOString()}.csv`);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast({
        title: "Logs exported",
        description: `Successfully exported ${filteredLogs.length} logs to CSV`,
      });
    } catch (error) {
      toast({
        title: "Export failed",
        description: "Could not export logs to CSV",
        variant: "destructive",
      });
    }
  };
  
  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'create':
        return 'default';
      case 'update':
        return 'outline';
      case 'delete':
        return 'destructive';
      case 'failed_login':
      case 'unauthorized_access_attempt':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <FileText className="mr-2 h-5 w-5" />
            Audit Logs
          </div>
          {securityEvents.length > 0 && (
            <Badge variant="destructive" className="ml-2">
              {securityEvents.length} security event{securityEvents.length !== 1 ? 's' : ''}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          System activity logs for security monitoring and compliance.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col md:flex-row gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search logs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2">
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All actions</SelectItem>
                  {uniqueActions.map(action => (
                    <SelectItem key={action} value={action}>{action}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={entityFilter} onValueChange={setEntityFilter}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Filter by entity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All entities</SelectItem>
                  {uniqueEntities.map(entity => (
                    <SelectItem key={entity} value={entity}>{entity}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Time range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All time</SelectItem>
                  <SelectItem value="24h">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Showing {filteredLogs.length} of {auditLogs.length} logs
            </div>
            <Button variant="outline" size="sm" onClick={exportLogs}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-4">Loading logs...</div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No audit logs found matching your filters
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredLogs.map((log) => (
                    <TableRow key={log.id} className={
                      ['failed_login', 'unauthorized_access_attempt'].includes(log.action) 
                        ? 'bg-red-50' 
                        : ''
                    }>
                      <TableCell>
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user_id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <Badge variant={getActionBadgeVariant(log.action)}>
                          {log.action}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.entity}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="ghost" onClick={() => {
                          toast({
                            title: "Log Details",
                            description: (
                              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 overflow-x-auto">
                                <code className="text-white">
                                  {JSON.stringify(log.details, null, 2)}
                                </code>
                              </pre>
                            ),
                          });
                        }}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground">
          {securityEvents.length > 0 && (
            <div className="flex items-center text-red-600">
              <AlertCircle className="h-4 w-4 mr-1" />
              {securityEvents.length} security event{securityEvents.length !== 1 ? 's' : ''} detected
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuditLogsViewer;
