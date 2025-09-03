import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SEO } from '../components/SEO';

import { Search, Heart, MessageCircle, Share2, Bookmark, TrendingUp, Clock, Users, Send } from 'lucide-react';

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timeAgo: string;
}

interface Post {
  id: string;
  author: string;
  avatar: string;
  timeAgo: string;
  title: string;
  content: string;
  tags: string[];
  likes: number;
  comments: Comment[];
  category: string;
  isLiked?: boolean;
}

const samplePosts: Post[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    avatar: 'SJ',
    timeAgo: '2 hours ago',
    title: 'Finally paid off my credit card debt!',
    content: 'After 18 months of disciplined budgeting and using the debt avalanche method, I\'m officially credit card debt-free! The key was tracking every expense and cutting out unnecessary subscriptions. DollarMento\'s debt calculator really helped me visualize my progress.',
    tags: ['Debt Freedom', 'Success Story', 'Budgeting'],
    likes: 27,
    comments: [
      {
        id: 'c1',
        author: 'Mike Chen',
        avatar: 'MC',
        content: 'Congratulations! That\'s amazing progress. What was the hardest part of the journey?',
        timeAgo: '1 hour ago'
      },
      {
        id: 'c2',
        author: 'Emma R.',
        avatar: 'ER',
        content: 'Inspiring! I\'m starting my debt payoff journey next month. Any tips for staying motivated?',
        timeAgo: '30 minutes ago'
      }
    ],
    category: 'Success Story',
    isLiked: false
  },
  {
    id: '2',
    author: 'Alex Rivera',
    avatar: 'AR',
    timeAgo: '1 day ago',
    title: 'Emergency fund complete - 6 months saved!',
    content: 'Just reached my goal of saving 6 months of expenses in my emergency fund. Started with $0 and consistently saved $300 monthly for 14 months. The peace of mind is incredible!',
    tags: ['Emergency Fund', 'Savings Goals', 'Financial Security'],
    likes: 42,
    comments: [
      {
        id: 'c3',
        author: 'Jennifer T.',
        avatar: 'JT',
        content: 'That\'s fantastic! Where do you keep your emergency fund? High-yield savings account?',
        timeAgo: '18 hours ago'
      }
    ],
    category: 'Milestone',
    isLiked: true
  }
];

export default function Community() {
  return (
    <>
      <SEO 
        title="Financial Community - Share Experiences & Learn Together"
        description="Join DollarMento's financial community to share success stories, ask questions, and learn from others on their financial journey. Connect with like-minded individuals and get expert advice."
        keywords="financial community, financial forum, money discussions, investment community, debt success stories, budgeting tips, financial advice, personal finance community"
        canonical="https://dollarmento.com/community"
      />
      <CommunityContent />
    </>
  );
}

