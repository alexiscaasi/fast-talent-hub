// import { useState } from "react";
// import { Search, MapPin, Clock, Bookmark, CheckCircle, Filter, Heart, Building2 } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { useToast } from "@/hooks/use-toast";

// // Mock data for job listings
// const mockJobs = [
//   {
//     id: 1,
//     title: "Senior Real Estate Agent",
//     company: "Premier Realty Group",
//     location: "New York, NY",
//     type: "Full-time",
//     workStyle: "On-site",
//     salary: "$80,000 - $120,000",
//     description: "Experienced agent needed for luxury residential properties in Manhattan. Must have strong negotiation skills and established client base.",
//     postedDate: "2 days ago",
//     views: 245,
//     applicants: 12,
//     tags: ["Residential", "Luxury", "Manhattan"],
//   },
//   {
//     id: 2,
//     title: "Commercial Property Specialist",
//     company: "Metro Commercial Brokers",
//     location: "Los Angeles, CA",
//     type: "Full-time",
//     workStyle: "Hybrid",
//     salary: "$90,000 - $150,000",
//     description: "Join our commercial division to handle office buildings and retail spaces.",
//     postedDate: "5 days ago",
//     views: 189,
//     applicants: 8,
//     tags: ["Commercial", "Office Buildings", "Retail"],
//   },
//   {
//     id: 3,
//     title: "New Agent Training Program",
//     company: "Sunshine Realty",
//     location: "Miami, FL",
//     type: "Full-time",
//     workStyle: "On-site",
//     salary: "$45,000 + Commission",
//     description: "Perfect for new agents! Comprehensive training with mentorship and base salary.",
//     postedDate: "1 week ago",
//     views: 432,
//     applicants: 25,
//     tags: ["Entry Level", "Training", "Mentorship"],
//   },
// ];

// export default function BrowseJobsPage() {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [location, setLocation] = useState("");
//   const [jobType, setJobType] = useState("all");
//   const [workStyle, setWorkStyle] = useState("all");
//   const [sortBy, setSortBy] = useState("newest");
//   const [bookmarkedJobs, setBookmarkedJobs] = useState<Set<number>>(new Set());
//   const [filledJobs, setFilledJobs] = useState<Set<number>>(new Set());
//   const { toast } = useToast();

//   const filteredJobs = mockJobs.filter(job => {
//     const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//                          job.company.toLowerCase().includes(searchTerm.toLowerCase());
//     const matchesLocation = !location || job.location.toLowerCase().includes(location.toLowerCase());
//     const matchesJobType = jobType === "all" || job.type === jobType;
//     const matchesWorkStyle = workStyle === "all" || job.workStyle === workStyle;
//     return matchesSearch && matchesLocation && matchesJobType && matchesWorkStyle;
//   });

//   const sortedJobs = [...filteredJobs].sort((a, b) => {
//     switch (sortBy) {
//       case "newest":
//         return 0;
//       case "salary":
//         return 0;
//       case "applicants":
//         return b.applicants - a.applicants;
//       default:
//         return 0;
//     }
//   });

//   const toggleBookmark = (id: number) => {
//     const updated = new Set(bookmarkedJobs);
//     if (updated.has(id)) {
//       updated.delete(id);
//       toast({ title: "Bookmark removed" });
//     } else {
//       updated.add(id);
//       toast({ title: "Bookmarked!" });
//     }
//     setBookmarkedJobs(updated);
//   };

//   const markAsFilled = (id: number) => {
//     const updated = new Set(filledJobs);
//     if (updated.has(id)) {
//       updated.delete(id);
//       toast({ title: "Marked as open again" });
//     } else {
//       updated.add(id);
//       toast({ title: "Position filled" });
//     }
//     setFilledJobs(updated);
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-6">
//       <div>
//         <h1 className="text-3xl font-bold">Browse Job Listings</h1>
//         <p className="text-muted-foreground">Find opportunities from real estate companies</p>
//       </div>

//       <Card>
//         <CardContent className="p-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
//             <div className="relative">
//               <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search jobs or companies..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Location"
//                 value={location}
//                 onChange={(e) => setLocation(e.target.value)}
//                 className="pl-10"
//               />
//             </div>

