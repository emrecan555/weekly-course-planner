import { useMemo, useState } from "react";
import CourseForm from "../Components/CourseForm";
import CourseList from "../Components/CourseList";
import WeeklySchedule from "../Components/WeeklySchedule";
import EditCourseModal from "../Components/EditCourseModal";
import coursesData from "../data/courses.json";
import { createCourse } from "../Interfaces/createCourse";

function Home() {
  const [courses, setCourses] = useState(() => {
    try {
      const savedCourses = localStorage.getItem("courses");

      if (savedCourses) {
        const parsedCourses = JSON.parse(savedCourses);

        if (Array.isArray(parsedCourses) && parsedCourses.length > 0) {
          return parsedCourses;
        }
      }
    } catch (error) {
      console.error("LocalStorage verisi okunamadı:", error);
    }

    return coursesData;
  });

  const [editingCourse, setEditingCourse] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseHour = (time) => Number(time.split(":")[0]);

  const saveCourses = (updatedCourses) => {
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const hasTimeConflict = (newCourse, ignoreCourseId = null) => {
    const newStart = parseHour(newCourse.startTime);
    const newEnd = parseHour(newCourse.endTime);

    return courses.some((course) => {
      if (ignoreCourseId !== null && course.id === ignoreCourseId) {
        return false;
      }

      if (course.day !== newCourse.day) {
        return false;
      }

      const existingStart = parseHour(course.startTime);
      const existingEnd = parseHour(course.endTime);

      return newStart < existingEnd && newEnd > existingStart;
    });
  };

  const addCourse = (courseData) => {
    const newCourse = createCourse({
      id: Date.now(),
      ...courseData,
    });

    if (hasTimeConflict(newCourse)) {
      return {
        success: false,
        message: "Bu ders, aynı gün ve saat aralığında başka bir dersle çakışıyor.",
      };
    }

    const updatedCourses = [...courses, newCourse];
    saveCourses(updatedCourses);

    return {
      success: true,
    };
  };

  const deleteCourse = (id) => {
    const updatedCourses = courses.filter((course) => course.id !== id);
    saveCourses(updatedCourses);

    if (editingCourse && editingCourse.id === id) {
      setEditingCourse(null);
      setIsModalOpen(false);
    }
  };

  const editCourse = (course) => {
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const updateCourse = (updatedCourse) => {
    if (hasTimeConflict(updatedCourse, updatedCourse.id)) {
      return {
        success: false,
        message:
          "Güncellenen ders, aynı gün ve saat aralığında başka bir dersle çakışıyor.",
      };
    }

    const updatedCourses = courses.map((course) =>
      course.id === updatedCourse.id ? updatedCourse : course
    );

    saveCourses(updatedCourses);
    setEditingCourse(null);
    setIsModalOpen(false);

    return {
      success: true,
    };
  };

  const closeModal = () => {
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const resetToDefaultCourses = () => {
    saveCourses(coursesData);
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const totalWeeklyHours = useMemo(() => {
    return courses.reduce((sum, course) => {
      const startHour = parseHour(course.startTime);
      const endHour = parseHour(course.endTime);
      return sum + (endHour - startHour);
    }, 0);
  }, [courses]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-slate-100 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">
            Kişisel Ders Programı Oluşturucu
          </h1>
          <p className="text-gray-600 text-lg">
            Hazır programla başla, kendi derslerini ekle, düzenle ve haftalık planını oluştur.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center mb-8">
          <button
            onClick={resetToDefaultCourses}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl transition"
          >
            Varsayılan Programı Yükle
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start mb-8">
          <div>
            <CourseForm onAddCourse={addCourse} courses={courses} />
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="max-h-[520px] overflow-y-auto pr-2">
                <CourseList
                  courses={courses}
                  onDeleteCourse={deleteCourse}
                  onEditCourse={editCourse}
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-5">
              <h2 className="text-xl font-bold text-gray-800">
                Toplam Haftalık Ders Saati:{" "}
                <span className="text-blue-600">{totalWeeklyHours} saat</span>
              </h2>
            </div>
          </div>
        </div>

        <WeeklySchedule courses={courses} />

        <EditCourseModal
          isOpen={isModalOpen}
          course={editingCourse}
          onClose={closeModal}
          onUpdateCourse={updateCourse}
          courses={courses}
        />
      </div>
    </div>
  );
}

export default Home;