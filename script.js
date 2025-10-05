// script.js
// حفظ وقراءة المهام من Local Storage، وإدارة إضافة/حذف المهام في DOM
document.addEventListener('DOMContentLoaded', () => {
  // عناصر الصفحة
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  // Helper: قراءة المصفوفة من localStorage (ترجع مصفوفة حتى لو فارغة)
  function getStoredTasks() {
    return JSON.parse(localStorage.getItem('tasks') || '[]');
  }

  // Helper: حفظ مصفوفة المهام في localStorage
  function saveTasks(tasksArray) {
    localStorage.setItem('tasks', JSON.stringify(tasksArray));
  }

  /**
   * addTask
   * @param {string} taskTextParam - نص المهمة (إذا وُرد هنا نضيفها تلقائياً، وإلا نأخذ قيمة من الحقل)
   * @param {boolean} save - هل نريد حفظ المهمة في localStorage؟ (true افتراضيًا)
   */
  function addTask(taskTextParam, save = true) {
    // الحصول على نص المهمة وإزالة الفراغات
    const rawText = typeof taskTextParam === 'string' ? taskTextParam : taskInput.value;
    const taskText = rawText.trim();

    // إذا النص فاضي — نوقف
    if (!taskText) {
      // إذا الدالة نُفذت بدون براميتر (يعني من زر/انتر)، ننبّه المستخدم
      if (typeof taskTextParam !== 'string') {
        alert('Please enter a task!');
      }
      return;
    }

    // إنشاء عنصر li وspan للنص
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskText;
    li.appendChild(span);

    // إنشاء زر الحذف واستخدام classList.add كما هو مطلوب
    const removeBtn = document.createElement('button');
    removeBtn.textContent = 'Remove';
    removeBtn.classList.add('remove-btn');

    // عند الضغط على زر الحذف: نحذف العنصر من الـ DOM ونحدّث localStorage
    removeBtn.addEventListener('click', () => {
      // إزالة من الـ DOM
      if (taskList.contains(li)) {
        taskList.removeChild(li);
      }

      // تحديث localStorage: نحذف أول مطابقة للنص
      const stored = getStoredTasks();
      const idx = stored.indexOf(taskText);
      if (idx > -1) {
        stored.splice(idx, 1);
        saveTasks(stored);
      }
    });

    // إلحاق الزر والـ li إلى القائمة
    li.appendChild(removeBtn);
    taskList.appendChild(li);

    // حفظ المهمة في localStorage إذا save === true
    if (save) {
      const stored = getStoredTasks();
      stored.push(taskText);
      saveTasks(stored);
    }

    // تفريغ حقل الإدخال وتركيز المؤشر
    taskInput.value = '';
    taskInput.focus();
  }

  // تحميل جميع المهام من localStorage عند بداية الصفحة
  function loadTasks() {
    const storedTasks = getStoredTasks();
    storedTasks.forEach(taskText => {
      // نمرّر save = false لتجنّب إعادة الحفظ
      addTask(taskText, false);
    });
  }

  // مستمعين للأحداث: زر الإضافة و Enter داخل حقل الإدخال
  addButton.addEventListener('click', () => addTask());
  taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
      addTask();
    }
  });

  // تنفيذ التحميل عند انقشاع DOM
  loadTasks();
});
