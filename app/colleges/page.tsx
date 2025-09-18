"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  MapPin,
  Users,
  DollarSign,
  GraduationCap,
  Star,
  Brain,
  Sparkles,
  ArrowRight,
  Heart,
  BookOpen,
  TrendingUp,
} from "lucide-react"
import Link from "next/link"
import { Navbar } from "@/components/layout/navbar"

interface College {
  id: string
  name: string
  location: string
  state: string
  type: "public" | "private"
  acceptanceRate: number
  ranking: number
  tuition: number
  enrollment: number
  popularMajors: string[]
  description: string
  logo: string
  aiMatch?: number
  recommendedFor?: string[]
  strengths: string[]
  campusLife: string
  notableAlumni: string[]
}

const colleges: College[] = [
  {
    id: "mit",
    name: "Massachusetts Institute of Technology",
    location: "Cambridge, MA",
    state: "Massachusetts",
    type: "private",
    acceptanceRate: 7,
    ranking: 2,
    tuition: 57986,
    enrollment: 11934,
    popularMajors: ["Computer Science", "Engineering", "Mathematics", "Physics", "Economics"],
    description:
      "World-renowned for technology, engineering, and innovation. Home to cutting-edge research and entrepreneurship.",
    logo: "MIT",
    aiMatch: 95,
    recommendedFor: ["Engineering", "Science", "Technology"],
    strengths: ["Research Excellence", "Innovation Hub", "Industry Connections", "Startup Culture"],
    campusLife: "Intense academic environment with strong collaborative culture and numerous research opportunities.",
    notableAlumni: ["Buzz Aldrin", "Kofi Annan", "Ben Bernanke"],
  },
  {
    id: "stanford",
    name: "Stanford University",
    location: "Stanford, CA",
    state: "California",
    type: "private",
    acceptanceRate: 4,
    ranking: 3,
    tuition: 61731,
    enrollment: 17249,
    popularMajors: ["Computer Science", "Business", "Engineering", "Biology", "Psychology"],
    description: "Leading university in Silicon Valley, known for entrepreneurship, technology, and innovation.",
    logo: "STAN",
    aiMatch: 92,
    recommendedFor: ["Business", "Engineering", "Creative"],
    strengths: ["Silicon Valley Location", "Entrepreneurship", "Venture Capital Access", "Tech Industry"],
    campusLife: "Beautiful campus with strong entrepreneurial spirit and excellent weather year-round.",
    notableAlumni: ["Elon Musk", "Larry Page", "Reed Hastings"],
  },
  {
    id: "harvard",
    name: "Harvard University",
    location: "Cambridge, MA",
    state: "Massachusetts",
    type: "private",
    acceptanceRate: 5,
    ranking: 1,
    tuition: 59076,
    enrollment: 23731,
    popularMajors: ["Economics", "Government", "Psychology", "Biology", "History"],
    description: "Prestigious Ivy League institution known for academic excellence across all disciplines.",
    logo: "HAR",
    aiMatch: 88,
    recommendedFor: ["Business", "Legal", "Medical"],
    strengths: ["Global Network", "Academic Prestige", "Research Funding", "Alumni Connections"],
    campusLife: "Historic campus with rich traditions and extensive extracurricular opportunities.",
    notableAlumni: ["Barack Obama", "Mark Zuckerberg", "Bill Gates"],
  },
  {
    id: "berkeley",
    name: "University of California, Berkeley",
    location: "Berkeley, CA",
    state: "California",
    type: "public",
    acceptanceRate: 17,
    ranking: 20,
    tuition: 14312,
    enrollment: 45057,
    popularMajors: ["Engineering", "Business", "Biology", "Computer Science", "Economics"],
    description: "Top public research university known for academic excellence and social activism.",
    logo: "UCB",
    aiMatch: 85,
    recommendedFor: ["Engineering", "Science", "Business"],
    strengths: ["Research Excellence", "Diverse Community", "Social Impact", "Innovation"],
    campusLife: "Vibrant campus culture with strong activism and diverse student body.",
    notableAlumni: ["Steve Wozniak", "Eric Schmidt", "Jennifer Granholm"],
  },
  {
    id: "cmu",
    name: "Carnegie Mellon University",
    location: "Pittsburgh, PA",
    state: "Pennsylvania",
    type: "private",
    acceptanceRate: 17,
    ranking: 25,
    tuition: 63829,
    enrollment: 15818,
    popularMajors: ["Computer Science", "Engineering", "Business", "Drama", "Art"],
    description: "Leading institution in computer science, robotics, and artificial intelligence research.",
    logo: "CMU",
    aiMatch: 90,
    recommendedFor: ["Engineering", "Creative", "Science"],
    strengths: ["AI Research", "Robotics", "Tech Innovation", "Interdisciplinary Programs"],
    campusLife: "Tech-focused environment with strong arts programs and collaborative projects.",
    notableAlumni: ["Andy Warhol", "Randy Pausch", "David Tepper"],
  },
  {
    id: "nyu",
    name: "New York University",
    location: "New York, NY",
    state: "New York",
    type: "private",
    acceptanceRate: 21,
    ranking: 30,
    tuition: 58168,
    enrollment: 51848,
    popularMajors: ["Business", "Liberal Arts", "Film", "Psychology", "Economics"],
    description: "Urban campus in Manhattan with strong programs in business, arts, and liberal studies.",
    logo: "NYU",
    aiMatch: 82,
    recommendedFor: ["Business", "Creative", "Liberal Arts"],
    strengths: ["NYC Location", "Industry Access", "Global Programs", "Arts Excellence"],
    campusLife: "Urban campus integrated into NYC with incredible internship and cultural opportunities.",
    notableAlumni: ["Lady Gaga", "Alec Baldwin", "Martin Scorsese"],
  },
  {
    id: "caltech",
    name: "California Institute of Technology",
    location: "Pasadena, CA",
    state: "California",
    type: "private",
    acceptanceRate: 6,
    ranking: 9,
    tuition: 60864,
    enrollment: 2397,
    popularMajors: ["Engineering", "Physics", "Mathematics", "Computer Science", "Chemistry"],
    description: "Small, elite institution focused on science and engineering with world-class research.",
    logo: "CIT",
    aiMatch: 93,
    recommendedFor: ["Engineering", "Science"],
    strengths: ["Research Excellence", "Small Class Sizes", "Nobel Laureates", "NASA Partnerships"],
    campusLife: "Intimate academic community with intense focus on STEM fields.",
    notableAlumni: ["Gordon Moore", "Kip Thorne", "Frank Capra"],
  },
  {
    id: "georgia-tech",
    name: "Georgia Institute of Technology",
    location: "Atlanta, GA",
    state: "Georgia",
    type: "public",
    acceptanceRate: 23,
    ranking: 44,
    tuition: 12682,
    enrollment: 36848,
    popularMajors: ["Engineering", "Computer Science", "Business", "Architecture", "Sciences"],
    description: "Top public tech university with strong industry connections and co-op programs.",
    logo: "GT",
    aiMatch: 87,
    recommendedFor: ["Engineering", "Business", "Science"],
    strengths: ["Co-op Programs", "Industry Partnerships", "Tech Innovation", "Career Services"],
    campusLife: "Tech-focused campus in Atlanta with excellent internship and job opportunities.",
    notableAlumni: ["Jimmy Carter", "Bobby Dodd", "John Young"],
  },
  {
    id: "northwestern",
    name: "Northwestern University",
    location: "Evanston, IL",
    state: "Illinois",
    type: "private",
    acceptanceRate: 9,
    ranking: 12,
    tuition: 63468,
    enrollment: 22603,
    popularMajors: ["Business", "Engineering", "Journalism", "Psychology", "Economics"],
    description: "Prestigious university known for journalism, business, and strong liberal arts programs.",
    logo: "NU",
    aiMatch: 84,
    recommendedFor: ["Business", "Creative", "Liberal Arts"],
    strengths: ["Journalism Excellence", "Business School", "Research", "Chicago Access"],
    campusLife: "Beautiful lakefront campus near Chicago with strong school spirit and traditions.",
    notableAlumni: ["Stephen Colbert", "Meghan Markle", "Warren Beatty"],
  },
  {
    id: "duke",
    name: "Duke University",
    location: "Durham, NC",
    state: "North Carolina",
    type: "private",
    acceptanceRate: 8,
    ranking: 10,
    tuition: 63054,
    enrollment: 17198,
    popularMajors: ["Economics", "Biology", "Psychology", "Engineering", "Public Policy"],
    description: "Elite university known for academics, research, and championship athletics.",
    logo: "DUKE",
    aiMatch: 86,
    recommendedFor: ["Medical", "Business", "Engineering"],
    strengths: ["Medical School", "Research Triangle", "Athletics", "Alumni Network"],
    campusLife: "Gothic architecture campus with strong school spirit and excellent athletics.",
    notableAlumni: ["Tim Cook", "Melinda Gates", "Richard Nixon"],
  },
]

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedState, setSelectedState] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [selectedMajor, setSelectedMajor] = useState("all")
  const [sortBy, setSortBy] = useState("ranking")
  const [filteredColleges, setFilteredColleges] = useState(colleges)
  const [userQuizResults, setUserQuizResults] = useState<any>(null)

  // Load user quiz results for AI recommendations
  useEffect(() => {
    const savedResults = localStorage.getItem("quizResults")
    if (savedResults) {
      setUserQuizResults(JSON.parse(savedResults))
    }
  }, [])

  // Filter and sort colleges
  useEffect(() => {
    const filtered = colleges.filter((college) => {
      const matchesSearch =
        college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        college.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesState = selectedState === "all" || college.state === selectedState
      const matchesType = selectedType === "all" || college.type === selectedType
      const matchesMajor =
        selectedMajor === "all" ||
        college.popularMajors.some((major) => major.toLowerCase().includes(selectedMajor.toLowerCase()))

      return matchesSearch && matchesState && matchesType && matchesMajor
    })

    // Sort colleges
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "ranking":
          return a.ranking - b.ranking
        case "acceptance":
          return a.acceptanceRate - b.acceptanceRate
        case "tuition":
          return a.tuition - b.tuition
        case "aiMatch":
          return (b.aiMatch || 0) - (a.aiMatch || 0)
        default:
          return a.ranking - b.ranking
      }
    })

    setFilteredColleges(filtered)
  }, [searchTerm, selectedState, selectedType, selectedMajor, sortBy])

  const getAIRecommendations = () => {
    if (!userQuizResults) return []

    // Get top field from quiz results
    const topField =
      userQuizResults.topField ||
      Object.entries(userQuizResults.fieldScores || {}).sort(([, a], [, b]) => (b as number) - (a as number))[0]?.[0]

    return colleges
      .filter((college) => college.recommendedFor?.includes(topField))
      .sort((a, b) => (b.aiMatch || 0) - (a.aiMatch || 0))
      .slice(0, 6)
  }

  const aiRecommendations = getAIRecommendations()

  const formatTuition = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatEnrollment = (count: number) => {
    return new Intl.NumberFormat("en-US").format(count)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900">
      <Navbar />

      {/* Header */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <Badge className="mb-4 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
            College Discovery Platform
          </Badge>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-balance">
            Find Your Perfect College Match
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-pretty">
            Discover top colleges and universities that align with your career goals, interests, and academic profile
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-6 gap-4">
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search colleges or locations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={selectedState} onValueChange={setSelectedState}>
              <SelectTrigger>
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="California">California</SelectItem>
                <SelectItem value="Massachusetts">Massachusetts</SelectItem>
                <SelectItem value="New York">New York</SelectItem>
                <SelectItem value="Pennsylvania">Pennsylvania</SelectItem>
                <SelectItem value="Georgia">Georgia</SelectItem>
                <SelectItem value="Illinois">Illinois</SelectItem>
                <SelectItem value="North Carolina">North Carolina</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedMajor} onValueChange={setSelectedMajor}>
              <SelectTrigger>
                <SelectValue placeholder="Major" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Majors</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Engineering">Engineering</SelectItem>
                <SelectItem value="Business">Business</SelectItem>
                <SelectItem value="Biology">Biology</SelectItem>
                <SelectItem value="Psychology">Psychology</SelectItem>
                <SelectItem value="Economics">Economics</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ranking">Ranking</SelectItem>
                <SelectItem value="acceptance">Acceptance Rate</SelectItem>
                <SelectItem value="tuition">Tuition</SelectItem>
                <SelectItem value="aiMatch">AI Match</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-12">
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">All Colleges ({filteredColleges.length})</TabsTrigger>
            <TabsTrigger value="recommended" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Recommended ({aiRecommendations.length})
            </TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid gap-6">
              {filteredColleges.map((college) => (
                <Card key={college.id} className="hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-sm">{college.logo}</span>
                        </div>
                        <div>
                          <CardTitle className="text-xl mb-1">{college.name}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                            <MapPin className="h-4 w-4" />
                            {college.location}
                            <Badge variant="outline" className="ml-2">
                              {college.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        {college.aiMatch && (
                          <div className="mb-2">
                            <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                              {college.aiMatch}% AI Match
                            </Badge>
                          </div>
                        )}
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">#{college.ranking}</div>
                        <div className="text-sm text-gray-500">National Ranking</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base mb-4">{college.description}</CardDescription>

                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-600" />
                        <div>
                          <div className="text-sm font-medium">{college.acceptanceRate}%</div>
                          <div className="text-xs text-gray-500">Acceptance Rate</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-blue-600" />
                        <div>
                          <div className="text-sm font-medium">{formatTuition(college.tuition)}</div>
                          <div className="text-xs text-gray-500">Annual Tuition</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-600" />
                        <div>
                          <div className="text-sm font-medium">{formatEnrollment(college.enrollment)}</div>
                          <div className="text-xs text-gray-500">Total Enrollment</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <GraduationCap className="h-4 w-4 text-orange-600" />
                        <div>
                          <div className="text-sm font-medium">{college.strengths.length}</div>
                          <div className="text-xs text-gray-500">Key Strengths</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <h4 className="font-semibold mb-2">Popular Majors</h4>
                        <div className="flex flex-wrap gap-1">
                          {college.popularMajors.map((major, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {major}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Key Strengths</h4>
                        <div className="flex flex-wrap gap-1">
                          {college.strengths.map((strength, index) => (
                            <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                              {strength}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Heart className="h-4 w-4 mr-1" />
                          Save
                        </Button>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-1" />
                          Compare
                        </Button>
                      </div>
                      <Button>
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="recommended" className="space-y-6">
            {userQuizResults ? (
              <>
                <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Brain className="h-5 w-5 text-blue-600" />
                      AI-Powered Recommendations
                    </CardTitle>
                    <CardDescription>
                      Based on your career assessment results showing {userQuizResults.topField || "strong"} field
                      compatibility
                    </CardDescription>
                  </CardHeader>
                </Card>

                <div className="grid gap-6">
                  {aiRecommendations.map((college) => (
                    <Card
                      key={college.id}
                      className="hover:shadow-xl transition-all duration-300 border-2 border-blue-200 dark:border-blue-800"
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">{college.logo}</span>
                            </div>
                            <div>
                              <CardTitle className="text-xl mb-1 flex items-center gap-2">
                                {college.name}
                                <Sparkles className="h-5 w-5 text-blue-600" />
                              </CardTitle>
                              <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <MapPin className="h-4 w-4" />
                                {college.location}
                                <Badge variant="outline" className="ml-2">
                                  {college.type}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="mb-2">
                              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                {college.aiMatch}% AI Match
                              </Badge>
                            </div>
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              #{college.ranking}
                            </div>
                            <div className="text-sm text-gray-500">National Ranking</div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="text-base mb-4">{college.description}</CardDescription>

                        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-4">
                          <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
                            Why This College Matches You:
                          </h4>
                          <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
                            {college.recommendedFor?.map((field, index) => (
                              <li key={index}>• Strong programs in {field} field</li>
                            ))}
                            <li>• Aligns with your career assessment results</li>
                            <li>• Excellent industry connections and opportunities</li>
                          </ul>
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-green-600" />
                            <div>
                              <div className="text-sm font-medium">{college.acceptanceRate}%</div>
                              <div className="text-xs text-gray-500">Acceptance Rate</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-blue-600" />
                            <div>
                              <div className="text-sm font-medium">{formatTuition(college.tuition)}</div>
                              <div className="text-xs text-gray-500">Annual Tuition</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-purple-600" />
                            <div>
                              <div className="text-sm font-medium">{formatEnrollment(college.enrollment)}</div>
                              <div className="text-xs text-gray-500">Total Enrollment</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-600" />
                            <div>
                              <div className="text-sm font-medium">Top Choice</div>
                              <div className="text-xs text-gray-500">For Your Field</div>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <h4 className="font-semibold mb-2">Popular Majors</h4>
                            <div className="flex flex-wrap gap-1">
                              {college.popularMajors.map((major, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">
                                  {major}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-2">Key Strengths</h4>
                            <div className="flex flex-wrap gap-1">
                              {college.strengths.map((strength, index) => (
                                <Badge key={index} className="bg-blue-100 text-blue-800 text-xs">
                                  {strength}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mt-6">
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Heart className="h-4 w-4 mr-1" />
                              Save
                            </Button>
                            <Button variant="outline" size="sm">
                              <BookOpen className="h-4 w-4 mr-1" />
                              Compare
                            </Button>
                          </div>
                          <Button className="bg-blue-600 hover:bg-blue-700">
                            Learn More
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            ) : (
              <Card className="text-center py-12">
                <CardContent>
                  <Brain className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Take Our Career Assessment</h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Complete our comprehensive quiz to get personalized college recommendations based on your career
                    goals and interests.
                  </p>
                  <Link href="/quiz">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Start Career Assessment
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="favorites" className="space-y-6">
            <Card className="text-center py-12">
              <CardContent>
                <Heart className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Saved Colleges Yet</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Save colleges you're interested in to compare them later and track your application progress.
                </p>
                <Button variant="outline">Browse All Colleges</Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