//             <Select value={jobType} onValueChange={setJobType}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Job Type" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Types</SelectItem>
//                 <SelectItem value="Full-time">Full-time</SelectItem>
//                 <SelectItem value="Part-time">Part-time</SelectItem>
//                 <SelectItem value="Contract">Contract</SelectItem>
//               </SelectContent>
//             </Select>

//             <Select value={workStyle} onValueChange={setWorkStyle}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Work Style" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Styles</SelectItem>
//                 <SelectItem value="On-site">On-site</SelectItem>
//                 <SelectItem value="Remote">Remote</SelectItem>
//                 <SelectItem value="Hybrid">Hybrid</SelectItem>
//               </SelectContent>
//             </Select>

//             <Button
//               variant="outline"
//               onClick={() => {
//                 setSearchTerm("");
//                 setLocation("");
//                 setJobType("all");
//                 setWorkStyle("all");
//               }}
//               className="w-full"
//             >
//               <Filter className="h-4 w-4 mr-2" />
//               Clear Filters
//             </Button>
//           </div>
//         </CardContent>
//       </Card>

//       <div className="flex justify-between items-center">
//         <p className="text-muted-foreground">
//           {sortedJobs.length} job{sortedJobs.length !== 1 ? "s" : ""} found
//         </p>
//         <Select value={sortBy} onValueChange={setSortBy}>
//           <SelectTrigger className="w-48">
//             <SelectValue placeholder="Sort by" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="newest">Newest First</SelectItem>
//             <SelectItem value="applicants">Most Applicants</SelectItem>
//             <SelectItem value="salary">Salary</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       <div className="grid gap-6">
//         {sortedJobs.map((job) => (
//           <Card key={job.id} className={`transition hover:shadow-md ${filledJobs.has(job.id) ? "opacity-60" : ""}`}>
//             <CardHeader className="pb-4">
//               <div className="flex justify-between items-start">
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <h3 className="text-xl font-semibold">{job.title}</h3>
//                     {filledJobs.has(job.id) && (
//                       <Badge variant="secondary" className="bg-success/10 text-success">Filled</Badge>
//                     )}
//                   </div>
//                   <div className="flex gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1"><Building2 className="h-4 w-4" />{job.company}</div>
//                     <div className="flex items-center gap-1"><MapPin className="h-4 w-4" />{job.location}</div>
//                     <div className="flex items-center gap-1"><Clock className="h-4 w-4" />{job.postedDate}</div>
//                   </div>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button variant="ghost" size="icon" onClick={() => toggleBookmark(job.id)}>
//                     <Heart className={`h-4 w-4 ${bookmarkedJobs.has(job.id) ? "text-primary fill-current" : "text-muted-foreground"}`} />
//                   </Button>
//                   <Button variant="ghost" size="icon" onClick={() => markAsFilled(job.id)}>
//                     <CheckCircle className={`h-4 w-4 ${filledJobs.has(job.id) ? "text-success fill-current" : "text-muted-foreground"}`} />
//                   </Button>
//                 </div>
//               </div>
//             </CardHeader>
//             <CardContent className="space-y-4">
//               <div className="flex items-center gap-4">
//                 <Badge variant="outline">{job.type}</Badge>
//                 <Badge variant="outline">{job.workStyle}</Badge>
//                 <span className="font-semibold text-primary">{job.salary}</span>
//               </div>
//               <p className="text-muted-foreground">{job.description}</p>
//               <div className="flex flex-wrap gap-2">
//                 {job.tags.map((tag) => (
//                   <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
//                 ))}
//               </div>
//               <div className="flex justify-between items-center border-t pt-4 text-sm text-muted-foreground">
//                 <div className="flex gap-4">
//                   <span>{job.views} views</span>
//                   <span>{job.applicants} applicants</span>
//                 </div>
//                 <div className="flex gap-2">
//                   <Button variant="outline" size="sm">View Details</Button>
//                   <Button size="sm" disabled={filledJobs.has(job.id)}>
//                     {filledJobs.has(job.id) ? "Position Filled" : "Apply Now"}
//                   </Button>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {sortedJobs.length === 0 && (
//         <div className="text-center py-12">
//           <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
//           <p className="text-muted-foreground">Try adjusting your search criteria or filters</p>
//         </div>
//       )}
//     </div>
//   );
// }