function CommunityContent() {
  const [activeTab, setActiveTab] = useState('feed');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    tags: '', 
    author: '', 
    category: '' 
  });
  const [newComment, setNewComment] = useState<{[postId: string]: string}>({});
  const [showComments, setShowComments] = useState<{[postId: string]: boolean}>({});

  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleCreatePost = () => {
    if (!newPost.title?.trim() || !newPost.content?.trim() || !newPost.author?.trim() || !newPost.category) {
      return;
    }

    const newPostObj: Post = {
      id: `${Date.now()}`,
      author: newPost.author,
      avatar: newPost.author.charAt(0).toUpperCase(),
      timeAgo: 'just now',
      title: newPost.title,
      content: newPost.content,
      tags: newPost.tags ? newPost.tags.split(',').map(tag => tag.trim()) : [],
      likes: 0,
      comments: [],
      category: newPost.category,
      isLiked: false
    };

    setPosts([newPostObj, ...posts]);
    setNewPost({ title: '', content: '', tags: '', author: '', category: '' });
  };

  const handleLikePost = (postId: string) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    const commentText = newComment[postId];
    if (!commentText || !commentText.trim()) return;

    const newCommentObj: Comment = {
      id: `c${Date.now()}`,
      author: 'You',
      avatar: 'Y',
      content: commentText.trim(),
      timeAgo: 'just now'
    };

    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, newCommentObj]
        };
      }
      return post;
    }));

    setNewComment({...newComment, [postId]: ''});
  };

  const toggleComments = (postId: string) => {
    setShowComments({...showComments, [postId]: !showComments[postId]});
  };

  const PostCard = ({ post }: { post: Post }) => (
    <Card className="mb-6 hover:shadow-md transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center font-semibold text-blue-600">
              {post.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{post.author}</h4>
              <p className="text-sm text-gray-500 flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {post.timeAgo}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            {post.category}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-lg mb-3 text-gray-900">{post.title}</h3>
        <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => handleLikePost(post.id)}
              className={`flex items-center space-x-2 transition-colors ${
                post.isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'
              }`}
            >
              <Heart className={`w-5 h-5 ${post.isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{post.likes}</span>
            </button>
            <button 
              onClick={() => toggleComments(post.id)}
              className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span className="text-sm font-medium">{post.comments.length}</span>
            </button>
            <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors">
              <Share2 className="w-5 h-5" />
              <span className="text-sm font-medium">Share</span>
            </button>
          </div>
          <button className="text-gray-500 hover:text-blue-500 transition-colors">
            <Bookmark className="w-5 h-5" />
          </button>
        </div>

        {/* Comments Section */}
        {showComments[post.id] && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            {/* Existing Comments */}
            <div className="space-y-3 mb-4">
              {post.comments.map((comment) => (
                <div key={comment.id} className="flex space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-600">
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="bg-gray-50 rounded-lg px-3 py-2">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">{comment.author}</span>
                        <span className="text-xs text-gray-500">{comment.timeAgo}</span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Add Comment */}
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                Y
              </div>
              <div className="flex-1 flex space-x-2">
                <Input
                  placeholder="Write a comment..."
                  value={newComment[post.id] || ''}
                  onChange={(e) => setNewComment({...newComment, [post.id]: e.target.value})}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleAddComment(post.id);
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleAddComment(post.id)}
                  disabled={!newComment[post.id]?.trim()}
                  size="sm"
                  className="px-3"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Community</h1>
        <p className="text-gray-600">Share your financial journey and learn from others' experiences</p>
      </div>

      {/* Search and Create Post */}
      <div className="mb-6 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Search discussions, posts, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 py-3"
          />
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-gray-500">
            {posts.length} posts • {posts.length + 2} members
          </div>
        </div>

        {/* Inline Post Creation Box */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-semibold text-blue-600">
                Y
              </div>
              <div className="flex-1 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Input
                    placeholder="Your name..."
                    value={newPost.author || ''}
                    onChange={(e) => setNewPost({...newPost, author: e.target.value})}
                    className="text-sm"
                  />
                  <select
                    value={newPost.category || ''}
                    onChange={(e) => setNewPost({...newPost, category: e.target.value})}
                    className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Select category...</option>
                    <option value="Success Story">Success Story</option>
                    <option value="Milestone">Milestone</option>
                    <option value="Question">Question</option>
                    <option value="Tips & Advice">Tips & Advice</option>
                    <option value="Education">Education</option>
                    <option value="Budgeting">Budgeting</option>
                    <option value="Debt Freedom">Debt Freedom</option>
                    <option value="Savings">Savings</option>
                    <option value="Investment">Investment</option>
                  </select>
                </div>
                
                <Input
                  placeholder="What's your financial milestone or experience?"
                  value={newPost.title}
                  onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                  className="text-sm"
                />
                
                <Textarea
                  placeholder="Share your financial journey, what you learned, or advice you'd share with the community..."
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                  className="min-h-[80px] text-sm resize-none"
                />
                
                <Input
                  placeholder="Add tags (comma-separated, e.g., Debt Freedom, Budgeting, Emergency Fund)"
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                  className="text-sm"
                />
                
                <div className="flex justify-between items-center">
                  <div className="text-xs text-gray-500">
                    💡 Share personal experiences only. No stock tips or selling allowed.
                  </div>
                  <Button 
                    onClick={handleCreatePost} 
                    disabled={!newPost.title?.trim() || !newPost.content?.trim() || !newPost.author?.trim() || !newPost.category}
                    className="bg-blue-600 hover:bg-blue-700 text-sm px-6"
                  >
                    Share with Community
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="feed">Feed</TabsTrigger>
          <TabsTrigger value="discussions">Discussions</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="my-posts">My Posts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="feed" className="space-y-0">
          {filteredPosts.length > 0 ? (
            filteredPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <Card className="text-center py-12">
              <CardContent>
                <div className="text-gray-500">
                  <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-semibold mb-2">No posts found</h3>
                  <p>Try adjusting your search or be the first to share your experience!</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="discussions">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Discussion Forums</h3>
                <p>Organized discussion topics coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="trending">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500">
                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Trending Topics</h3>
                <p>Popular discussions and trending posts coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="my-posts">
          <Card className="text-center py-12">
            <CardContent>
              <div className="text-gray-500">
                <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <h3 className="text-lg font-semibold mb-2">Your Posts</h3>
                <p>Your shared experiences and posts will appear here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}