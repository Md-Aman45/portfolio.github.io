import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Linkedin, Mail, Phone, ExternalLink, ChevronDown, Code, Sparkles, Zap, Rocket, Star, Download, MousePointer, ArrowRight, Menu, X, MessageCircle, Send, User, AtSign } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card';
import { Badge } from './components/ui/badge';
import { Input } from './components/ui/input';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { ImageWithFallback } from './components/figma/ImageWithFallback';
import { useEffect, useState } from 'react';

// Navigation Component
const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleSectionChange = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionChange);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionChange);
    };
  }, []);

  const scrollToSection = (href: string) => {
    const sectionId = href.replace('#', '');
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md border-b border-border/50 shadow-lg' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <motion.div
            className="font-bold text-xl lg:text-2xl cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => scrollToSection('#home')}
          >
            <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              Md Aman
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-orange-500'
                    : 'text-foreground hover:text-orange-500'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item.name}
                {activeSection === item.href.replace('#', '') && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-orange-500 to-yellow-500"
                    layoutId="activeSection"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
            <Button
              onClick={() => scrollToSection('#contact')}
              size="sm"
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold"
            >
              Hire Me
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-foreground hover:text-orange-500 transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          className={`lg:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMobileMenuOpen ? 1 : 0, 
            height: isMobileMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="py-4 space-y-3 border-t border-border/50">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href.replace('#', '')
                    ? 'text-orange-500 bg-orange-500/10'
                    : 'text-foreground hover:text-orange-500 hover:bg-orange-500/5'
                } rounded-lg`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-3">
              <Button
                onClick={() => scrollToSection('#contact')}
                size="sm"
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold"
              >
                Hire Me
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
};

// Scroll Progress Indicator
const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

// Simple Glowing Orb Component
const GlowingOrb = ({ className, delay = 0 }: { className?: string; delay?: number }) => (
  <motion.div
    className={`absolute rounded-full blur-xl ${className}`}
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: 6,
      repeat: Infinity,
      delay,
      ease: "easeInOut",
    }}
  />
);

