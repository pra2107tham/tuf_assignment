import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [editFlashcard, setEditFlashcard] = useState(null);
  const [editForm, setEditForm] = useState({ question: '', answer: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const fetchFlashcards = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('flashcards')
      .select('*');

    if (error) {
      console.error('Error fetching flashcards:', error);
    } else {
      setFlashcards(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFlashcards();
  }, []);

  const handleSelectRow = (id) => {
    setSelectedRows((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((rowId) => rowId !== id)
        : [...prevSelected, id]
    );
  };

  const handleDeleteSelected = async () => {
    setIsProcessing(true);
    try {
      await Promise.all(
        selectedRows.map((id) =>
          supabase.from('flashcards').delete().match({ id })
        )
      );
      await fetchFlashcards();
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting flashcards:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditClick = (flashcard) => {
    setEditFlashcard(flashcard);
    setEditForm({ question: flashcard.question, answer: flashcard.answer });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateFlashcard = async () => {
    setIsProcessing(true);
    try {
      await supabase
        .from('flashcards')
        .update(editForm)
        .match({ id: editFlashcard.id });
      await fetchFlashcards();
      setEditFlashcard(null);
      setEditForm({ question: '', answer: '' });
    } catch (error) {
      console.error('Error updating flashcard:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    setIsProcessing(true);
    try {
      await supabase.from('flashcards').delete().match({ id });
      await fetchFlashcards();
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleAddFlashcard = async () => {
    setIsProcessing(true);
    try {
      const { data, error } = await supabase.from('flashcards').insert([newFlashcard]);
      if (error) throw error;
      await fetchFlashcards();
      setNewFlashcard({ question: '', answer: '' });
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding flashcard:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleChangeNewFlashcard = (e) => {
    const { name, value } = e.target;
    setNewFlashcard((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 p-6 bg-gray-100">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Questions LIST</h1>
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </header>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="btn btn-success"
          >
            Add New Question
          </button>
          <button
            onClick={handleDeleteSelected}
            className={`btn btn-error ${isProcessing ? 'btn-loading' : ''}`}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <>
                <span className="loading loading-spinner"></span>
                <span className="ml-2">Processing...</span>
              </>
            ) : (
              'Delete Selected'
            )}
          </button>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
              <thead>
                <tr>
                  <th className="border-b px-4 py-2 text-left text-gray-700">
                    <input
                      type="checkbox"
                      onChange={(e) =>
                        setSelectedRows(
                          e.target.checked
                            ? flashcards.map((card) => card.id)
                            : []
                        )
                      }
                      checked={selectedRows.length === flashcards.length}
                    />
                  </th>
                  <th className="border-b px-4 py-2 text-left text-gray-700">ID</th>
                  <th className="border-b px-4 py-2 text-left text-gray-700">Question</th>
                  <th className="border-b px-4 py-2 text-left text-gray-700">Answer</th>
                  <th className="border-b px-4 py-2 text-left text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {flashcards.map((flashcard) => (
                  <tr key={flashcard.id}>
                    <td className="border-b px-4 py-2">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(flashcard.id)}
                        onChange={() => handleSelectRow(flashcard.id)}
                      />
                    </td>
                    <td className="border-b px-4 py-2">{flashcard.id}</td>
                    <td className="border-b px-4 py-2">{flashcard.question}</td>
                    <td className="border-b px-4 py-2">{flashcard.answer}</td>
                    <td className="border-b px-4 py-2 flex space-x-2">
                      <button
                        onClick={() => handleEditClick(flashcard)}
                        className="btn btn-warning"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteFlashcard(flashcard.id)}
                        className="btn btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {showAddForm && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Add New Flashcard</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Question</label>
                <input
                  type="text"
                  name="question"
                  value={newFlashcard.question}
                  onChange={handleChangeNewFlashcard}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Answer</label>
                <input
                  type="text"
                  name="answer"
                  value={newFlashcard.answer}
                  onChange={handleChangeNewFlashcard}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAddForm(false)}
                  className="btn btn-neutral"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddFlashcard}
                  className={`btn btn-success ${isProcessing ? 'btn-loading' : ''}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    'Add Flashcard'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {editFlashcard && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <h2 className="text-2xl font-bold mb-4">Edit Flashcard</h2>
              <div className="mb-4">
                <label className="block text-gray-700">Question</label>
                <input
                  type="text"
                  name="question"
                  value={editForm.question}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Answer</label>
                <input
                  type="text"
                  name="answer"
                  value={editForm.answer}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setEditFlashcard(null)}
                  className="btn btn-neutral"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdateFlashcard}
                  className={`btn btn-warning ${isProcessing ? 'btn-loading' : ''}`}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="loading loading-spinner"></span>
                      <span className="ml-2">Processing...</span>
                    </>
                  ) : (
                    'Update Flashcard'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
