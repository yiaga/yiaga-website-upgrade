import { useState } from 'react';
import { Search, Filter, Eye, UserCheck, UserX, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const demoUsers = [
  { id: '1', name: 'Admin User', email: 'admin@yiaga.org', role: 'admin', status: 'active', joined: '2024-01-15' },
  { id: '2', name: 'Technical User', email: 'technical@yiaga.org', role: 'technical', status: 'active', joined: '2024-02-20' },
  { id: '3', name: 'Regular User', email: 'user@yiaga.org', role: 'user', status: 'active', joined: '2024-03-10' },
];

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { addAuditLog } = useAuth();
  const { toast } = useToast();

  const handleRoleChange = (userId: string, newRole: string) => {
    addAuditLog('CHANGE_ROLE', `Changed user ${userId} role to ${newRole}`);
    toast({ title: 'Role updated', description: `User role changed to ${newRole} (demo mode).` });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">User Management</h1>
          <p className="text-muted-foreground">Manage users and their roles</p>
        </div>
        <Button className="gap-2"><Plus className="w-4 h-4" />Add User</Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
              <th className="px-6 py-4 font-medium">User</th>
              <th className="px-6 py-4 font-medium">Role</th>
              <th className="px-6 py-4 font-medium">Status</th>
              <th className="px-6 py-4 font-medium">Joined</th>
              <th className="px-6 py-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {demoUsers.map((user) => (
              <tr key={user.id} className="border-t border-border">
                <td className="px-6 py-4">
                  <p className="font-medium text-foreground">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </td>
                <td className="px-6 py-4">
                  <Select defaultValue={user.role} onValueChange={(val) => handleRoleChange(user.id, val)}>
                    <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="user">User</SelectItem>
                      <SelectItem value="technical">Technical</SelectItem>
                      <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">{user.status}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{user.joined}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
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

export default UserManagement;
