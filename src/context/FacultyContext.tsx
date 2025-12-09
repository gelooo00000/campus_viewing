import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Unified Faculty interface that works for both admin and student views
export interface Faculty {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  office: string;
  department: string;
  title: string;
  status: string;
  bio: string;
  specializations: string[];
  education: string[];
  awards: string[];
  profileImage?: string;
  officeHours: string;
  website?: string;
  // Additional fields for student view compatibility
  researchInterests?: string[];
  yearsOfExperience?: number;
}

interface FacultyContextType {
  faculty: Faculty[];
  addFaculty: (faculty: Faculty) => void;
  updateFaculty: (id: string, faculty: Partial<Faculty>) => void;
  deleteFaculty: (id: string) => void;
  getFacultyById: (id: string) => Faculty | undefined;
}

const FacultyContext = createContext<FacultyContextType | undefined>(undefined);

// Default mock data - Initial faculty members
const defaultFaculty: Faculty[] = [
  {
    id: "1",
    firstName: "Kenneth",
    lastName: "Gisalan",
    email: "kenneth.gisalan@sorsu-bulan.edu.ph",
    phone: "+63 919 345 6789",
    office: "Engineering Building, Room 203",
    department: "Information Technology",
    title: "Assistant Professor",
    status: "Active",
    bio: "Prof. Gisalan is an IT expert specializing in cybersecurity, network administration, and software development. He brings industry experience to the classroom and is passionate about preparing students for the digital workforce.",
    specializations: ["Information Technology", "Cybersecurity", "Network Administration", "Software Development"],
    education: [
      "M.S. in Information Technology, University of the Philippines Diliman",
      "B.S. in Computer Science, Ateneo de Manila University"
    ],
    awards: [
      "Outstanding IT Educator Award 2023",
      "Best Cybersecurity Research Paper 2022"
    ],
    officeHours: "Tue/Thu 2-4 PM",
    researchInterests: ["Cybersecurity", "Network Security", "Cloud Computing", "Digital Forensics"],
    yearsOfExperience: 8
  },
  {
    id: "2",
    firstName: "Sean Martin",
    lastName: "Fulay",
    email: "sean.fulay@sorsu-bulan.edu.ph",
    phone: "+63 917 888 5566",
    office: "Engineering Building, Room 204",
    department: "Information Technology",
    title: "IT Specialist Instructor",
    status: "Active",
    bio: "Mr. Fulay is an IT specialist with strong expertise in software development, system administration, and emerging technologies. He is dedicated to helping students build practical technical skills aligned with industry standards.",
    specializations: [
      "Software Development",
      "IT Infrastructure",
      "Network Systems",
      "Database Management"
    ],
    education: [
      "B.S. in Information Technology, Sorsogon State University",
      "Cisco Networking Certification (CCNA)"
    ],
    awards: ["Excellence in IT Instruction Award 2024"],
    officeHours: "Mon/Wed/Fri 1-3 PM",
    researchInterests: [
      "IT Infrastructure",
      "Web Development",
      "Cloud Services",
      "Systems Administration"
    ],
    yearsOfExperience: 5
  }
];

const STORAGE_KEY = 'university_faculty_data';

export function FacultyProvider({ children }: { children: ReactNode }) {
  const [faculty, setFaculty] = useState<Faculty[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.error('Error loading faculty data from localStorage:', error);
    }
    return defaultFaculty;
  });

  // Save to localStorage whenever faculty changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(faculty));
    } catch (error) {
      console.error('Error saving faculty data to localStorage:', error);
    }
  }, [faculty]);

  const addFaculty = (newFaculty: Faculty) => {
    setFaculty(prev => [newFaculty, ...prev]);
  };

  const updateFaculty = (id: string, updatedData: Partial<Faculty>) => {
    setFaculty(prev => prev.map(f => f.id === id ? { ...f, ...updatedData } : f));
  };

  const deleteFaculty = (id: string) => {
    setFaculty(prev => prev.filter(f => f.id !== id));
  };

  const getFacultyById = (id: string) => {
    return faculty.find(f => f.id === id);
  };

  return (
    <FacultyContext.Provider value={{ faculty, addFaculty, updateFaculty, deleteFaculty, getFacultyById }}>
      {children}
    </FacultyContext.Provider>
  );
}

export function useFaculty() {
  const context = useContext(FacultyContext);
  if (context === undefined) {
    throw new Error('useFaculty must be used within a FacultyProvider');
  }
  return context;
}

// Helper function to convert Faculty to student view format
export function facultyToStudentView(faculty: Faculty) {
  return {
    id: faculty.id,
    name: `${faculty.firstName} ${faculty.lastName}`,
    position: faculty.title,
    department: faculty.department,
    specialization: faculty.specializations,
    education: faculty.education.join('; '),
    email: faculty.email,
    phone: faculty.phone,
    officeLocation: faculty.office,
    profileImage: faculty.profileImage,
    bio: faculty.bio,
    achievements: faculty.awards,
    researchInterests: faculty.researchInterests || [],
    yearsOfExperience: faculty.yearsOfExperience || 5,
    employmentStatus: faculty.status === 'Active' ? 'Regular' : faculty.status
  };
}

