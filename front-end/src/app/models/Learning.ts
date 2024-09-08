export interface LearningInterFace {
    _id: String,
    course_id: String,
    user_id: String,
    current_lesson: String,
    current_chapter: String,
    completed_lessons: String[],
    createdAt?: String,
    updatedAt?: String,
    total_lesson?: number,
}