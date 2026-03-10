function CourseList({ courses, onDeleteCourse, onEditCourse }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Ders Listesi</h2>

      {courses.length === 0 ? (
        <p className="text-gray-500">Henüz ders eklenmedi.</p>
      ) : (
        <div className="space-y-4">
          {courses.map((course) => (
            <div
              key={course.id}
              className="border rounded-2xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className={`w-4 h-16 rounded-full ${course.color}`}></div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {course.courseName}
                  </h3>
                  <p className="text-gray-600">
                    {course.day} | {course.startTime} - {course.endTime}
                  </p>
                  <p className="text-gray-600">Sınıf: {course.classroom || "-"}</p>
                  <p className="text-gray-600">
                    Öğretim Görevlisi: {course.instructor || "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => onEditCourse(course)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-2 rounded-xl transition"
                >
                  Düzenle
                </button>
                <button
                  onClick={() => onDeleteCourse(course.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Sil
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default CourseList;