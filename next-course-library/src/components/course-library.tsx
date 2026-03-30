"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  Braces,
  Calculator,
  Cpu,
  Database,
  Network,
  NotebookText,
  Sigma,
} from "lucide-react";

type TrackKey = "cs" | "math" | "stats" | "joint";

type Course = {
  name: string;
  lectureCount: number;
  icon: React.ComponentType<{ className?: string }>;
};

const specializationLabels: Record<TrackKey, string> = {
  cs: "علوم",
  math: "رياضيات",
  stats: "إحصاء",
  joint: "مشترك",
};

const trackTitles: Record<TrackKey, string> = {
  cs: "علوم الحاسوب",
  math: "الرياضيات",
  stats: "الإحصاء",
  joint: "المواد المشتركة",
};

const courseData: Record<TrackKey, Course[]> = {
  cs: [
    { name: "تفاعل الإنسان والحاسوب", lectureCount: 10, icon: Network },
    { name: "البرمجة الموجهة بالأشياء", lectureCount: 10, icon: Braces },
    { name: "شبكات الحاسوب والإنترنت", lectureCount: 9, icon: Cpu },
    { name: "نظم المعلومات الإدارية", lectureCount: 8, icon: Database },
  ],
  math: [
    { name: "نظرية الزمر", lectureCount: 8, icon: Sigma },
    { name: "الطرق الرياضية", lectureCount: 9, icon: Calculator },
    { name: "التوبولوجيا العامة", lectureCount: 8, icon: NotebookText },
    { name: "نظرية الأعداد", lectureCount: 8, icon: BookOpen },
  ],
  stats: [
    { name: "أساليب أخذ العينات", lectureCount: 8, icon: Calculator },
    { name: "الطرق الإحصائية", lectureCount: 8, icon: Sigma },
    { name: "الاقتصاد القياسي", lectureCount: 9, icon: NotebookText },
    { name: "العمليات التصادفية", lectureCount: 8, icon: Cpu },
  ],
  joint: [
    { name: "الذكاء الاصطناعي والنظم الخبيرة", lectureCount: 10, icon: Cpu },
    { name: "أساسيات هندسة البرمجيات", lectureCount: 9, icon: Braces },
    { name: "تحليل السلاسل الزمنية", lectureCount: 8, icon: Network },
  ],
};

