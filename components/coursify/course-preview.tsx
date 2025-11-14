'use client';

interface CoursePreviewProps {
  title: string;
  description: string;
  modules?: Array<{
    title: string;
    lessons: Array<{ title: string }>;
  }>;
}

export function CoursePreview({ title, description, modules = [] }: CoursePreviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>

      {modules.length > 0 && (
        <div className="space-y-4">
          <h4 className="font-semibold text-gray-900">Course Structure</h4>
          {modules.map((module, idx) => (
            <div key={idx} className="border-l-4 border-purple-500 pl-4">
              <h5 className="font-medium text-gray-900">{module.title}</h5>
              <ul className="mt-2 space-y-1">
                {module.lessons.map((lesson, lessonIdx) => (
                  <li key={lessonIdx} className="text-sm text-gray-600">
                    • {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
