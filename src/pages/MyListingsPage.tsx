import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Plus, 
  Edit,
  Copy,
  Trash2,
  Eye,
  Users,
  Calendar,
  MapPin,
  DollarSign,
  MoreVertical,
  Briefcase
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

const MyListingsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const myJobs = [
    {
      id: 1,
      title: "Senior Real Estate Agent",
      location: "New York, NY",
      type: "Full-time",
      salary: "$80,000 - $120,000",
      posted: "2 days ago",
      status: "Active",
      views: 156,
      applicants: 12,
      applications: [
        { name: "Sarah Johnson", applied: "1 day ago", status: "Under Review" },
        { name: "Mike Chen", applied: "2 days ago", status: "Interview Scheduled" }
      ]
    },
    {
      id: 2,
      title: "Property Manager",
      location: "Los Angeles, CA", 
      type: "Full-time",
      salary: "$65,000 - $85,000",
      posted: "5 days ago",
      status: "Active",
      views: 89,
      applicants: 7,
      applications: []
    },
    {
      id: 3,
      title: "Real Estate Assistant",
      location: "Miami, FL",
      type: "Part-time", 
      salary: "$35,000 - $45,000",
      posted: "1 week ago",
      status: "Filled",
      views: 203,
      applicants: 18,
      applications: []
    },
    {
      id: 4,
      title: "Marketing Specialist",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$55,000 - $70,000", 
      posted: "2 weeks ago",
      status: "Draft",
      views: 0,
      applicants: 0,
      applications: []
    },
    {
      id: 5,
      title: "Commercial Broker",
      location: "Chicago, IL",
      type: "Full-time",
      salary: "$100,000 - $150,000",
      posted: "3 weeks ago", 
      status: "Paused",
      views: 67,
      applicants: 4,
      applications: []
    }
  ];

  const filteredJobs = myJobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.location.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (statusFilter === "" || job.status === statusFilter);
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-success/10 text-success">Active</Badge>;
      case "Filled":
        return <Badge variant="secondary">Filled</Badge>;
      case "Draft":
        return <Badge variant="outline">Draft</Badge>;
      case "Paused":
        return <Badge className="bg-warning/10 text-warning">Paused</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Job Listings</h1>
          <p className="text-muted-foreground mt-2">
            Manage and track your posted positions
          </p>
        </div>
        <Button asChild className="bg-gradient-primary">
          <Link to="/post-job" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Listings</p>
                <p className="text-2xl font-bold">{myJobs.length}</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Jobs</p>
                <p className="text-2xl font-bold">{myJobs.filter(j => j.status === "Active").length}</p>
              </div>
              <div className="h-8 w-8 bg-success/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Views</p>
                <p className="text-2xl font-bold">{myJobs.reduce((sum, job) => sum + job.views, 0)}</p>
              </div>
              <div className="h-8 w-8 bg-brand-blue/10 rounded-lg flex items-center justify-center">
                <Eye className="h-4 w-4 text-brand-blue" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">{myJobs.reduce((sum, job) => sum + job.applicants, 0)}</p>
              </div>
              <div className="h-8 w-8 bg-warning/10 rounded-lg flex items-center justify-center">
                <Users className="h-4 w-4 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search your listings..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
                <SelectItem value="Filled">Filled</SelectItem>
                <SelectItem value="Paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-hover transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Posted {job.posted}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" />
                          {job.salary}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(job.status)}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Copy className="h-4 w-4 mr-2" />
                            Duplicate
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Eye className="h-4 w-4 mr-2" />
                            View Public Page
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge variant="outline">{job.type}</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <Eye className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>{job.views}</strong> views
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        <strong>{job.applicants}</strong> applicants
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        View Applications
                      </Button>
                      {job.status === "Active" && (
                        <Button size="sm">
                          Manage
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredJobs.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground">
              <Briefcase className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-medium mb-2">No job listings found</h3>
              <p className="mb-4">
                {searchTerm || statusFilter 
                  ? "Try adjusting your search or filters" 
                  : "Get started by posting your first job listing"
                }
              </p>
              {!searchTerm && !statusFilter && (
                <Button asChild className="bg-gradient-primary">
                  <Link to="/post-job">
                    <Plus className="h-4 w-4 mr-2" />
                    Post Your First Job
                  </Link>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MyListingsPage;