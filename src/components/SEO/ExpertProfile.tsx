import React from 'react';
import { Card, CardContent, CardHeader } from '../ui/card';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ExternalLink, Award, GraduationCap, Clock } from 'lucide-react';

export interface ExpertProfileProps {
  name: string;
  title: string;
  experience: string;
  certifications: string[];
  linkedinUrl?: string;
  image?: string;
  bio: string;
  specialties?: string[];
  education?: string[];
  yearsOfExperience?: number;
}

export const ExpertProfile: React.FC<ExpertProfileProps> = ({
  name,
  title,
  experience,
  certifications,
  linkedinUrl,
  image,
  bio,
  specialties = [],
  education = [],
  yearsOfExperience
}) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
      <CardHeader className="text-center pb-4">
        <div className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24 border-4 border-blue-200">
            <AvatarImage src={image} alt={`תמונה של ${name}`} />
            <AvatarFallback className="bg-blue-600 text-white text-xl font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          
          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-gray-900">{name}</h3>
            <p className="text-lg text-blue-600 font-semibold">{title}</p>
            
            {yearsOfExperience && (
              <div className="flex items-center justify-center space-x-2 text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{yearsOfExperience} שנות ניסיון</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Bio */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">אודות המומחה</h4>
          <p className="text-gray-700 leading-relaxed">{bio}</p>
        </div>

        {/* Experience */}
        <div>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">ניסיון מקצועי</h4>
          <p className="text-gray-700">{experience}</p>
        </div>

        {/* Specialties */}
        {specialties.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3">תחומי התמחות</h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800">
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <Award className="w-5 h-5 ml-2 text-yellow-600" />
              הסמכות ותעודות
            </h4>
            <ul className="space-y-2">
              {certifications.map((cert, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-blue-500 rounded-full ml-3 flex-shrink-0"></div>
                  {cert}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
              <GraduationCap className="w-5 h-5 ml-2 text-green-600" />
              השכלה
            </h4>
            <ul className="space-y-2">
              {education.map((edu, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <div className="w-2 h-2 bg-green-500 rounded-full ml-3 flex-shrink-0"></div>
                  {edu}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* LinkedIn Link */}
        {linkedinUrl && (
          <div className="pt-4 border-t border-gray-200">
            <a
              href={linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span>פרופיל LinkedIn</span>
            </a>
          </div>
        )}
      </CardContent>
    </Card>
  );
};