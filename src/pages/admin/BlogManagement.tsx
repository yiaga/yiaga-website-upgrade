import { useState } from 'react';
import { Plus, Edit, Trash2, Eye, Search, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { blogPosts } from '@/data/blogData';
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

const BlogManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<typeof blogPosts[0] | null>(null);
  const { addAuditLog } = useAuth();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    author: '',
  });

  const filteredPosts = blogPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = () => {
    addAuditLog('CREATE_BLOG', `Created blog post: ${formData.title}`);
    toast({
      title: 'Blog post created',
      description: 'The blog post has been created successfully (demo mode).',
    });
    setIsCreateOpen(false);
    resetForm();
  };

  const handleEdit = (post: typeof blogPosts[0]) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      category: post.category,
      author: post.author,
    });
  };

  const handleUpdate = () => {
    addAuditLog('UPDATE_BLOG', `Updated blog post: ${formData.title}`);
    toast({
      title: 'Blog post updated',
      description: 'The blog post has been updated successfully (demo mode).',
    });
    setEditingPost(null);
    resetForm();
  };

  const handleDelete = (post: typeof blogPosts[0]) => {
    addAuditLog('DELETE_BLOG', `Deleted blog post: ${post.title}`);
    toast({
      title: 'Blog post deleted',
      description: 'The blog post has been deleted successfully (demo mode).',
      variant: 'destructive',
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: '',
      author: '',
    });
  };

  const PostForm = ({ onSubmit, submitLabel }: { onSubmit: () => void; submitLabel: string }) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Enter blog title"
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
        <Textarea
          id="content"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          placeholder="Full blog content"
          rows={6}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            placeholder="e.g., Elections"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="author">Author</Label>
          <Input
            id="author"
            value={formData.author}
            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
            placeholder="Author name"
          />
        </div>
      </div>
      <div className="flex justify-end gap-3 pt-4">
        <Button variant="outline" onClick={() => { setIsCreateOpen(false); setEditingPost(null); resetForm(); }}>
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
          <h1 className="text-2xl font-display font-bold text-foreground">Blog Management</h1>
          <p className="text-muted-foreground">Create and manage blog posts</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" />
              New Post
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Blog Post</DialogTitle>
            </DialogHeader>
            <PostForm onSubmit={handleCreate} submitLabel="Create Post" />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search posts..."
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

      {/* Posts Table */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50 text-left text-sm text-muted-foreground">
                <th className="px-6 py-4 font-medium">Title</th>
                <th className="px-6 py-4 font-medium">Category</th>
                <th className="px-6 py-4 font-medium">Author</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredPosts.map((post) => (
                <tr key={post.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground line-clamp-1">{post.title}</p>
                    <p className="text-muted-foreground text-xs line-clamp-1 mt-1">{post.excerpt}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-primary/10 text-primary rounded-lg text-xs font-medium">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{post.author}</td>
                  <td className="px-6 py-4 text-muted-foreground">{post.date}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
                        <a href={`/blog/${post.slug}`} target="_blank">
                          <Eye className="w-4 h-4" />
                        </a>
                      </Button>
                      <Dialog open={editingPost?.id === post.id} onOpenChange={(open) => !open && setEditingPost(null)}>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(post)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>Edit Blog Post</DialogTitle>
                          </DialogHeader>
                          <PostForm onSubmit={handleUpdate} submitLabel="Update Post" />
                        </DialogContent>
                      </Dialog>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        onClick={() => handleDelete(post)}
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

export default BlogManagement;
