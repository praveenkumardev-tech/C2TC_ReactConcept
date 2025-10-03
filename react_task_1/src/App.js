import { useState } from 'react';
import StudentForm from './components/StudentForm';
import StudentTable from './components/StudentTable';

// Main App Component
export default function App() {
  const [students, setStudents] = useState([
    { id: 1, name: 'Rahul Kumar', email: 'rahul@example.com', age: 20, course: 'Computer Science' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', age: 21, course: 'Electronics' }
  ]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    course: ''
  });
  
  const [errors, setErrors] = useState({});
  const [editingId, setEditingId] = useState(null);
  const [nextId, setNextId] = useState(3);

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 3) {
      newErrors.name = 'Name must be at least 3 characters';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.age) {
      newErrors.age = 'Age is required';
    } else if (formData.age < 15 || formData.age > 100) {
      newErrors.age = 'Age must be between 15 and 100';
    }
    
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // CREATE or UPDATE
  const handleSubmit = () => {
    if (validateForm()) {
      if (editingId) {
        // Update existing student
        setStudents(prev => prev.map(student => 
          student.id === editingId 
            ? { ...student, ...formData, age: parseInt(formData.age) }
            : student
        ));
        alert('Student updated successfully!');
      } else {
        // Create new student
        const newStudent = {
          id: nextId,
          ...formData,
          age: parseInt(formData.age)
        };
        setStudents(prev => [...prev, newStudent]);
        setNextId(prev => prev + 1);
        alert('Student added successfully!');
      }
      resetForm();
    }
  };

  // Handle Edit button click
  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      age: student.age.toString(),
      course: student.course
    });
  };

  // Handle Delete button click
  const handleDelete = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this student?');
    if (confirmDelete) {
      setStudents(prev => prev.filter(student => student.id !== id));
      
      // If we're editing this student, reset the form
      if (editingId === id) {
        resetForm();
      }
      
      alert('Student deleted successfully!');
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      age: '',
      course: ''
    });
    setErrors({});
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-indigo-900 mb-8">
          Student Management System
        </h1>

        <StudentForm 
          formData={formData}
          errors={errors}
          editingId={editingId}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
        />

        <StudentTable 
          students={students}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
