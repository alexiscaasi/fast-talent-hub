import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, 
  PlusCircle, 
  TrendingUp, 
  Users, 
  Eye,
  Calendar,
  MapPin,
  ArrowRight,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { title: "Active Listings", value: "12", icon: Briefcase, change: "+2 this week" },
    { title: "Total Views", value: "1,247", icon: Eye, change: "+15% this month" },
    { title: "Applications", value: "89", icon: Users, change: "+23 this week" },
    { title: "Response Rate", value: "67%", icon: TrendingUp, change: "+5% vs last month" },
  ];

  const recentJobs = [
    {
      id: 1,
      title: "Senior Real Estate Agent",
      company: "Prime Properties LLC",
      location: "New York, NY",
      type: "Full-time",
      posted: "2 days ago",
      views: 156,
      applicants: 12,
      status: "Active"
    },
    {
      id: 2,
      title: "Property Manager", 
      company: "Metro Realty Group",
      location: "Los Angeles, CA",
      type: "Full-time",
      posted: "5 days ago", 
      views: 89,
      applicants: 7,
      status: "Active"
    },
    {
      id: 3,
      title: "Real Estate Assistant",
      company: "Coastal Homes",
      location: "Miami, FL",
      type: "Part-time",
      posted: "1 week ago",
      views: 203,
      applicants: 18,
      status: "Filled"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-primary rounded-xl p-8 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome back, Premium Realty!</h1>
            <p className="text-blue-100 text-lg">
              Manage your job listings and find the perfect candidates for your team.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="secondary">
              <Link to="/jobs" className="flex items-center gap-2">
                <Briefcase className="h-4 w-4" />
                Browse Jobs
              </Link>
            </Button>
            <Button asChild className="bg-white text-primary hover:bg-gray-100">
              <Link to="/post-job" className="flex items-center gap-2">
                <PlusCircle className="h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-hover transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-success mt-1">
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Recent Listings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Your Recent Listings</CardTitle>
                <CardDescription>Manage and track your job posts</CardDescription>
              </div>
              <Button asChild variant="outline" size="sm">
                <Link to="/my-listings" className="flex items-center gap-2">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentJobs.slice(0, 3).map((job) => (
              <div key={job.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                <div className="flex-1">
                  <h4 className="font-medium">{job.title}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {job.posted}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={job.status === "Active" ? "default" : "secondary"}>
                    {job.status}
                  </Badge>
                  <div className="text-right text-sm">
                    <div className="font-medium">{job.applicants} apps</div>
                    <div className="text-muted-foreground">{job.views} views</div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with common tasks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button asChild className="w-full justify-start h-auto p-4" variant="outline">
              <Link to="/post-job" className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <PlusCircle className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Post a New Job</div>
                  <div className="text-sm text-muted-foreground">Create a job listing to find candidates</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild className="w-full justify-start h-auto p-4" variant="outline">
              <Link to="/jobs" className="flex items-center gap-3">
                <div className="bg-success/10 p-2 rounded-lg">
                  <Briefcase className="h-5 w-5 text-success" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Browse Job Market</div>
                  <div className="text-sm text-muted-foreground">See what others are posting</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild className="w-full justify-start h-auto p-4" variant="outline">
              <Link to="/profile" className="flex items-center gap-3">
                <div className="bg-warning/10 p-2 rounded-lg">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-medium">Update Company Profile</div>
                  <div className="text-sm text-muted-foreground">Keep your information current</div>
                </div>
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;