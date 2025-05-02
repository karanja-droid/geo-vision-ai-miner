
import React from 'react';
import { 
  Table, TableHeader, TableRow, TableHead, 
  TableBody, TableCell 
} from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <FileText className="mr-2 h-5 w-5" />
          Audit Logs
        </CardTitle>
        <CardDescription>
          System activity logs for security monitoring.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                {auditLogs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-4">
                      No audit logs found
                    </TableCell>
                  </TableRow>
                ) : (
                  auditLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        {new Date(log.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>{log.user_id.substring(0, 8)}...</TableCell>
                      <TableCell>
                        <Badge variant="outline">{log.action}</Badge>
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
    </Card>
  );
};

export default AuditLogsViewer;
