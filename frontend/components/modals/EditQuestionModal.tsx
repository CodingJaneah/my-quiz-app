import React from "react";

interface EditQuestionModalProps {
  show: boolean;
  question: {
    id: number;
    quiz_id: number;
    question: string;
    option_a: string;
    option_b: string;
    option_c: string;
    option_d: string;
    correct_answer: string;
  };
  onChange: (field: string, value: string) => void;
  onClose: () => void;
  onSave: () => void;
}

const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ show, question, onChange, onClose, onSave }) => {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-6">Edit Question</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Question</label>
            <textarea
              value={question.question}
              onChange={e => onChange("question", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
              rows={3}
              placeholder="Edit your question..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option A</label>
              <input
                type="text"
                value={question.option_a}
                onChange={e => onChange("option_a", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                placeholder="Option A"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option B</label>
              <input
                type="text"
                value={question.option_b}
                onChange={e => onChange("option_b", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                placeholder="Option B"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option C</label>
              <input
                type="text"
                value={question.option_c}
                onChange={e => onChange("option_c", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                placeholder="Option C"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Option D</label>
              <input
                type="text"
                value={question.option_d}
                onChange={e => onChange("option_d", e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
                placeholder="Option D"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correct Answer</label>
            <select
              value={question.correct_answer}
              onChange={e => onChange("correct_answer", e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-(--secondary-color)"
            >
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-(--secondary-color) hover:bg-(--hover-background) text-white rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditQuestionModal;