// WhatsApp Contact Form Component
const WhatsAppContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const { name, email, message } = formData;
    
    if (!name || !message) {
      return;
    }

    const whatsappMessage = `Hi Md Aman! 👋

*Name:* ${name}
${email ? `*Email:* ${email}` : ''}

*Message:*
${message}

*Sent from your portfolio website*`;

    const phoneNumber = '917858925358'; // Your WhatsApp number
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappURL, '_blank');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="max-w-2xl mx-auto"
    >
      <Card className="hover:shadow-lg transition-all duration-300 border-2 border-green-200/50 hover:border-green-300/70 dark:border-green-900/50 dark:hover:border-green-800/70">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
            <MessageCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
            Send Message via WhatsApp
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Fill out the form below and click send to start a WhatsApp conversation with me instantly!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleWhatsAppSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4 text-orange-500" />
                  Name *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your full name"
                  required
                  className="bg-input-background border-2 border-transparent focus:border-orange-500/50 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <AtSign className="h-4 w-4 text-orange-500" />
                  Email (Optional)
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="bg-input-background border-2 border-transparent focus:border-orange-500/50 transition-colors"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center gap-2">
                <MessageCircle className="h-4 w-4 text-orange-500" />
                Message *
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell me about your project, requirements, or just say hello!"
                rows={5}
                required
                className="bg-input-background border-2 border-transparent focus:border-orange-500/50 transition-colors resize-none"
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                size="lg"
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                <Send className="mr-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                Send via WhatsApp
              </Button>
            </motion.div>

            <div className="text-center text-sm text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>Usually responds within 2-4 hours</span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default function App() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  const skills = {
    "Programming Languages": ["JavaScript", "Java", "HTML", "CSS", "EJS"],
    "Frameworks & Libraries": ["Node.js", "Express", "React.js", "Next.js", "Bootstrap", "Axios", "Leaflet"],
    "Databases & Caching": ["MongoDB (Atlas)", "Redis", "SQL", "Google Sheets API"],
    "Backend & Auth": ["REST APIs", "JWT Authentication", "Session Management", "Role-based Access Control"],
    "Core CS Concepts": ["Data Structures & Algorithms", "Microservices", "Asynchronous Programming"],
    "Deployment & Tools": ["Railway", "Render", "Hostinger", "Git", "GitHub", "GitHub Actions", "Postman", "VS Code"],
    "DevOps Tools": ["Docker", "Kubernetes", "Jenkins", "Ansible", "AWS", "Linux", "Shell Scripting"],
    "Soft Skills": ["Problem Solving", "Communication", "Team Collaboration", "Fast Learning"]
  };

  const projects = [
    {
      title: "GrowthAffinity - MLM System",
      description: "Live project with binary tree placement, BV calculation, and reward system. Features microservices architecture, API Gateway, Redis caching, and secure JWT authentication.",
      tech: ["Node.js", "Express", "MongoDB", "Redis", "JWT"],
      status: "Live Project",
      color: "from-orange-500 to-yellow-500",
      icon: <Zap className="h-6 w-6" />
    },
    {
      title: "Zoom-Style Video Calling App",
      description: "Real-time video calling application with WebRTC signaling, dynamic room features, and glassmorphism UI design with authentication pages.",
      tech: ["React.js", "Node.js", "WebRTC", "Socket.IO", "MySQL"],
      status: "Completed",
      color: "from-blue-500 to-purple-500",
      icon: <Code className="h-6 w-6" />
    },
    {
      title: "E-commerce App with RBAC",
      description: "Full-stack e-commerce platform with role-based access control for customers and admins. Deployed with complete DevOps pipeline.",
      tech: ["MERN Stack", "Prisma", "Docker", "Kubernetes"],
      status: "Completed",
      color: "from-green-500 to-teal-500",
      icon: <Sparkles className="h-6 w-6" />
    },
    {
      title: "Wanderlust (Airbnb Replica)",
      description: "Property booking platform with interactive maps for property search, Cloudinary image management, and session-based authentication.",
      tech: ["Node.js", "Express", "EJS", "Bootstrap", "Leaflet"],
      status: "Completed",
      color: "from-pink-500 to-red-500",
      icon: <Star className="h-6 w-6" />
    },
    {
      title: "CI/CD Pipeline with Docker & Kubernetes",
      description: "Automated build and deployment pipeline with scalable cloud infrastructure, featuring containerization and orchestration.",
      tech: ["Docker", "Kubernetes", "Jenkins", "AWS"],
      status: "Completed",
      color: "from-indigo-500 to-blue-500",
      icon: <Rocket className="h-6 w-6" />
    },
    {
      title: "Portfolio Website",
      description: "Responsive portfolio website with smooth animations, built using modern web technologies and deployed with optimized performance.",
      tech: ["Next.js", "TailwindCSS", "Framer Motion"],
      status: "Live",
      color: "from-yellow-500 to-orange-500",
      icon: <MousePointer className="h-6 w-6" />
    }
  ];

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-foreground dark relative overflow-x-hidden">
      <Navigation />
      <ScrollProgress />
      
      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center px-6 lg:px-12 relative overflow-hidden pt-16 lg:pt-20">
        {/* Subtle background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-background to-yellow-500/5"></div>
        <GlowingOrb className="top-20 left-20 w-72 h-72 bg-gradient-to-r from-orange-500/10 to-yellow-500/10" />
        <GlowingOrb className="bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10" delay={2} />
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              style={{ y: y1 }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              {/* Status Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full border border-green-500/30 backdrop-blur-sm"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-green-400">Available for Projects</span>
              </motion.div>

              {/* Main heading */}
              <div className="space-y-4">
                <motion.h1 
                  className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  Hi, I'm{' '}
                  <span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                    Md Aman
                  </span>
                </motion.h1>
                
                <motion.h2 
                  className="text-2xl md:text-3xl lg:text-4xl text-muted-foreground"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Full Stack Developer & DevOps Engineer
                </motion.h2>
              </div>

              {/* Description */}
              <motion.p 
                className="text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                I'm passionate about building scalable web applications and automating deployments. 
                Currently pursuing BCA while crafting impactful digital solutions with{' '}
                <span className="text-orange-500 font-semibold">MERN</span>,{' '}
                <span className="text-yellow-500 font-semibold">Next.js</span>, and{' '}
                <span className="text-green-500 font-semibold">DevOps</span> technologies.
              </motion.p>

              {/* Action buttons */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Button 
                  onClick={scrollToContact}
                  size="lg" 
                  className="group bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-black font-semibold px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Get In Touch
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              

              <a
                //  href="https://drive.google.com/file/d/1H77y2PQvZfhx7y0oLCFd-XdonSdyNHY5/view?usp=drivesdk"
                  href="Md Aman Resume.pdf"
                 target="_blank" 
                  rel="noopener noreferrer"
              >
                <Button 
                  variant="outline" 
                  size="lg"
                  className="group border-2 bg-transparent hover:bg-orange-500/10 px-8 py-6 text-lg transition-all duration-300"
                >
                  <Download className="mr-2 h-5 w-5 group-hover:translate-y-1 transition-transform" />
                  Download CV
                </Button>
              </a>
              </motion.div>

              {/* Quick stats */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="flex items-center gap-8 pt-4"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-500">6+</div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-500">8.89</div>
                  <div className="text-sm text-muted-foreground">SGPA</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">2026</div>
                  <div className="text-sm text-muted-foreground">Graduate</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Image */}
            <motion.div
              style={{ y: y2 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                {/* Image container with subtle glow */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl rotate-6 blur-xl"></div>
                  <div className="relative bg-background/80 backdrop-blur-sm rounded-2xl p-2 border border-white/10">
                    <ImageWithFallback
                      src='WhatsApp Image 2025-03-05 at 16.23.04_5d7ee6cf.jpg'
                      alt="Md Aman - Full Stack Developer"
                      className="w-full h-auto rounded-xl shadow-2xl"
                    />
                  </div>
                </div>

                {/* Floating social links */}
                <motion.div
                  className="absolute -bottom-4 -left-4 flex gap-3"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                >
                  {[
                    { icon: <Github className="h-5 w-5" />, href: "https://github.com/Md-Aman45", color: "hover:bg-gray-100 dark:hover:bg-gray-800" },
                    { icon: <Linkedin className="h-5 w-5" />, href: "https://linkedin.com/in/md-aman-7941a0355", color: "hover:bg-blue-50 dark:hover:bg-blue-900/20" },
                    { icon: <Mail className="h-5 w-5" />, href: "mailto:aman9534577@gmail.com", color: "hover:bg-red-50 dark:hover:bg-red-900/20" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      target={social.href.startsWith('http') ? '_blank' : undefined}
                      rel={social.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className={`p-3 bg-background/80 backdrop-blur-sm rounded-xl border border-white/10 ${social.color} transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-110`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
              About Me
            </h2>
            
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Enthusiastic software engineering student pursuing BCA at Patna University (expected May 2026) with a strong academic record of 8.89/10 SGPA. 
              </p>
              <p>
                Passionate about backend development and scalable systems, I bring hands-on experience in building robust web applications and automating deployments. My journey spans from achieving 90.80% in 10th grade to 79.80% in 12th grade, culminating in my current focus on cutting-edge development technologies.
              </p>
              <p>
                I thrive on solving complex problems and creating digital solutions that make a real impact. Whether it's architecting microservices, implementing DevOps pipelines, or crafting intuitive user interfaces, I'm always eager to push the boundaries of what's possible.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 px-6 lg:px-12 bg-muted/20">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>

          <div className="grid lg:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, skillList], index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-orange-500" />
                      {category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill) => (
                        <Badge key={skill} variant="secondary" className="hover:bg-orange-500/20 transition-colors">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Featured Projects
          </motion.h2>

          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:-translate-y-2 transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge className={`bg-gradient-to-r ${project.color} text-white`}>
                        {project.status}
                      </Badge>
                      <ExternalLink className="h-5 w-5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                    </div>
                    <CardTitle className="text-xl group-hover:text-orange-500 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20 px-6 lg:px-12 bg-muted/20">
        <div className="container mx-auto">
          <motion.h2 
            className="text-4xl lg:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Education
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-2xl text-orange-500">Bachelor of Computer Applications (BCA)</CardTitle>
                  <CardDescription className="text-lg">
                    Patna College (Patna University), Bihar
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-muted-foreground">Expected Graduation</p>
                      <p className="font-semibold">May 2026</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Current SGPA</p>
                      <p className="font-semibold text-orange-500">8.89/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Higher Secondary Education (12th)</CardTitle>
                  <CardDescription>ISC 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-green-500">79.80%</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <CardTitle className="text-xl">Secondary Education (10th)</CardTitle>
                  <CardDescription>BSEB 2021</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="font-semibold text-blue-500">90.80%</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 lg:px-12">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center space-y-12"
          >
            <div className="space-y-6">
              <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">
                Let's Build Something Together 🚀
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Ready to collaborate on your next project? Let's connect and create something amazing together.
              </p>
            </div>

            {/* WhatsApp Contact Form */}
            <WhatsAppContactForm />

            {/* Contact Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                {
                  href: "mailto:aman9534577@gmail.com",
                  icon: <Mail className="h-8 w-8" />,
                  title: "Email",
                  subtitle: "aman9534577@gmail.com",
                  color: "hover:bg-red-50 hover:border-red-200 dark:hover:bg-red-900/20"
                },
                {
                  href: "tel:+917858925358",
                  icon: <Phone className="h-8 w-8" />,
                  title: "Phone",
                  subtitle: "+91-7858925358",
                  color: "hover:bg-green-50 hover:border-green-200 dark:hover:bg-green-900/20"
                },
                {
                  href: "https://linkedin.com/in/md-aman-7941a0355",
                  icon: <Linkedin className="h-8 w-8" />,
                  title: "LinkedIn",
                  subtitle: "md-aman-7941a0355",
                  color: "hover:bg-blue-50 hover:border-blue-200 dark:hover:bg-blue-900/20"
                },
                {
                  href: "https://github.com/Md-Aman45",
                  icon: <Github className="h-8 w-8" />,
                  title: "GitHub",
                  subtitle: "Md-Aman45",
                  color: "hover:bg-gray-50 hover:border-gray-200 dark:hover:bg-gray-900/20"
                }
              ].map((contact, index) => (
                <motion.a
                  key={contact.title}
                  href={contact.href}
                  target={contact.href.startsWith('http') ? '_blank' : undefined}
                  rel={contact.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  className="block"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 + index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className={`cursor-pointer transition-all duration-300 ${contact.color}`}>
                    <CardContent className="p-6 text-center space-y-4">
                      <div className="text-orange-500">
                        {contact.icon}
                      </div>
                      <div>
                        <p className="font-semibold">{contact.title}</p>
                        <p className="text-sm text-muted-foreground">{contact.subtitle}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 lg:px-12 border-t">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2025 Md Aman. Built with React, TailwindCSS & Motion. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}