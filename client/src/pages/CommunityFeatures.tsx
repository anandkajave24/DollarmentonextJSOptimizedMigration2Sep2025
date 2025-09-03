import { TabPills, TabItem } from "../components/ui/tab-pills";
import { useState } from "react";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { SEO } from '../components/SEO';
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { useToast } from "../hooks/use-toast";

type Post = {
  id: number;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  title: string;
  content: string;
  category: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
  isLiked: boolean;
  isBookmarked: boolean;
};

type Discussion = {
  id: number;
  author: {
    name: string;
    avatar: string;
    reputation: number;
  };
  title: string;
  preview: string;
  category: string;
  activity: string;
  replies: number;
  views: number;
  isFollowing: boolean;
};

type TrendingTopic = {
  id: number;
  topic: string;
  mentions: number;
  trend: "up" | "down" | "stable";
};

export default function CommunityFeatures() {
  return (
    <>
      <SEO 
        title="Community Features - Financial Discussions & Expert Q&A"
        description="Join financial discussions, ask questions, and connect with financial experts and community members. Share your financial journey and learn from others' experiences."
        keywords="financial community features, financial discussions, expert Q&A, financial forum, money conversations, investment discussions, financial advice community"
        canonical="https://dollarmento.com/community-features"
      />
      <CommunityFeaturesContent />
    </>
  );
}

