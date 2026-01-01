import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * useQuizStatus
 * Custom hook to get quiz status (completed/ongoing) for a user and quiz type/difficulty
 * @param quizType - string (e.g. 'html')
 * @param difficulty - string (e.g. 'easy')
 * @returns 'completed' | 'ongoing' | null
 */
export function useQuizStatus(quizType: string, difficulty: string) {
  const { user } = useAuth();
  const [status, setStatus] = useState<'completed' | 'ongoing' | null>(null);

  useEffect(() => {
    async function fetchStatus() {
      if (!user?.id || !quizType || !difficulty) {
        setStatus(null);
        return;
      }
      try {
        const res = await fetch(`/api/user-results?user_id=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch user results');
        const data = await res.json();
        const completed = (data.results || []).some((r: any) =>
          String(r.quiz_type).toLowerCase() === String(quizType).toLowerCase() &&
          String(r.difficulty).toLowerCase() === String(difficulty).toLowerCase()
        );
        setStatus(completed ? 'completed' : 'ongoing');
      } catch {
        setStatus(null);
      }
    }
    fetchStatus();
  }, [user, quizType, difficulty]);

  return status;
}
