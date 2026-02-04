import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { api } from '@/services/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import RichTextEditor from '@/components/shared/RichTextEditor';

const NewsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingNews, setEditingNews] = useState<any | null>(null);
  const { addAuditLog } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: allBlogs = [], isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: () => api.getBlogs()
  });

  const newsArticles = Array.isArray(allBlogs) ? allBlogs.filter((blog: any) =>
    blog.category === 'News' || blog.category === 'Press Release'
  ) : [];

  const filteredNews = newsArticles.filter((article: any) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    article.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createMutation = useMutation({
    mutationFn: api.createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      addAuditLog('CREATE_NEWS', 'Created news article');
      toast({ title: 'Success', description: 'News article created' });
      setIsCreateOpen(false);
      resetForm();
    },
    onError: (e) => toast({ title: 'Error', description: String(e), variant: 'destructive' })
  });

  const updateMutation = useMutation({
    mutationFn: (data: any) => api.updateBlogPost(data.id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      addAuditLog('UPDATE_NEWS', 'Updated news article');
      toast({ title: 'Success', description: 'News article updated' });
      setEditingNews(null);
      resetForm();
    },
    onError: (e) => toast({ title: 'Error', description: String(e), variant: 'destructive' })
  });

  const deleteMutation = useMutation({
    mutationFn: api.deleteBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      addAuditLog('DELETE_NEWS', 'Deleted news article');
      toast({ title: 'Success', description: 'News article deleted' });
    }
  });

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'News',
    image: '',
    author: 'Yiaga Africa'
  });

  const handleCreate = () => {
    createMutation.mutate(formData);
  };

  const handleUpdate = () => {
    if (editingNews) {
      updateMutation.mutate({ ...formData, id: editingNews.id });
    }
  };

  const handleDelete = (article: any) => {
    if (confirm("Delete this article?")) {
      deleteMutation.mutate(article.id);
    }
  };

  const handleEdit = (article: any) => {
    setEditingNews(article);
    setFormData({
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      category: article.category,
      image: article.image || '',
      author: article.author || 'Yiaga Africa'
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'News',
      image: '',
      author: 'Yiaga Africa'
    });
  };

  const NewsForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter news title"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="excerpt">Excerpt</Label>
        <Textarea
          id="excerpt"
          value={formData.excerpt}
          onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          placeholder="Brief description"
          rows={2}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="content">Content</Label>
        <RichTextEditor
          value={formData.content}
          onChange={(val) => setFormData({ ...formData, content: val })}
          className="h-64 mb-12"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Input
          id="category"
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="e.g., Press Release"
        />
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => { setIsCreateOpen(false); setEditingNews(null); resetForm(); }}>
          Cancel
        </Button>
        <Button onClick={onSubmit}>{submitLabel}</Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">News Management</h1>
          <p className="text-muted-foreground">Create and manage news articles</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Article
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New News Article</DialogTitle>
            </DialogHeader>
            <NewsForm onSubmit={handleCreate} submitLabel="Create Article" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" />
          Filter
        </Button>
      </div>

      {/* News Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredNews.map((article) => (
                <tr key={article.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground line-clamp-1">{article.title}</p>
                    <p className="text-muted-foreground text-xs line-clamp-1 mt-1">{article.excerpt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-secondary/10 text-secondary rounded-lg text-xs font-medium">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{article.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={`/news/${article.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Dialog open={editingNews?.id === article.id} onOpenChange={(open) => !open && setEditingNews(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(article)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit News Article</DialogTitle>
                          </DialogHeader>
                          <NewsForm onSubmit={handleUpdate} submitLabel="Update Article" />
                        </DialogContent>
                      </Dialog>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(article)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default NewsManagement;