export default function CourseLibrary() {
  const [selectedTrack, setSelectedTrack] = useState<TrackKey>("cs");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const selectedCourses = courseData[selectedTrack];
  const selectedCourse = useMemo(() => {
    if (selectedCourseIndex === null) {
      return null;
    }
    return selectedCourses[selectedCourseIndex] ?? null;
  }, [selectedCourseIndex, selectedCourses]);

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-8 pt-4 sm:px-8 sm:pb-12 sm:pt-6">
      <header className="sticky top-4 z-30 mb-6 sm:mb-8">
        <div
          className={[
            "mx-auto flex w-full items-center justify-center rounded-full border border-white/20 px-4 backdrop-blur-xl transition-all duration-300 sm:px-6",
            scrolled
              ? "bg-white/8 py-2 shadow-[0_10px_30px_rgba(49,37,96,0.18)]"
              : "bg-white/10 py-3 shadow-[0_14px_38px_rgba(49,37,96,0.22)]",
          ].join(" ")}
        >
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="batch-pill inline-flex items-center rounded-full px-3 py-1.5 text-xs font-bold text-white sm:px-4">
              الدفعة 43
            </span>
            <p className="text-[12.5px] font-medium text-[#2f2a3d] sm:text-sm">جامعة الجزيرة | كلية العلوم الرياضية والحاسوب</p>
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/35 bg-white/18 p-1.5 drop-shadow-lg">
              <img
                src="/306845207_752117652624147_287869835984670059_n.jpg"
                alt="شعار كلية العلوم الرياضية والحاسوب"
                className="h-full w-full rounded-full object-cover"
              />
            </span>
          </div>
        </div>
      </header>

      <section className="glass-card rounded-[30px] p-5 shadow-[0_20px_45px_rgba(93,75,172,0.23)] sm:p-8">
        <div className="mb-7 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl font-extrabold text-[#2f2a3d] sm:text-3xl">مكتبة المقررات والمحاضرات</h1>
            <p className="mt-1.5 text-sm text-[#2f2a3d]/70 sm:text-base">اختر التخصص ثم اضغط على المقرر لعرض شبكة المحاضرات.</p>
          </div>
          <div className="rounded-full border border-white/75 bg-white/65 px-3 py-2 text-xs font-semibold text-[#2f2a3d]/80">
            واجهة تفاعلية عالية السلاسة
          </div>
        </div>

        <div className="flex flex-col gap-5 lg:flex-row-reverse">
          <aside className="glass-card w-full rounded-2xl p-3 lg:w-[220px]">
            <p className="mb-3 px-1 text-xs font-bold tracking-wide text-[#2f2a3d]/65">التخصصات</p>
            <div className="grid gap-2">
              {(Object.keys(specializationLabels) as TrackKey[]).map((track) => (
                <button
                  key={track}
                  type="button"
                  onClick={() => {
                    setSelectedTrack(track);
                    setSelectedCourseIndex(null);
                  }}
                  className={[
                    "rounded-xl border px-3 py-2.5 text-sm font-bold transition-all duration-300",
                    selectedTrack === track
                      ? "border-white/85 bg-gradient-to-l from-[#8b7cf6] to-[#ffb89f] text-white shadow-[0_14px_30px_rgba(106,90,217,0.33)]"
                      : "border-white/80 bg-white/70 text-[#2f2a3d] hover:-translate-y-0.5 hover:bg-white",
                  ].join(" ")}
                >
                  {specializationLabels[track]}
                </button>
              ))}
            </div>
          </aside>

          <div className="relative min-h-[430px] flex-1 overflow-hidden rounded-2xl">
            <div
              className={[
                "absolute inset-0 transition-all duration-400",
                selectedCourse ? "pointer-events-none translate-y-3 opacity-0" : "translate-y-0 opacity-100",
              ].join(" ")}
            >
              <div className="shelf-card h-full rounded-2xl p-5">
                <p className="text-center text-xs font-semibold text-[#2f2a3d]/55">Course Shelf</p>
                <h2 className="mt-1 text-center text-lg font-extrabold text-[#2f2a3d]">رف مقررات {trackTitles[selectedTrack]}</h2>
                <p className="mt-1 text-center text-xs text-[#2f2a3d]/65">اختر بطاقة مقرر للانتقال إلى شبكة المحاضرات</p>

                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {selectedCourses.map((course, index) => {
                    const Icon = course.icon;
                    return (
                      <button
                        key={course.name}
                        type="button"
                        onClick={() => setSelectedCourseIndex(index)}
                        className="course-card group h-[175px] rounded-2xl border border-white/80 bg-white/75 px-3 py-4 shadow-[inset_0_0_0_1px_rgba(139,124,246,0.08)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_28px_rgba(95,79,173,0.25)]"
                      >
                        <span className="mx-auto inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#8b7cf6]/35 bg-white/90 text-[#6a5ad9]">
                          <Icon className="h-4.5 w-4.5 stroke-[1.7]" />
                        </span>
                        <span className="mt-3 block text-center text-sm font-bold leading-6 text-[#2f2a3d]">{course.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div
              className={[
                "absolute inset-0 transition-all duration-400",
                selectedCourse ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0",
              ].join(" ")}
            >
              <div className="shelf-card h-full rounded-2xl p-5">
                <div className="mb-4 flex items-center justify-between gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedCourseIndex(null)}
                    className="rounded-lg border border-[#8b7cf6]/30 bg-white/80 px-3 py-2 text-xs font-bold text-[#6a5ad9] transition hover:bg-[#8b7cf6]/10"
                  >
                    العودة إلى الرف
                  </button>
                  <div>
                    <p className="text-left text-xs font-semibold text-[#2f2a3d]/55">Lecture Grid</p>
                    <h3 className="text-left text-sm font-extrabold text-[#2f2a3d] sm:text-base">{selectedCourse?.name}</h3>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {Array.from({ length: selectedCourse?.lectureCount ?? 0 }, (_, idx) => idx + 1).map((lectureNo) => (
                    <article
                      key={lectureNo}
                      className="rounded-2xl border border-white/80 bg-white/78 p-3.5 shadow-[0_12px_22px_rgba(95,79,173,0.18)] transition-all duration-300 hover:-translate-y-1"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <h4 className="text-sm font-extrabold text-[#2f2a3d]">المحاضرة {lectureNo}</h4>
                        <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-[#8b7cf6]/40 bg-white text-xs font-extrabold text-[#6a5ad9]">
                          {lectureNo}
                        </span>
                      </div>
                      <div className="grid gap-2">
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8b7cf6]/28 bg-white/85 px-2.5 py-2 text-xs font-bold text-[#2f2a3d] transition hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(106,90,217,0.2)]"
                        >
                          <BookOpen className="h-4 w-4 stroke-[1.7] text-[#6a5ad9]" />
                          تلخيص المحاضرة
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#8b7cf6]/28 bg-white/85 px-2.5 py-2 text-xs font-bold text-[#2f2a3d] transition hover:-translate-y-0.5 hover:shadow-[0_10px_18px_rgba(106,90,217,0.2)]"
                        >
                          <NotebookText className="h-4 w-4 stroke-[1.7] text-[#6a5ad9]" />
                          تمارين وتكليفات
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
