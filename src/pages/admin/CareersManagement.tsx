import { useState } from 'react';
import { Search, Eye, CheckCircle, XCircle, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const demoApplications = [
  { id: 1, name: 'Amina Bello', email: 'amina@email.com', position: 'Program Officer - Elections', date: '2024-12-05', status: 'pending' },
  { id: 2, name: 'Chidi Okoro', email: 'chidi@email.com', position: 'Communications Manager', date: '2024-12-04', status: 'reviewed' },
  { id: 3, name: 'Fatima Yusuf', email: 'fatima@email.com', position: 'Research Analyst', date: '2024-12-03', status: 'shortlisted' },
];

const CareersManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addAuditLog } = useAuth();
  const { toast } = useToast();

  const handleStatusChange = (id: number, status: string) => {
    addAuditLog('UPDATE_APPLICATION', `Updated application #${id} status to ${status}`);
    toast({ title: 'Application updated', description: `Status changed to ${status} (demo mode).` });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'shortlisted': return 'bg-primary/10 text-primary';
      case 'reviewed': return 'bg-secondary/10 text-secondary';
      case 'rejected': return 'bg-destructive/10 text-destructive';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Career Applications</h1>
        <p className="text-muted-foreground">Manage job applications and recruitment</p>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search applications..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
              <th className="px-6 py-4 font-medium">Applicant</th>
              <th className="px-6 py-4 font-medium">Position</th>
              <th className="px-6 py-4 font-medium">Date</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {demoApplications.map((app) => (
              <tr key={app.id} className="border-t border-border">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{app.name}</p>
                  <p className="text-xs text-muted-foreground">{app.email}</p>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{app.position}</td>
                <td className="px-6 py-4 text-muted-foreground">{app.date}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-full text-xs capitalize ${getStatusColor(app.status)}`}>{app.status}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><FileText className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => handleStatusChange(app.id, 'shortlisted')}><CheckCircle className="w-4 h-4" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleStatusChange(app.id, 'rejected')}><XCircle className="w-4 h-4" /></Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CareersManagement;
