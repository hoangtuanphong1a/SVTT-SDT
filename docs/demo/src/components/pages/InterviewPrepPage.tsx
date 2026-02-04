import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Play,
  Pause,
  RotateCcw,
  Clock,
  CheckCircle,
  BookOpen,
  Lightbulb,
  Target,
  Video,
  Mic,
  Users,
  Star,
  Award,
  TrendingUp,
  ArrowRight,
  PlayCircle
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

interface InterviewPrepPageProps {
  navigate: (page: string, id?: string) => void;
}

interface Question {
  id: string;
  question: string;
  category: string;
  difficulty: "easy" | "medium" | "hard";
  tips: string[];
  sampleAnswer: string;
  duration: number;
}

interface MockInterview {
  id: string;
  title: string;
  position: string;
  duration: number;
  questions: number;
  difficulty: string;
  description: string;
  completedBy: number;
  rating: number;
}

export default function InterviewPrepPage({ navigate }: InterviewPrepPageProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState<string[]>([]);

  const mockInterviews: MockInterview[] = [
    {
      id: "1",
      title: "Frontend Developer Interview",
      position: "Frontend Developer",
      duration: 45,
      questions: 12,
      difficulty: "Medium",
      description: "Tập trung vào React, JavaScript, và CSS. Bao gồm câu hỏi kỹ thuật và tình huống thực tế.",
      completedBy: 1247,
      rating: 4.8
    },
    {
      id: "2", 
      title: "Product Manager Interview",
      position: "Product Manager",
      duration: 60,
      questions: 15,
      difficulty: "Hard",
      description: "Câu hỏi về chiến lược sản phẩm, phân tích thị trường và quản lý stakeholder.",
      completedBy: 856,
      rating: 4.7
    },
    {
      id: "3",
      title: "Backend Developer Interview", 
      position: "Backend Developer",
      duration: 50,
      questions: 14,
      difficulty: "Medium",
      description: "Tập trung vào API design, database, và system architecture.",
      completedBy: 1108,
      rating: 4.6
    },
    {
      id: "4",
      title: "UI/UX Designer Interview",
      position: "UI/UX Designer", 
      duration: 40,
      questions: 10,
      difficulty: "Easy",
      description: "Portfolio review, design process và user research methodology.",
      completedBy: 642,
      rating: 4.9
    }
  ];

  const commonQuestions: Question[] = [
    {
      id: "1",
      question: "Hãy giới thiệu về bản thân bạn",
      category: "General",
      difficulty: "easy",
      duration: 120,
      tips: [
        "Kể câu chuyện có cấu trúc rõ ràng",
        "Tập trung vào kinh nghiệm liên quan đến vị trí",
        "Kết thúc bằng lý do quan tâm đến công ty"
      ],
      sampleAnswer: "Tôi là một Frontend Developer với 3 năm kinh nghiệm trong việc xây dựng ứng dụng web sử dụng React và TypeScript. Trong công việc hiện tại tại ABC Company, tôi đã phát triển và maintain hệ thống e-commerce với hơn 100,000 người dùng hàng tháng..."
    },
    {
      id: "2", 
      question: "Tại sao bạn muốn làm việc tại công ty chúng tôi?",
      category: "Motivation",
      difficulty: "medium",
      duration: 90,
      tips: [
        "Nghiên cứu kỹ về công ty trước",
        "Kết nối mục tiêu cá nhân với mission của công ty",
        "Đề cập đến sản phẩm hoặc dự án cụ thể"
      ],
      sampleAnswer: "Tôi rất ấn tượng với cách công ty đã phát triển platform XYZ trong 2 năm qua. Tôi tin rằng kinh nghiệm của tôi trong việc optimize performance và UX sẽ góp phần vào sự phát triển của sản phẩm..."
    },
    {
      id: "3",
      question: "Mô tả một dự án khó khăn bạn đã làm và cách bạn giải quyết",
      category: "Experience", 
      difficulty: "hard",
      duration: 180,
      tips: [
        "Sử dụng STAR method (Situation, Task, Action, Result)",
        "Tập trung vào vai trò và contribution của bạn",
        "Đề cập đến lessons learned"
      ],
      sampleAnswer: "Trong dự án migrate hệ thống legacy sang React, chúng tôi gặp phải vấn đề performance nghiêm trọng. Tôi đã analyze và phát hiện ra bottleneck từ việc re-render không cần thiết..."
    }
  ];

  const interviewTips = [
    {
      category: "Chuẩn bị trước phỏng vấn",
      tips: [
        "Nghiên cứu kỹ về công ty và vị trí ứng tuyển",
        "Chuẩn bị câu trả lời cho các câu hỏi phổ biến",
        "Chuẩn bị câu hỏi để hỏi ngược lại nhà tuyển dụng",
        "Test kỹ thuật (camera, micro) nếu phỏng vấn online"
      ]
    },
    {
      category: "Trong buổi phỏng vấn",
      tips: [
        "Đến sớm 10-15 phút hoặc join sớm nếu online",
        "Giữ eye contact và tư thế tự tin",
        "Lắng nghe cẩn thận và trả lời đầy đủ câu hỏi",
        "Đưa ra ví dụ cụ thể để minh họa câu trả lời"
      ]
    },
    {
      category: "Sau phỏng vấn",
      tips: [
        "Gửi email cảm ơn trong vòng 24 giờ",
        "Theo dõi kết quả theo timeline đã thỏa thuận",
        "Reflect và note lại feedback để cải thiện",
        "Tiếp tục apply các vị trí khác"
      ]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-green-100 text-green-700";
      case "medium": return "bg-yellow-100 text-yellow-700"; 
      case "hard": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const MockInterviewCard = ({ interview }: { interview: MockInterview }) => (
    <Card className="hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg mb-2">{interview.title}</CardTitle>
            <p className="text-gray-600 text-sm mb-3">{interview.description}</p>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {interview.duration} phút
              </div>
              <div className="flex items-center">
                <BookOpen className="h-4 w-4 mr-1" />
                {interview.questions} câu hỏi
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1" />
                {interview.completedBy.toLocaleString()} người đã thực hiện
              </div>
            </div>
          </div>
          <Badge className={getDifficultyColor(interview.difficulty)}>
            {interview.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(interview.rating)
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">
                ({interview.rating})
              </span>
            </div>
          </div>
          <Button className="bg-orange-primary hover:bg-orange-600">
            <PlayCircle className="h-4 w-4 mr-2" />
            Bắt đầu
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const QuestionCard = ({ question, index }: { question: Question; index: number }) => (
    <Card className="mb-4">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <Badge variant="outline">Câu {index + 1}</Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty}
              </Badge>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                {question.duration}s
              </div>
            </div>
            <CardTitle className="text-lg">{question.question}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2 flex items-center">
              <Lightbulb className="h-4 w-4 mr-2 text-yellow-500" />
              Gợi ý trả lời:
            </h4>
            <ul className="space-y-1">
              {question.tips.map((tip, i) => (
                <li key={i} className="text-sm text-gray-600 flex items-start">
                  <span className="w-1.5 h-1.5 bg-orange-primary rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setIsRecording(!isRecording)}
              className={`${
                isRecording 
                  ? "bg-red-500 hover:bg-red-600" 
                  : "bg-orange-primary hover:bg-orange-600"
              }`}
            >
              {isRecording ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Dừng ghi ({recordingTime}s)
                </>
              ) : (
                <>
                  <Mic className="h-4 w-4 mr-2" />
                  Ghi âm trả lời
                </>
              )}
            </Button>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Xem gợi ý trả lời
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Gợi ý trả lời mẫu</DialogTitle>
                  <DialogDescription>
                    Đây là ví dụ tham khảo, hãy tùy chỉnh theo kinh nghiệm của bạn
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-gray-700 leading-relaxed">
                    {question.sampleAnswer}
                  </p>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-primary rounded-full mb-4">
            <Video className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Chuẩn bị phỏng vấn
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Luyện tập phỏng vấn với AI, học các câu hỏi phổ biến và nhận feedback để tự tin hơn
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">50+</p>
              <p className="text-sm text-gray-600">Mock interviews</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">500+</p>
              <p className="text-sm text-gray-600">Câu hỏi phổ biến</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">25K+</p>
              <p className="text-sm text-gray-600">Người đã luyện tập</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <p className="text-2xl font-bold text-gray-900">92%</p>
              <p className="text-sm text-gray-600">Tỷ lệ thành công</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Tổng quan</TabsTrigger>
            <TabsTrigger value="mock-interviews">Mock Interview</TabsTrigger>
            <TabsTrigger value="common-questions">Câu hỏi phổ biến</TabsTrigger>
            <TabsTrigger value="tips">Tips & Tricks</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="bg-gradient-to-br from-orange-50 to-orange-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-primary">
                    <Target className="h-5 w-5 mr-2" />
                    Bắt đầu luyện tập
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Chọn vị trí bạn muốn luyện tập và bắt đầu mock interview với AI. 
                    Nhận feedback chi tiết về câu trả lời của bạn.
                  </p>
                  <Button className="w-full bg-orange-primary hover:bg-orange-600">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Bắt đầu Mock Interview
                  </Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-blue-100">
                <CardHeader>
                  <CardTitle className="flex items-center text-blue-600">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Ngân hàng câu hỏi
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-6">
                    Tìm hiểu các câu hỏi phỏng vấn phổ biến theo từng ngành nghề 
                    và vị trí cụ thể.
                  </p>
                  <Button 
                    variant="outline" 
                    className="w-full border-blue-200 text-blue-700 hover:bg-blue-50"
                    onClick={() => setActiveTab("common-questions")}
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    Xem câu hỏi
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Progress Tracking */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2 text-orange-primary" />
                  Tiến độ của bạn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Mock Interviews</span>
                      <span className="text-sm text-gray-600">3/10</span>
                    </div>
                    <Progress value={30} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Câu hỏi đã luyện</span>
                      <span className="text-sm text-gray-600">45/100</span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Điểm trung bình</span>
                      <span className="text-sm text-gray-600">8.2/10</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="mock-interviews" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockInterviews.map(interview => (
                <MockInterviewCard key={interview.id} interview={interview} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="common-questions" className="mt-8">
            <div className="space-y-4">
              {commonQuestions.map((question, index) => (
                <QuestionCard key={question.id} question={question} index={index} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tips" className="mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {interviewTips.map((section, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{section.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {section.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start text-sm">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Additional Resources */}
            <Card className="mt-8 bg-gradient-to-r from-purple-50 to-pink-50">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="h-5 w-5 mr-2 text-purple-600" />
                  Tài nguyên bổ sung
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-3">Video hướng dẫn</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center">
                        <Play className="h-3 w-3 mr-2 text-purple-600" />
                        Body language trong phỏng vấn (15 phút)
                      </li>
                      <li className="flex items-center">
                        <Play className="h-3 w-3 mr-2 text-purple-600" />
                        Cách trả lời câu hỏi khó (20 phút)
                      </li>
                      <li className="flex items-center">
                        <Play className="h-3 w-3 mr-2 text-purple-600" />
                        Phỏng vấn qua video call (12 phút)
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Checklist phỏng vấn</h4>
                    <Button variant="outline" className="w-full">
                      <ArrowRight className="h-4 w-4 mr-2" />
                      Tải xuống PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}