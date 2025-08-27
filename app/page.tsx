'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { 
  Mail, 
  MapPin, 
  Github, 
  Linkedin, 
  ExternalLink, 
  Code2, 
  Trophy, 
  GraduationCap, 
  Briefcase, 
  Star,
  ChevronDown,
  Menu,
  X
} from 'lucide-react';

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<any | null>(null);

  const [activeSection, setActiveSection] = useState('hero');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = ['hero', 'about', 'education', 'skills', 'projects', 'achievements', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const TypewriterText = ({ texts, className = '' }: { texts: string[], className?: string }) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
      const timeout = setTimeout(() => {
        const fullText = texts[currentTextIndex];
        
        if (!isDeleting) {
          setCurrentText(fullText.substring(0, currentText.length + 1));
          
          if (currentText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setCurrentText(fullText.substring(0, currentText.length - 1));
          
          if (currentText === '') {
            setIsDeleting(false);
            setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          }
        }
      }, isDeleting ? 50 : 100);

      return () => clearTimeout(timeout);
    }, [currentText, isDeleting, texts, currentTextIndex]);

    return (
      <span className={className}>
        {currentText}
        <span className="animate-pulse">|</span>
      </span>
    );
  };

  const AnimatedCounter = ({ target, label }: { target: number, label: string }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            let start = 0;
            const increment = target / 50;
            const timer = setInterval(() => {
              start += increment;
              setCount(Math.min(Math.floor(start), target));
              if (start >= target) {
                clearInterval(timer);
              }
            }, 30);
          }
        },
        { threshold: 0.5 }
      );

      if (countRef.current) {
        observer.observe(countRef.current);
      }

      return () => observer.disconnect();
    }, [target]);

    return (
      <div ref={countRef} className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
        <div className="text-3xl font-bold text-white mb-2">{count}+</div>
        <div className="text-gray-300 text-sm">{label}</div>
      </div>
    );
  };

  const SkillBar = ({ skill, percentage, delay = 0 }: { skill: string, percentage: number, delay?: number }) => {
    const [animated, setAnimated] = useState(false);
    const skillRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            setTimeout(() => setAnimated(true), delay);
          }
        },
        { threshold: 0.5 }
      );

      if (skillRef.current) {
        observer.observe(skillRef.current);
      }

      return () => observer.disconnect();
    }, [delay]);

    return (
      <div ref={skillRef} className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-gray-300 font-medium">{skill}</span>
          <span className="text-blue-400 font-bold">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2.5">
          <div
            className={`bg-gradient-to-r from-blue-500 to-purple-600 h-2.5 rounded-full transition-all duration-1000 ease-out ${
              animated ? `w-[${percentage}%]` : 'w-0'
            }`}
            style={{ width: animated ? `${percentage}%` : '0%' }}
          />
        </div>
      </div>
    );
  };
  const ProjectModal = ({ project, onClose }: { project: any; onClose: () => void }) => {
  if (!project) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 p-8 rounded-2xl max-w-2xl w-full relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          ✕
        </button>
        <h2 className="text-3xl font-bold text-white mb-4">{project.title}</h2>
        <p className="text-gray-300 mb-6">{project.details}</p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
            >
              {tech}
            </span>
          ))}
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-blue-600 rounded-lg text-white font-medium hover:bg-blue-700 transition-all"
        >
          View Project
        </a>
      </div>
    </div>
  );
};

  const ProjectCard = ({ project, index }: { project: any; index: number }) => {
  return (
    <div
      className="group p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20 animate-slide-up cursor-pointer"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => setSelectedProject(project)}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-3 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg">
          <Code2 className="w-6 h-6 text-blue-400" />
        </div>
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()} // prevent opening modal on link click
        >
          <ExternalLink className="w-5 h-5 text-gray-400 hover:text-blue-400 transition-colors duration-300" />
        </a>
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
      <p className="text-gray-300 mb-4">{project.description}</p>
      <div className="flex flex-wrap gap-2">
        {project.technologies.map((tech: string, i: number) => (
          <span
            key={i}
            className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};


  const projects = [
    {
      title: "Blog Web App",
      description: "Full-stack CRUD blog with secure authentication. REST APIs for seamless frontend-backend communication.",
      technologies: ["MERN", "Firebase", "REST API", "Authentication"],
      link: "https://github.com/RUTHVIKMATURU/blogApp",
    },
    {
      title: "Campus Career Connect",
      description: "Networking platform with real-time chat, event updates, and role-based access.",
      technologies: ["MERN", "Firebase", "Real-time Chat", "Role-based Access"],
      link: "https://github.com/RUTHVIKMATURU/campus-connect",
    },
    {
      title: "Hostel Management System",
      description: "CRUD-based hostel records and fee tracking with admin dashboard.",
      technologies: ["MERN", "CRUD", "Admin Dashboard", "Fee Management"],
      link: "https://github.com/RUTHVIKMATURU/hostel-management-system",
    },
    {
      title: "Event Management System",
      description: "Event scheduling, registration, and participant management with role-based access.",
      technologies: ["MERN", "Event Scheduling", "Registration", "Role Management"],
      link: "https://github.com/RUTHVIKMATURU/eventApp",
    },
    {
      title: "Movies DBMS",
      description: "Designed schemas and optimized SQL queries for movie database.",
      technologies: ["MySQL", "Database Design", "Query Optimization"]
    }
  ];

  const navigation = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Education', id: 'education' },
    { name: 'Skills', id: 'skills' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Cursor Follower */}
      <div
        className="fixed w-6 h-6 bg-blue-500/30 rounded-full pointer-events-none z-50 transition-all duration-150 ease-out"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          transform: 'scale(1)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              RM
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 rounded-md text-gray-300 hover:text-white hover:bg-white/10 transition-colors duration-300"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/40 backdrop-blur-md border-t border-white/10">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-blue-400 bg-blue-500/20'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="hero" className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                RUTHVIK MATURU
              </span>
            </h1>
            <div className="text-xl md:text-2xl text-gray-300 mb-8 h-16">
              <TypewriterText
                texts={[
                  "Full-Stack Developer",
                  "AI & ML Enthusiast",
                  "Competitive Programmer",
                  "Problem Solver"
                ]}
                className="text-blue-400"
              />
            </div>
            <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              Passionate software developer with expertise in AI, MERN stack, and competitive programming. 
              Building scalable, user-focused applications with innovative solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => scrollToSection('projects')}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-blue-500/25"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="px-8 py-4 border border-blue-500 text-blue-400 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-gray-400" />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-slide-in-left">
              <p className="text-gray-300 text-lg leading-relaxed">
                I'm a passionate and results-driven software developer with expertise in AI, MERN stack, and full-stack development. 
                My journey in technology is fueled by curiosity and a commitment to creating innovative solutions.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With strong problem-solving skills backed by competitive programming achievements, I bring hands-on experience 
                in building scalable, user-focused applications. I'm proficient in multiple programming languages and always 
                eager to learn new technologies.
              </p>
              <div className="grid grid-cols-2 gap-6 mt-8">
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <MapPin className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-300 text-sm">Hyderabad, Telangana</p>
                </div>
                <div className="p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <Mail className="w-6 h-6 text-blue-400 mb-2" />
                  <p className="text-gray-300 text-sm">ruthvik0811@gmail.com</p>
                </div>
              </div>
            </div>
            
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/10">
                  <div className="w-64 h-64 bg-gradient-to-br from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-6xl font-bold">
                    RM
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse opacity-70"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full animate-pulse opacity-70"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Education
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-start gap-6">
                <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg">
                  <GraduationCap className="w-8 h-8 text-blue-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    B.Tech CSE (AI & ML)
                  </h3>
                  <p className="text-blue-400 font-medium mb-2">
                    Vallurupalli Nageswara Rao Vignana Jyothi Institute of Engineering and Technology
                  </p>
                  <div className="flex flex-wrap gap-4 mb-4">
                    <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                      GPA: 9.26/10
                    </span>
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                      Expected 2027
                    </span>
                  </div>
                  <p className="text-gray-300 mb-4">
                    <strong>Coursework:</strong> DBMS, OS, ML, AI, DAA, DSA
                  </p>
                  <p className="text-gray-400">
                    Hyderabad, Telangana
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Programming Languages</h3>
              <SkillBar skill="Java (OOP)" percentage={90} delay={0} />
              <SkillBar skill="Python" percentage={85} delay={100} />
              <SkillBar skill="C++" percentage={80} delay={200} />
              <SkillBar skill="C" percentage={85} delay={300} />
              <SkillBar skill="SQL" percentage={88} delay={400} />
            </div>
            
            <div className="space-y-8">
              <h3 className="text-2xl font-bold text-white mb-6">Web Development</h3>
              <SkillBar skill="React.js" percentage={92} delay={0} />
              <SkillBar skill="Node.js" percentage={88} delay={100} />
              <SkillBar skill="HTML/CSS" percentage={95} delay={200} />
              <SkillBar skill="MongoDB" percentage={85} delay={300} />
              <SkillBar skill="MySQL" percentage={88} delay={400} />
            </div>
          </div>
          
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <Code2 className="w-8 h-8 text-blue-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Full-Stack</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <Star className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">AI & ML</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <Trophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">Competitive Programming</p>
            </div>
            <div className="text-center p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105">
              <Briefcase className="w-8 h-8 text-green-400 mx-auto mb-3" />
              <p className="text-gray-300 text-sm">API Development</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section id="achievements" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Achievements
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <AnimatedCounter target={350} label="LeetCode Problems" />
            <AnimatedCounter target={500} label="CodeChef Problems" />
            <AnimatedCounter target={200} label="Codeforces Problems" />
            <AnimatedCounter target={100} label="Contest Participations" />
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Smart Interviews Leaderboard", position: "1st Place", points: "92,000 points", institute: "VNRVJIET" },
              { title: "Top 100 Coders", position: "27th Position", detail: "1st Year", color: "from-yellow-400 to-orange-500" },
              { title: "Turing Cup 2025", position: "12th Position", color: "from-blue-400 to-purple-500" },
              { title: "Codenox 2.0", position: "10th Position", detail: "1st Year", color: "from-green-400 to-blue-500" },
              { title: "Coding Profiles", detail: "Codeforces: 1219 CodeChef: 1660 leetcode: 1717", color: "from-purple-400 to-pink-500" },
              { title: "Hackathon Participation", detail: "SIH, Webathon, Ideathon, VJ Hackathon", color: "from-pink-400 to-red-500" },
              { title: "DQ-Code Quest", position: "5th Position", detail: "3rd Year", color: "from-blue-400 to-red-500" }
            ].map((achievement, index) => (
              <div
                key={index}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:border-blue-500/50 transition-all duration-300 transform hover:scale-105 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`inline-block p-3 bg-gradient-to-r ${achievement.color || 'from-blue-500 to-purple-600'} bg-opacity-20 rounded-lg mb-4`}>
                  <Trophy className="w-6 h-6 text-yellow-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{achievement.title}</h3>
                {achievement.position && (
                  <p className="text-blue-400 font-medium mb-1">{achievement.position}</p>
                )}
                {achievement.points && (
                  <p className="text-green-400 font-medium mb-1">{achievement.points}</p>
                )}
                {achievement.detail && (
                  <p className="text-gray-300 text-sm">{achievement.detail}</p>
                )}
                {achievement.institute && (
                  <p className="text-purple-400 text-sm">{achievement.institute}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Get In Touch
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-white mb-6">Let's Connect</h3>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  I'm always open to discussing new opportunities, innovative projects, and ways to collaborate. 
                  Feel free to reach out if you'd like to work together!
                </p>
                
                <div className="space-y-4">
                  <a
                    href="mailto:ruthvik0811@gmail.com"
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <Mail className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      ruthvik0811@gmail.com
                    </span>
                  </a>
                  
                  <a
                    href="https://www.linkedin.com/in/ruthvik-maturu-86545228b/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <Linkedin className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      LinkedIn Profile
                    </span>
                  </a>
                  
                  <a
                    href="https://github.com/RUTHVIKMATURU"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                  >
                    <Github className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform duration-300" />
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      GitHub Profile
                    </span>
                  </a>
                </div>
              </div>
              
              <div className="p-8 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                <h3 className="text-xl font-bold text-white mb-6">Coding Profiles</h3>
                <div className="space-y-4">
                  {[
                    { name: "Codeforces", rating: "1207", link: "https://codeforces.com/profile/RUTHVIK0811" },
                    { name: "CodeChef", rating: "1660", link: "https://www.codechef.com/users/ruthvik0811" },
                    { name: "LeetCode", rating: "1717", link: "https://leetcode.com/u/ruthvik0811/" },
                    { name: "HackerRank", rating: "★★★★★", link: "https://www.hackerrank.com/profile/ruthvik0811" }
                  ].map((profile, index) => (
                    <a
                      key={index}
                      href={profile.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/50 transition-all duration-300 group"
                    >
                      <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                        {profile.name}
                      </span>
                      <span className="text-blue-400 font-medium group-hover:scale-110 transition-transform duration-300">
                        {profile.rating}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2024 Ruthvik Maturu. Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 1s ease-out;
        }

        .animate-slide-in-right {
          animation: slide-in-right 1s ease-out;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    {selectedProject && (
      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    )}

    </div>
  );
}