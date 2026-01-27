import { useState } from "react";
import { User, Calendar, MessageCircle, ThumbsUp, Reply } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  likes: number;
  replies: Comment[];
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Adebayo Johnson",
    date: "Dec 5, 2024",
    content: "This is an excellent analysis of the current situation. The recommendations are practical and actionable. I particularly appreciate the focus on grassroots engagement.",
    likes: 24,
    replies: [
      {
        id: 2,
        author: "Ngozi Okonkwo",
        date: "Dec 5, 2024",
        content: "I completely agree! The grassroots approach is essential for sustainable change.",
        likes: 8,
        replies: [],
      },
    ],
  },
  {
    id: 3,
    author: "Olumide Adeniran",
    date: "Dec 4, 2024",
    content: "Great work by Yiaga Africa as always. I've participated in several of their programs and can attest to their impact. Looking forward to more initiatives like this.",
    likes: 15,
    replies: [],
  },
  {
    id: 4,
    author: "Fatima Mohammed",
    date: "Dec 3, 2024",
    content: "This article raises important points about youth engagement. As a young person, I feel inspired to get more involved in democratic processes.",
    likes: 31,
    replies: [],
  },
];

interface CommentCardProps {
  comment: Comment;
  isReply?: boolean;
}

const CommentCard = ({ comment, isReply = false }: CommentCardProps) => {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <div className={`${isReply ? 'ml-8 lg:ml-16' : ''}`}>
      <div className="bg-card rounded-xl p-6 border border-border">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-primary" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-semibold text-foreground">{comment.author}</span>
              <span className="text-muted-foreground text-sm flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {comment.date}
              </span>
            </div>
            
            <p className="text-muted-foreground leading-relaxed mb-4">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ThumbsUp className="w-4 h-4" />
                {comment.likes}
              </button>
              <button 
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                onClick={() => setShowReplyForm(!showReplyForm)}
              >
                <Reply className="w-4 h-4" />
                Reply
              </button>
            </div>

            {showReplyForm && (
              <div className="mt-4 space-y-3">
                <Textarea 
                  placeholder="Write your reply..."
                  className="min-h-[80px]"
                />
                <div className="flex gap-2">
                  <Button size="sm">Post Reply</Button>
                  <Button size="sm" variant="outline" onClick={() => setShowReplyForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replies.length > 0 && (
        <div className="mt-4 space-y-4">
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} isReply />
          ))}
        </div>
      )}
    </div>
  );
};

interface CommentSectionProps {
  commentCount?: number;
}

const CommentSection = ({ commentCount = 4 }: CommentSectionProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  return (
    <section className="py-12 lg:py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">
              Comments ({commentCount})
            </h2>
          </div>

          {/* Add Comment Form */}
          <div className="bg-card rounded-2xl p-6 lg:p-8 border border-border mb-8">
            <h3 className="text-lg font-semibold text-foreground mb-6">Leave a Comment</h3>
            
            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div>
                <Input 
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <Input 
                  type="email"
                  placeholder="Your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            
            <Textarea 
              placeholder="Write your comment..."
              className="min-h-[120px] mb-4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
            
            <Button variant="default">
              Post Comment
            </Button>
          </div>

          {/* Comments List */}
          <div className="space-y-6">
            {initialComments.map((comment) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline">
              Load More Comments
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommentSection;
