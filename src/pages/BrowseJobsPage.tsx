import { useState } from "react";
import { Search, MapPin, Clock, Bookmark, CheckCircle, Filter, Heart, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

// Mock data for job listings from other brokerages
const mockJobs = [
  {
    id: 1,
    title: "Senior Real Estate Agent",
    company: "Premier Realty Group",
    location: "New York, NY",
    type: "Full-time",
    workStyle: "On-site",
    salary: "$80,000 - $120,000",
    description: "Experienced agent needed for luxury residential properties in Manhattan. Must have strong negotiation skills and established client base.",
    postedDate: "2 days ago",
    views: 245,
    applicants: 12,
    tags: ["Residential", "Luxury", "Manhattan"],
    isBookmarked: false,
    isFilled: false
  },
  {
    id: 2,
    title: "Commercial Property Specialist",
    company: "Metro Commercial Brokers",
    location: "Los Angeles, CA",
    type: "Full-time",
    workStyle: "Hybrid",
    salary: "$90,000 - $150,000",
    description: "Join our commercial division to handle office buildings and retail spaces. Perfect for agents looking to transition to commercial real estate.",
    postedDate: "5 days ago",
    views: 189,
    applicants: 8,
    tags: ["Commercial", "Office Buildings", "Retail"],
    isBookmarked: true,
    isFilled: false
  },
  {
    id: 3,
    title: "New Agent Training Program",
    company: "Sunshine Realty",
    location: "Miami, FL",
    type: "Full-time",
    workStyle: "On-site",
    salary: "$45,000 + Commission",
    description: "Perfect for new agents! Comprehensive training program with mentorship and guaranteed salary for first 6 months.",
    postedDate: "1 week ago",
    views: 432,
    applicants: 25,
    tags: ["Entry Level", "Training", "Mentorship"],
    isBookmarked: false,
    isFilled: false
  },
  {
    id: 4,
    title: "Property Manager",
    company: "Elite Property Management",
    location: "Chicago, IL",
    type: "Full-time",
    workStyle: "Remote",
    salary: "$65,000 - $85,000",
    description: "Manage a portfolio of residential properties. Handle tenant relations, maintenance coordination, and financial reporting.",
    postedDate: "3 days ago",
    views: 156,
    applicants: 7,
    tags: ["Property Management", "Residential", "Remote"],
    isBookmarked: false,
    isFilled: true
  },
  {
    id: 5,
    title: "Real Estate Marketing Coordinator",
    company: "Coastal Realty Partners",
    location: "San Diego, CA",
    type: "Part-time",
    workStyle: "Hybrid",
    salary: "$35,000 - $45,000",
    description: "Create marketing materials, manage social media presence, and coordinate listing photography for our team of agents.",
    postedDate: "4 days ago",
    views: 298,
    applicants: 15,
    tags: ["Marketing", "Social Media", "Photography"],
    isBookmarked: true,
    isFilled: false
  },
  {
    id: 6,
    title: "Leasing Consultant",
    company: "Urban Living Apartments",
    location: "Austin, TX",
    type: "Full-time",
    workStyle: "On-site",
    salary: "$40,000 - $55,000",
    description: "Show apartments, process applications, and provide excellent customer service to prospective tenants in our luxury apartment complex.",
    postedDate: "6 days ago",
    views: 201,
    applicants: 19,
    tags: ["Leasing", "Apartments", "Customer Service"],
    isBookmarked: false,
    isFilled: false
  }
];

export default function BrowseJobsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState("");
  const [workStyle, setWorkStyle] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [bookmarkedJobs, setBookmarkedJobs] = useState(new Set([2, 5]));
  const [filledJobs, setFilledJobs] = useState(new Set([4]));
  const { toast } = useToast();

  const filteredJobs = mockJobs.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
    const matchesJobType = !jobType || job.type === jobType;
    const matchesWorkStyle = !workStyle || job.workStyle === workStyle;
    
    return matchesSearch && matchesLocation && matchesJobType && matchesWorkStyle;
  });

  const sortedJobs = [...filteredJobs].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return 0; // Already sorted by newest
      case "salary":
        return 0; // Could implement salary parsing
      case "applicants":
        return b.applicants - a.applicants;
      default:
        return 0;
    }
  });

  const toggleBookmark = (jobId: number) => {
    const newBookmarkedJobs = new Set(bookmarkedJobs);
    if (bookmarkedJobs.has(jobId)) {
      newBookmarkedJobs.delete(jobId);
      toast({
        title: "Bookmark removed",
        description: "Job removed from your bookmarks",
      });
    } else {
      newBookmarkedJobs.add(jobId);
      toast({
        title: "Job bookmarked",
        description: "Job added to your bookmarks",
      });
    }
    setBookmarkedJobs(newBookmarkedJobs);
  };

  const markAsFilled = (jobId: number) => {
    const newFilledJobs = new Set(filledJobs);
    if (filledJobs.has(jobId)) {
      newFilledJobs.delete(jobId);
      toast({
        title: "Position reopened",
        description: "Job marked as available again",
      });
    } else {
      newFilledJobs.add(jobId);
      toast({
        title: "Position filled",
        description: "Job marked as filled",
      });
    }
    setFilledJobs(newFilledJobs);
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Browse Job Listings</h1>
        <p className="text-muted-foreground">
          Discover opportunities posted by other brokerages and real estate companies
        </p>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={jobType} onValueChange={setJobType}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
              </SelectContent>
            </Select>

            <Select value={workStyle} onValueChange={setWorkStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Work Style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Styles</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setLocation("");
                setJobType("");
                setWorkStyle("");
              }}
              className="w-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Count and Sort */}
      <div className="flex justify-between items-center">
        <p className="text-muted-foreground">
          {sortedJobs.length} job{sortedJobs.length !== 1 ? 's' : ''} found
        </p>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="applicants">Most Applicants</SelectItem>
            <SelectItem value="salary">Salary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="grid gap-6">
        {sortedJobs.map((job) => (
          <Card key={job.id} className={`transition-all duration-200 hover:shadow-md ${filledJobs.has(job.id) ? 'opacity-60' : ''}`}>
            <CardHeader className="pb-4">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold">{job.title}</h3>
                    {filledJobs.has(job.id) && (
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        Filled
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Building2 className="h-4 w-4" />
                      {job.company}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {job.postedDate}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleBookmark(job.id)}
                    className={bookmarkedJobs.has(job.id) ? "text-primary" : "text-muted-foreground"}
                  >
                    <Heart className={`h-4 w-4 ${bookmarkedJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => markAsFilled(job.id)}
                    className={filledJobs.has(job.id) ? "text-success" : "text-muted-foreground"}
                  >
                    <CheckCircle className={`h-4 w-4 ${filledJobs.has(job.id) ? 'fill-current' : ''}`} />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge variant="outline">{job.type}</Badge>
                  <Badge variant="outline">{job.workStyle}</Badge>
                  <span className="font-semibold text-primary">{job.salary}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground">{job.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{job.views} views</span>
                  <span>{job.applicants} applicants</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm" disabled={filledJobs.has(job.id)}>
                    {filledJobs.has(job.id) ? 'Position Filled' : 'Apply Now'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedJobs.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
          <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
        </div>
      )}
    </div>
  );
}