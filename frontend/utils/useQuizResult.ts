import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

/**
 * useQuizResult
 * Custom hook to get the user's quiz result for a quiz type and difficulty
 * @param quizType - string (e.g. 'js')
 * @param difficulty - string (e.g. 'easy')
 * @returns result object or null
 */
export function useQuizResult(quizType: string, difficulty: string) {
  const { user } = useAuth();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    async function fetchResult() {
      if (!user?.id || !quizType || !difficulty) {
        setResult(null);
        return;
      }
      try {
        const res = await fetch(`/api/user-results?user_id=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch user results');
        const data = await res.json();
        const found = (data.results || []).find((r: any) =>
          String(r.quiz_type).toLowerCase() === String(quizType).toLowerCase() &&
          String(r.difficulty).toLowerCase() === String(difficulty).toLowerCase()
        );
        setResult(found || null);
      } catch {
        setResult(null);
      }
    }
    fetchResult();
  }, [user, quizType, difficulty]);

  return result;
}
