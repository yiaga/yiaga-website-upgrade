import { useState } from 'react';
import { Search, Filter, Trash2, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const demoComments = [
  { id: 1, author: 'John Doe', email: 'john@example.com', content: 'Great article on election monitoring!', post: 'Technology in Elections', date: '2024-12-05', status: 'pending' },
  { id: 2, author: 'Jane Smith', email: 'jane@example.com', content: 'Very informative. Thank you for sharing.', post: 'Youth Participation', date: '2024-12-04', status: 'approved' },
  { id: 3, author: 'Mike Johnson', email: 'mike@example.com', content: 'I learned a lot from this.', post: 'Building Trust', date: '2024-12-03', status: 'approved' },
];

const CommentsManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [comments] = useState(demoComments);
  const { addAuditLog } = useAuth();
  const { toast } = useToast();

  const handleApprove = (id: number) => {
    addAuditLog('APPROVE_COMMENT', `Approved comment #${id}`);
    toast({ title: 'Comment approved', description: 'The comment is now visible (demo mode).' });
  };

  const handleReject = (id: number) => {
    addAuditLog('REJECT_COMMENT', `Rejected comment #${id}`);
    toast({ title: 'Comment rejected', description: 'The comment has been hidden (demo mode).', variant: 'destructive' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Comments Management</h1>
        <p className="text-muted-foreground">Moderate user comments on posts</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search comments..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" />Filter</Button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-card rounded-xl border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{comment.author}</p>
                    <p className="text-xs text-muted-foreground">{comment.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs ${comment.status === 'approved' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
                    {comment.status}
                  </span>
                </div>
                <p className="text-muted-foreground mb-2">{comment.content}</p>
                <p className="text-xs text-muted-foreground">On: {comment.post} • {comment.date}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" className="text-primary" onClick={() => handleApprove(comment.id)}><CheckCircle className="w-5 h-5" /></Button>
                <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleReject(comment.id)}><XCircle className="w-5 h-5" /></Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsManagement;
