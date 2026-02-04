import { useState } from 'react';
import { Plus, Trash2, Search, Loader2, FileText, Download, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api, Resource } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

const ResourcesManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const { addAuditLog } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch resources
  const { data: resources = [], isLoading } = useQuery({
    queryKey: ['resources', 'all'],
    queryFn: () => api.getResources()
  });

  // Mutations
  const createMutation = useMutation({
    mutationFn: api.createResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      addAuditLog('CREATE_RESOURCE', `Created new resource`);
      toast({ title: 'Success', description: 'Resource created successfully' });
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (error) => {
      toast({ title: 'Error', description: String(error), variant: 'destructive' });
    }
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteResource,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources'] });
      addAuditLog('DELETE_RESOURCE', `Deleted resource`);
      toast({ title: 'Success', description: 'Resource deleted successfully' });
    }
  });

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'PDF Report',
    category: 'Reports',
    file_url: '',
    file_size: '0 MB'
  });

  const filteredResources = resources.filter(res =>
    res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    res.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    // Add logic to upload file if we had file input, for now assuming URL or just text
    // But user wants "uploading resources".
    // So I need file upload here too.
    if (!formData.file_url) {
      toast({ title: "Error", description: "Please upload a file or provide a URL", variant: "destructive" });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleDelete = (res: Resource) => {
    if (confirm('Are you sure you want to delete this resource?')) {
      deleteMutation.mutate(res.id);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const { url } = await api.uploadFile(file);
        // Estimate size
        const sizeMB = (file.size / (1024 * 1024)).toFixed(1) + ' MB';
        setFormData({ ...formData, file_url: url, file_size: sizeMB });
        toast({ title: 'Success', description: 'File uploaded successfully' });
      } catch (error) {
        toast({ title: 'Error', description: 'Failed to upload file', variant: 'destructive' });
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      type: 'PDF Report',
      category: 'Reports',
      file_url: '',
      file_size: '0 MB'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Resources Management</h1>
          <p className="text-muted-foreground">Upload and manage resources</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              Upload Resource
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>Upload New Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={e => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Resource Title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the resource..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Type</Label>
                  <select
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={formData.type}
                    onChange={e => setFormData({ ...formData, type: e.target.value })}
                  >
                    <option>PDF Report</option>
                    <option>E-Book</option>
                    <option>Video</option>
                    <option>Toolkit</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Reports">Reports</SelectItem>
                      <SelectItem value="Ehooks">E-Books</SelectItem>
                      <SelectItem value="Toolkits">Toolkits</SelectItem>
                      <SelectItem value="Factsheets">Factsheets</SelectItem>
                      <SelectItem value="Policy Briefs">Policy Briefs</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>File</Label>
                <Input type="file" onChange={handleFileUpload} />
                {formData.file_url && <p className="text-xs text-green-500 truncate">Uploaded: {formData.file_url}</p>}
              </div>

              <Button className="w-full mt-4" onClick={handleCreate} disabled={createMutation.isPending}>
                {createMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Upload Resource
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Type</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">File</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredResources.map((res) => (
                <tr key={res.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium">{res.title}</td>
                  <td className="px-6 py-4">{res.type}</td>
                  <td className="px-6 py-4">{res.category}</td>
                  <td className="px-6 py-4">
                    <a href={res.file_url} target="_blank" className="text-primary hover:underline flex items-center gap-1">
                      <Download className="w-3 h-3" /> {res.file_size}
                    </a>
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(res)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ResourcesManagement;
