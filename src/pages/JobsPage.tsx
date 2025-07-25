import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  DollarSign,
  Building2,
  Bookmark,
  Eye,
  Users
} from "lucide-react";

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [jobTypeFilter, setJobTypeFilter] = useState("");
  const [experienceFilter, setExperienceFilter] = useState("");

  const jobs = [
    {
      id: 1,
      title: "Senior Real Estate Agent",
      company: "Prime Properties LLC",
      location: "New York, NY",
      type: "Full-time",
      experience: "5+ years",
      salary: "$80,000 - $120,000",
      posted: "2 days ago",
      description: "We're looking for an experienced real estate agent to join our growing team in Manhattan...",
      applicants: 12,
      views: 156,
      remote: false,
      logo: "🏢"
    },
    {
      id: 2,
      title: "Property Manager",
      company: "Metro Realty Group", 
      location: "Los Angeles, CA",
      type: "Full-time",
      experience: "3+ years",
      salary: "$65,000 - $85,000",
      posted: "3 days ago",
      description: "Seeking a detail-oriented property manager to oversee our portfolio of residential properties...",
      applicants: 8,
      views: 203,
      remote: false,
      logo: "🏘️"
    },
    {
      id: 3,
      title: "Real Estate Marketing Specialist",
      company: "Digital Homes Co",
      location: "Austin, TX",
      type: "Full-time",
      experience: "2+ years",
      salary: "$55,000 - $70,000",
      posted: "1 week ago",
      description: "Join our innovative team to create compelling marketing campaigns for luxury properties...",
      applicants: 15,
      views: 289,
      remote: true,
      logo: "📱"
    },
    {
      id: 4,
      title: "Real Estate Assistant",
      company: "Coastal Homes",
      location: "Miami, FL",
      type: "Part-time",
      experience: "Entry level",
      salary: "$35,000 - $45,000",
      posted: "1 week ago",
      description: "Support our busy real estate team with administrative tasks and client communication...",
      applicants: 22,
      views: 167,
      remote: false,
      logo: "🌊"
    },
    {
      id: 5,
      title: "Commercial Real Estate Broker",
      company: "Enterprise Realty",
      location: "Chicago, IL", 
      type: "Full-time",
      experience: "7+ years",
      salary: "$100,000 - $150,000",
      posted: "2 weeks ago",
      description: "Lead commercial real estate transactions for high-value properties in the Chicago market...",
      applicants: 6,
      views: 134,
      remote: false,
      logo: "🏙️"
    }
  ];

  const filteredJobs = jobs.filter(job => {
    return (
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase())
    ) &&
    (locationFilter === "" || job.location.includes(locationFilter)) &&
    (jobTypeFilter === "" || job.type === jobTypeFilter) &&
    (experienceFilter === "" || job.experience.includes(experienceFilter))
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Browse Job Listings</h1>
        <p className="text-muted-foreground mt-2">
          Discover opportunities posted by other real estate professionals
        </p>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Search & Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search jobs or companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Locations</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Los Angeles">Los Angeles</SelectItem>
                <SelectItem value="Chicago">Chicago</SelectItem>
                <SelectItem value="Miami">Miami</SelectItem>
                <SelectItem value="Austin">Austin</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={jobTypeFilter} onValueChange={setJobTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Job Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Types</SelectItem>
                <SelectItem value="Full-time">Full-time</SelectItem>
                <SelectItem value="Part-time">Part-time</SelectItem>
                <SelectItem value="Contract">Contract</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Levels</SelectItem>
                <SelectItem value="Entry">Entry Level</SelectItem>
                <SelectItem value="2+">2+ Years</SelectItem>
                <SelectItem value="5+">5+ Years</SelectItem>
                <SelectItem value="7+">7+ Years</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
        </p>
        <Select defaultValue="newest">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
            <SelectItem value="salary-high">Salary: High to Low</SelectItem>
            <SelectItem value="salary-low">Salary: Low to High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Job Listings */}
      <div className="space-y-4">
        {filteredJobs.map((job) => (
          <Card key={job.id} className="hover:shadow-hover transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="text-3xl">{job.logo}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold hover:text-primary transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Building2 className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{job.company}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        <Bookmark className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {job.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="h-4 w-4" />
                        {job.salary}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mb-3">
                      <Badge variant="secondary">{job.type}</Badge>
                      <Badge variant="outline">{job.experience}</Badge>
                      {job.remote && <Badge className="bg-success/10 text-success">Remote</Badge>}
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {job.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {job.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="h-4 w-4" />
                          {job.applicants} applicants
                        </span>
                      </div>
                      <Button>View Details</Button>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default JobsPage;