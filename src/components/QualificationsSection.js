import React from 'react';
import { GraduationCap, Code } from 'lucide-react';

const QualificationsSection = ({ isVisible }) => (
  <section id="qualifications" className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="max-w-6xl mx-auto px-6">
      <div className={`text-center mb-16 transition-all duration-1000 ${
        isVisible.qualifications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Qualifications</h2>
      </div>
      <div className="grid lg:grid-cols-2 gap-12">
        <div className={`space-y-8 transition-all duration-1000 ${
          isVisible.qualifications ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Education</h3>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="font-bold text-lg text-gray-900">B.tech CSE</h4>
            <p className="text-blue-600 font-semibold">2023 to present</p>
            <p className="text-gray-600">Lovely Professional University</p>
          </div>
        </div>
        <div className={`space-y-8 transition-all duration-1000 delay-300 ${
          isVisible.qualifications ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
              <Code className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">Skills</h3>
          </div>
          <div className="space-y-4">
            {[
              { skill: 'Web Development', level: 90 },
              { skill: 'React JS', level: 85 },
              { skill: 'Project Management', level: 80 },
              { skill: 'UI UX Designer', level: 75 }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-4 shadow-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-900">{item.skill}</span>
                  <span className="text-blue-600 font-semibold">{item.level}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: isVisible.qualifications ? `${item.level}%` : '0%'
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default QualificationsSection;
