"use client";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../../../frontend/context/AuthContext";
import AddQuestionModal from "../../../../../frontend/components/modals/AddQuestionModal";
import EditQuestionModal from "../../../../../frontend/components/modals/EditQuestionModal";
import DeleteConfirmationModal from "../../../../../frontend/components/modals/DeleteConfirmationModal";

/**
 * QuestionsPage
 * Displays all questions for a given quiz and difficulty.
 * Fetches questions from the backend API.
 * Shows quiz status (Completed/Ongoing) for the current user.
 */
export default function QuestionsPage() {
  const [editModal, setEditModal] = useState<{ show: boolean; question: any | null }>({ show: false, question: null });
  const params = useParams();
  const quizId = params?.quizId as string;
  // Normalize difficulty to lowercase to avoid case mismatch
  const difficulty = (params?.difficulty as string)?.toLowerCase();
  const [quizType, setQuizType] = useState<string>("");
  const [questions, setQuestions] = useState<Array<any>>([]);
  const [quizStatus, setQuizStatus] = useState<'completed' | 'ongoing' | null>(null);
    // Get current user from AuthContext
    const { user } = useAuth();
  // Fetch quiz type for this quizId
  useEffect(() => {
    async function fetchQuizType() {
      if (!quizId) return;
      try {
        const res = await fetch(`/api/admin/quizzes`);
        if (!res.ok) throw new Error('Failed to fetch quizzes');
        const data = await res.json();
        const quiz = (data.quizzes || data || []).find((q: any) => String(q.id) === String(quizId));
        setQuizType(quiz?.quiz_type || "");
      } catch {
        setQuizType("");
      }
    }
    fetchQuizType();
  }, [quizId]);

  // Fetch user quiz results and set quiz status
  useEffect(() => {
    async function fetchQuizStatus() {
      if (!user?.id || !quizType || !difficulty) {
        setQuizStatus(null);
        return;
      }
      try {
        const res = await fetch(`/api/user-results?user_id=${user.id}`);
        if (!res.ok) throw new Error('Failed to fetch user results');
        const data = await res.json();
        // Check if user has a result for this quizType and difficulty
        const completed = (data.results || []).some((r: any) =>
          String(r.quiz_type).toLowerCase() === String(quizType).toLowerCase() && String(r.difficulty).toLowerCase() === String(difficulty).toLowerCase()
        );
        setQuizStatus(completed ? 'completed' : 'ongoing');
      } catch (err) {
        setQuizStatus(null);
      }
    }
    fetchQuizStatus();
  }, [user, quizType, difficulty]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [questionToDelete, setQuestionToDelete] = useState<any | null>(null);
  const [newQuestion, setNewQuestion] = useState({
    quiz_id: Number(quizId),
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
  });

  // Handler for input changes in AddQuestionModal
  const handleQuestionChange = (field: string, value: string) => {
    setNewQuestion(prev => ({ ...prev, [field]: value }));
  };

  // Handler for adding a question (calls API to add question)
  const handleAddQuestion = async () => {
    try {
      const res = await fetch(`/api/admin/quizzes/${quizId}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...newQuestion, difficulty }),
      });
      if (!res.ok) throw new Error('Failed to add question');
      // Optionally, refresh questions list after adding
      setShowModal(false);
      setNewQuestion({
        quiz_id: Number(quizId),
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "A",
      });
      // Refresh questions
      if (quizId && difficulty) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`/api/admin/quizzes/${quizId}/questions?difficulty=${difficulty}`);
          if (!res.ok) throw new Error("Failed to fetch questions");
          const data = await res.json();
          setQuestions(data.questions || []);
        } catch (err: any) {
          setError(err.message || "Unknown error");
        } finally {
          setLoading(false);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Error adding question');
    }
  };

  useEffect(() => {
    async function fetchQuestions() {
      setLoading(true);
      setError("");
      try {
        // Debug log to verify values
        console.log('[QuestionsPage] Fetching with quizId:', quizId, 'difficulty:', difficulty);
        const res = await fetch(`/api/admin/quizzes/${quizId}/questions?difficulty=${difficulty}`);
        if (!res.ok) throw new Error("Failed to fetch questions");
        const data = await res.json();
        setQuestions(data.questions || []);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    }
    if (quizId && difficulty) fetchQuestions();
  }, [quizId, difficulty]);

  // Handler for editing a question (to be implemented)
  // Handler for opening the edit modal
  const handleEditQuestion = (question: any) => {
    setEditModal({ show: true, question: { ...question } });
  };

  // Handler for input changes in EditQuestionModal
  const handleEditChange = (field: string, value: string) => {
    setEditModal(prev => ({ ...prev, question: { ...prev.question, [field]: value } }));
  };

  // Handler for saving the edited question
  const handleSaveEdit = async () => {
    if (!editModal.question) return;
    try {
      const res = await fetch(`/api/admin/quizzes/${quizId}/questions`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editModal.question, difficulty }),
      });
      if (!res.ok) throw new Error('Failed to update question');
      setEditModal({ show: false, question: null });
      // Refresh questions after edit
      if (quizId && difficulty) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`/api/admin/quizzes/${quizId}/questions?difficulty=${difficulty}`);
          if (!res.ok) throw new Error("Failed to fetch questions");
          const data = await res.json();
          setQuestions(data.questions || []);
        } catch (err: any) {
          setError(err.message || "Unknown error");
        } finally {
          setLoading(false);
        }
      }
    } catch (err: any) {
      alert(err.message || 'Error updating question');
    }
  };



  // Handler for deleting a question
  const handleDeleteQuestion = async (question: any) => {
    // Open confirmation modal instead of native confirm
    setQuestionToDelete(question);
    setShowDeleteModal(true);
  };

  const confirmDeleteQuestion = async () => {
    if (!questionToDelete) return;
    try {
      const res = await fetch(`/api/admin/quizzes/${quizId}/questions`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questionId: questionToDelete.id }),
      });
      if (!res.ok) throw new Error('Failed to delete question');
      // Refresh questions after delete
      if (quizId && difficulty) {
        setLoading(true);
        setError("");
        try {
          const res = await fetch(`/api/admin/quizzes/${quizId}/questions?difficulty=${difficulty}`);
          if (!res.ok) throw new Error("Failed to fetch questions");
          const data = await res.json();
          setQuestions(data.questions || []);
        } catch (err: any) {
          setError(err.message || "Unknown error");
        } finally {
          setLoading(false);
        }
      }
      setShowDeleteModal(false);
      setQuestionToDelete(null);
    } catch (err: any) {
      alert(err.message || 'Error deleting question');
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setQuestionToDelete(null);
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between">
             <button
                className="mb-4 border border-gray-300 hover:bg-gray-100 py-2 px-4 rounded-lg"
                onClick={() => window.history.back()}
              >
                ← Back to Quiz Type
              </button>
              <button
                className="py-2 px-4 rounded-lg text-white bg-(--secondary-color) hover:bg-(--hover-background)"
                onClick={() => setShowModal(true)}
              >
                Add Question
              </button>
            {/* AddQuestionModal: show when showModal is true */}
            {showModal && (
              <AddQuestionModal
                show={showModal}
                newQuestion={newQuestion}
                onChange={handleQuestionChange}
                onClose={() => setShowModal(false)}
                onAdd={handleAddQuestion}
              />
            )}
      </div>
 
      <div className="flex items-center gap-4 mb-4">
        <h1 className="text-2xl font-bold">Questions - {difficulty?.charAt(0).toUpperCase() + difficulty?.slice(1)}</h1>
        {quizStatus && (
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${quizStatus === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
            {quizStatus === 'completed' ? 'Completed' : 'Ongoing'}
          </span>
        )}
      </div>
      {loading && <p>Loading questions...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <ul className="space-y-4">
          {questions.length === 0 ? (
            <li>No questions found for this difficulty.</li>
          ) : (
            questions.map((q: any, idx: number) => (
              <li key={q.id || idx} className="border rounded p-4 bg-white shadow flex items-center justify-between">
                <div>
                  <div className="font-semibold">Q{idx + 1}: {q.question}</div>
                  {/* Add more question details here if needed */}
                </div>
                <div className="flex gap-3">
                  {/* Edit icon */}
                  <button
                    title="Edit Question"
                    className="text-blue-500 hover:text-blue-700"
                    onClick={() => handleEditQuestion(q)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487a2.1 2.1 0 1 1 2.97 2.97L7.5 19.79l-4 1 1-4 13.362-13.303z" />
                    </svg>
                  </button>
                  {/* Delete icon */}
                  <button
                    title="Delete Question"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => handleDeleteQuestion(q)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    {/* EditQuestionModal: show when editModal.show is true */}
    {editModal.show && (
      <EditQuestionModal
        show={editModal.show}
        question={editModal.question}
        onChange={handleEditChange}
        onClose={() => setEditModal({ show: false, question: null })}
        onSave={handleSaveEdit}
      />
    )}
    <DeleteConfirmationModal
      show={showDeleteModal}
      title="Delete Question"
      message="This will permanently delete the question. Are you sure you want to continue?"
      onConfirm={confirmDeleteQuestion}
      onCancel={cancelDelete}
    />
  </div>
  );
}