function CommunityFeaturesContent() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("feed");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [posts, setPosts] = useState<Post[]>(samplePosts);
  const [discussions, setDiscussions] = useState<Discussion[]>(sampleDiscussions);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredDiscussions = discussions.filter(discussion => 
    discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    discussion.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        const isLiked = !post.isLiked;
        return {
          ...post,
          isLiked,
          likes: isLiked ? post.likes + 1 : post.likes - 1
        };
      }
      return post;
    }));
  };

  const handleToggleBookmark = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
    
    toast({
      title: "Post Bookmarked",
      description: "You can find this post in your bookmarks."
    });
  };

  const handleToggleFollow = (discussionId: number) => {
    setDiscussions(discussions.map(discussion => {
      if (discussion.id === discussionId) {
        return {
          ...discussion,
          isFollowing: !discussion.isFollowing
        };
      }
      return discussion;
    }));
    
    toast({
      title: "Discussion Followed",
      description: "You'll receive notifications for new replies."
    });
  };

  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast({
        title: "Incomplete Post",
        description: "Please provide both a title and content for your post.",
        variant: "destructive"
      });
      return;
    }
    
    const newPost: Post = {
      id: Math.max(0, ...posts.map(p => p.id)) + 1,
      author: {
        name: "You",
        avatar: "/avatars/user.png",
        reputation: 152
      },
      title: newPostTitle,
      content: newPostContent,
      category: "General",
      tags: ["Question", "Finance"],
      likes: 0,
      comments: 0,
      createdAt: new Date().toISOString(),
      isLiked: false,
      isBookmarked: false
    };
    
    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    
    toast({
      title: "Post Created",
      description: "Your post has been published to the community."
    });
  };

  return (
    <div className="px-4 py-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => window.history.back()}
          className="mr-2 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100"
        >
          <span className="material-icons text-sm">arrow_back</span>
        </button>
        <h1 className="text-2xl font-bold">Community</h1>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
            <span className="material-icons text-base">search</span>
          </span>
          <Input 
            placeholder="Search discussions, posts, or tags..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      
      {/* Tabs */}
      <Tabs defaultValue="feed" className="mb-6" onValueChange={setActiveTab}>
        <TabsList className="flex justify-start overflow-x-auto space-x-2 bg-transparent p-0 border-0 w-full">
          <TabsTrigger value="feed" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Feed</TabsTrigger>
          <TabsTrigger value="discussions" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Discussions</TabsTrigger>
          <TabsTrigger value="create" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Create Post</TabsTrigger>
          <TabsTrigger value="trending" className="rounded-full px-6 py-2 text-sm font-medium bg-white border border-gray-200 shadow-sm data-[state=active]:bg-blue-500 data-[state=active]:text-white data-[state=active]:border-blue-500">Trending</TabsTrigger>
        </TabsList>
        
        {/* Feed Tab */}
        <TabsContent value="feed" className="space-y-4">
          {filteredPosts.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <span className="material-icons text-gray-400 text-4xl mb-2">sentiment_dissatisfied</span>
                <h3 className="font-medium mb-1">No posts found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or check back later</p>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map(post => (
              <Card key={post.id}>
                <CardHeader className="pb-2 bg-gray-200 dark:bg-gray-800 border-b">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={post.author.avatar} />
                        <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center">
                          <span className="font-medium text-sm">{post.author.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {post.author.reputation}
                          </Badge>
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(post.createdAt).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                  </div>
                  <CardTitle className="text-lg mt-3">{post.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 mb-3">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {post.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-3 flex justify-between">
                  <div className="flex items-center space-x-4">
                    <button
                      className="flex items-center text-xs text-gray-600 hover:text-primary transition-colors"
                      onClick={() => handleToggleLike(post.id)}
                    >
                      <span className={`material-icons text-base mr-1 ${post.isLiked ? "text-primary" : ""}`}>
                        {post.isLiked ? "favorite" : "favorite_border"}
                      </span>
                      {post.likes}
                    </button>
                    <button className="flex items-center text-xs text-gray-600 hover:text-primary transition-colors">
                      <span className="material-icons text-base mr-1">chat_bubble_outline</span>
                      {post.comments}
                    </button>
                  </div>
                  <div>
                    <button
                      className="flex items-center text-xs text-gray-600 hover:text-primary transition-colors"
                      onClick={() => handleToggleBookmark(post.id)}
                    >
                      <span className={`material-icons text-base ${post.isBookmarked ? "text-primary" : ""}`}>
                        {post.isBookmarked ? "bookmark" : "bookmark_border"}
                      </span>
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ))
          )}
        </TabsContent>
        
        {/* Discussions Tab */}
        <TabsContent value="discussions" className="space-y-4">
          {filteredDiscussions.length === 0 ? (
            <Card>
              <CardContent className="pt-6 text-center">
                <span className="material-icons text-gray-400 text-4xl mb-2">forum</span>
                <h3 className="font-medium mb-1">No discussions found</h3>
                <p className="text-sm text-gray-500 mb-4">Try adjusting your search or start a new discussion</p>
                <Button 
                  onClick={() => setActiveTab("create")}
                  className="flex items-center mx-auto"
                >
                  <span className="material-icons text-sm mr-1">add</span>
                  Start Discussion
                </Button>
              </CardContent>
            </Card>
          ) : (
            filteredDiscussions.map(discussion => (
              <Card key={discussion.id} className="overflow-hidden">
                <div className="flex border-b">
                  <div className="p-4 flex-grow">
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center">
                        <Avatar className="h-6 w-6 mr-2">
                          <AvatarImage src={discussion.author.avatar} />
                          <AvatarFallback>{discussion.author.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium">{discussion.author.name}</span>
                        <span className="text-xs text-gray-500 ml-3">{discussion.activity}</span>
                      </div>
                      <Badge variant="secondary" className="text-xs">{discussion.category}</Badge>
                    </div>
                    <h3 className="font-medium mb-1">{discussion.title}</h3>
                    <p className="text-sm text-gray-600 mb-2 line-clamp-2">{discussion.preview}</p>
                    <div className="flex items-center text-xs text-gray-500">
                      <div className="flex items-center mr-4">
                        <span className="material-icons text-xs mr-1">forum</span>
                        {discussion.replies} replies
                      </div>
                      <div className="flex items-center">
                        <span className="material-icons text-xs mr-1">visibility</span>
                        {discussion.views} views
                      </div>
                    </div>
                  </div>
                  <div className="w-20 bg-gray-50 flex flex-col items-center justify-center border-l">
                    <button
                      className={`rounded-full w-8 h-8 flex items-center justify-center mb-1 ${
                        discussion.isFollowing 
                          ? "bg-primary/10 text-primary" 
                          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                      }`}
                      onClick={() => handleToggleFollow(discussion.id)}
                    >
                      <span className="material-icons text-sm">
                        {discussion.isFollowing ? "notifications_active" : "notifications_none"}
                      </span>
                    </button>
                    <span className="text-xs text-gray-500">
                      {discussion.isFollowing ? "Following" : "Follow"}
                    </span>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
        
        {/* Create Post Tab */}
        <TabsContent value="create">
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-black dark:text-white">Create a Post</CardTitle>
              <CardDescription>
                Share your financial questions, insights, or experiences with the community
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="post-title" className="text-sm font-medium">Title</label>
                <Input
                  id="post-title"
                  placeholder="Enter a descriptive title"
                  value={newPostTitle}
                  onChange={(e) => setNewPostTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="post-content" className="text-sm font-medium">Content</label>
                <Textarea
                  id="post-content"
                  placeholder="Share your thoughts, questions, or insights..."
                  className="min-h-[150px]"
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between border-t pt-4">
              <Button variant="outline" onClick={() => setActiveTab("feed")}>
                Cancel
              </Button>
              <Button onClick={handleCreatePost}>
                <span className="material-icons text-sm mr-1">send</span>
                Post to Community
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* Trending Tab */}
        <TabsContent value="trending">
          <Card className="mb-6">
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-lg text-black dark:text-white">Trending Topics</CardTitle>
              <CardDescription>
                Financial topics being discussed across the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {trendingTopics.map(topic => (
                  <div key={topic.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <h3 className="font-medium">#{topic.topic}</h3>
                      <p className="text-xs text-gray-500">{topic.mentions} mentions today</p>
                    </div>
                    <div>
                      <span className={`material-icons ${
                        topic.trend === "up" 
                          ? "text-green-500" 
                          : topic.trend === "down" 
                            ? "text-red-500" 
                            : "text-gray-500"
                      }`}>
                        {topic.trend === "up" 
                          ? "trending_up" 
                          : topic.trend === "down" 
                            ? "trending_down" 
                            : "trending_flat"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="bg-gray-200 dark:bg-gray-800 border-b">
              <CardTitle className="text-lg text-black dark:text-white">Community Stats</CardTitle>
              <CardDescription>
                Current activity in the DollarMento community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="border rounded-lg p-4">
                  <span className="material-icons text-primary text-2xl mb-1">people</span>
                  <p className="text-2xl font-bold">12,543</p>
                  <p className="text-sm text-gray-500">Active Members</p>
                </div>
                <div className="border rounded-lg p-4">
                  <span className="material-icons text-primary text-2xl mb-1">forum</span>
                  <p className="text-2xl font-bold">426</p>
                  <p className="text-sm text-gray-500">Discussions Today</p>
                </div>
                <div className="border rounded-lg p-4">
                  <span className="material-icons text-primary text-2xl mb-1">chat</span>
                  <p className="text-2xl font-bold">1,892</p>
                  <p className="text-sm text-gray-500">Posts This Week</p>
                </div>
                <div className="border rounded-lg p-4">
                  <span className="material-icons text-primary text-2xl mb-1">local_fire_department</span>
                  <p className="text-2xl font-bold">243</p>
                  <p className="text-sm text-gray-500">Active Discussions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Sample data
const samplePosts: Post[] = [
  {
    id: 1,
    author: {
      name: "Rajesh Kumar",
      avatar: "/avatars/user-1.png",
      reputation: 548
    },
    title: "Best tax-saving investments for current FY?",
    content: "With the new tax regime changes, I'm looking to optimize my tax savings while building long-term wealth. Which instruments should I prioritize for maximum efficiency? Looking for investments beyond the usual ELSS funds.",
    category: "Tax Planning",
    tags: ["Tax Saving", "Investments", "FY25-26", "ELSS"],
    likes: 42,
    comments: 18,
    createdAt: "2025-04-11T08:30:00Z",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: 2,
    author: {
      name: "Priya Sharma",
      avatar: "/avatars/user-2.png",
      reputation: 623
    },
    title: "My journey to financial independence at 35",
    content: "I started investing just $5,000 per month at 25 and gradually increased my contributions. By focusing on index funds, selected small-caps, and maintaining an emergency fund, I've reached my financial independence goal at 35. Happy to share my detailed strategy if anyone's interested.",
    category: "Success Story",
    tags: ["Financial Independence", "FIRE", "Index Funds", "Early Retirement"],
    likes: 156,
    comments: 37,
    createdAt: "2025-04-10T15:45:00Z",
    isLiked: true,
    isBookmarked: true
  },
  {
    id: 3,
    author: {
      name: "Vikram Singh",
      avatar: "/avatars/user-3.png",
      reputation: 412
    },
    title: "Warning: New UPI scam targeting first-time investors",
    content: "There's a new scam where fraudsters are sending fake UPI collection requests that look like they're from legitimate brokers. They're targeting new investors who've just opened demat accounts. Always verify the VPA address and never approve collection requests you didn't initiate.",
    category: "Scam Alert",
    tags: ["UPI", "Scam", "Security", "Demat"],
    likes: 89,
    comments: 24,
    createdAt: "2025-04-09T11:20:00Z",
    isLiked: false,
    isBookmarked: false
  },
];

const sampleDiscussions: Discussion[] = [
  {
    id: 1,
    author: {
      name: "Ananya Patel",
      avatar: "/avatars/user-4.png",
      reputation: 387
    },
    title: "Will RBI further increase interest rates in the next policy review?",
    preview: "With inflation still above the comfort zone and global rates remaining high, do you think RBI will further tighten monetary policy? How should we position our debt investments?",
    category: "Economy",
    activity: "Active 15m ago",
    replies: 32,
    views: 218,
    isFollowing: false
  },
  {
    id: 2,
    author: {
      name: "Mohan Desai",
      avatar: "/avatars/user-5.png",
      reputation: 519
    },
    title: "Critique my portfolio - 32yo software engineer with moderate risk appetite",
    preview: "I've been investing for 8 years now. Current allocation: 60% Indian equities (40% large-cap, 20% mid/small), 15% US equities, 15% debt, 5% gold, 5% REITs. Monthly investment of $50,000. Goals include retirement at 50 and children's education.",
    category: "Portfolio Review",
    activity: "Active 2h ago",
    replies: 47,
    views: 321,
    isFollowing: true
  },
  {
    id: 3,
    author: {
      name: "Shreya Gupta",
      avatar: "/avatars/user-6.png",
      reputation: 276
    },
    title: "Housing market in Bangalore - Buy now or wait?",
    preview: "With the recent correction in Bangalore's real estate prices and home loan rates stabilizing, is this a good time to buy? Or should we expect further price corrections? Particularly looking at areas around Whitefield and Electronic City.",
    category: "Real Estate",
    activity: "Active 4h ago",
    replies: 25,
    views: 183,
    isFollowing: false
  },
];

const trendingTopics: TrendingTopic[] = [
  {
    id: 1,
    topic: "SmallCaps",
    mentions: 1245,
    trend: "up"
  },
  {
    id: 2,
    topic: "SEBI_Regulations",
    mentions: 863,
    trend: "up"
  },
  {
    id: 3,
    topic: "IPO_Season",
    mentions: 721,
    trend: "up"
  },
  {
    id: 4,
    topic: "DigitalRupee",
    mentions: 548,
    trend: "stable"
  },
  {
    id: 5,
    topic: "GoldETF",
    mentions: 492,
    trend: "down"
  },
  {
    id: 6,
    topic: "MutualFundinvestments",
    mentions: 423,
    trend: "up"
  },
];