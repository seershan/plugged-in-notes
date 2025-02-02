document.addEventListener("DOMContentLoaded", () => {
    const note = document.getElementById("note")
    const noteTitle = document.getElementById("noteTitle")
    const wordCount = document.getElementById("wordCount")
    const letterCount = document.getElementById("letterCount")
    const darkModeToggle = document.getElementById("darkModeToggle")
    const body = document.body
    const sidebar = document.getElementById("sidebar")
    const editorContainer = document.getElementById("editorContainer")
  
    const notes = JSON.parse(localStorage.getItem("notes")) || []
    let currentNoteIndex = 0
    let tags = JSON.parse(localStorage.getItem("tags")) || []
  
    // Font controls
    document.getElementById("fontFamily").addEventListener("change", (e) => {
      note.style.fontFamily = e.target.value
    })
  
    document.getElementById("fontSize").addEventListener("change", (e) => {
      note.style.fontSize = e.target.value + "px"
    })
  
    document.getElementById("textColor").addEventListener("input", (e) => {
      note.style.color = e.target.value
    })
  
    document.getElementById("highlightColor").addEventListener("input", (e) => {
      note.style.backgroundColor = e.target.value
    })
  
    // Text formatting
    document.getElementById("boldBtn").addEventListener("click", () => {
      document.execCommand("bold", false, null)
    })
  
    document.getElementById("italicBtn").addEventListener("click", () => {
      document.execCommand("italic", false, null)
    })
  
    document.getElementById("underlineBtn").addEventListener("click", () => {
      document.execCommand("underline", false, null)
    })
  
    // Lists
    document.getElementById("orderedListBtn").addEventListener("click", () => {
      document.execCommand("insertOrderedList", false, null)
    })
  
    document.getElementById("unorderedListBtn").addEventListener("click", () => {
      document.execCommand("insertUnorderedList", false, null)
    })
  
    // Alignment
    document.getElementById("alignLeftBtn").addEventListener("click", () => {
      document.execCommand("justifyLeft", false, null)
    })
  
    document.getElementById("alignCenterBtn").addEventListener("click", () => {
      document.execCommand("justifyCenter", false, null)
    })
  
    document.getElementById("alignRightBtn").addEventListener("click", () => {
      document.execCommand("justifyRight", false, null)
    })
  
    // Multi-note support
    function displayNotes() {
      const noteList = document.getElementById("noteList")
      noteList.innerHTML = ""
      notes.forEach((note, index) => {
        const noteElement = document.createElement("div")
        noteElement.textContent = note.title
        noteElement.classList.add("fade-in")
        if (index === currentNoteIndex) {
          noteElement.classList.add("active")
        }
        noteElement.addEventListener("click", () => loadNote(index))
        noteList.appendChild(noteElement)
      })
    }
  
    function loadNote(index) {
      if (index >= 0 && index < notes.length) {
        currentNoteIndex = index
        noteTitle.value = notes[index].title
        note.innerHTML = notes[index].content
        updateCounts()
        displayNotes()
      } else {
        showNotification("Error: Note not found!", "error")
      }
    }
  
    document.getElementById("newNoteBtn").addEventListener("click", () => {
      notes.push({ title: "New Note", content: "" })
      currentNoteIndex = notes.length - 1
      noteTitle.value = "New Note"
      note.innerHTML = ""
      displayNotes()
      showNotification("New note created!", "success")
    })
  
    document.getElementById("saveBtn").addEventListener("click", () => {
      saveNote()
      showNotification("Note saved successfully!", "success")
    })
  
    document.getElementById("deleteNoteBtn").addEventListener("click", () => {
      if (notes.length > 1) {
        if (confirm("Are you sure you want to delete this note?")) {
          notes.splice(currentNoteIndex, 1)
          localStorage.setItem("notes", JSON.stringify(notes))
          currentNoteIndex = Math.max(0, currentNoteIndex - 1)
          loadNote(currentNoteIndex)
          showNotification("Note deleted successfully!", "success")
        }
      } else {
        showNotification("Cannot delete the last note!", "error")
      }
    })
  
    function saveNote() {
      notes[currentNoteIndex] = {
        title: noteTitle.value,
        content: note.innerHTML,
      }
      localStorage.setItem("notes", JSON.stringify(notes))
      displayNotes()
    }
  
    // Tags
    document.getElementById("addTagBtn").addEventListener("click", addTag)
  
    function displayTags() {
      const tagList = document.getElementById("tagList")
      tagList.innerHTML = ""
      tags.forEach((tag) => {
        const tagElement = document.createElement("span")
        tagElement.innerHTML = `${tag} <i class="fas fa-times"></i>`
        tagElement.classList.add("scale-in")
        tagElement.dataset.tag = tag
        tagElement.querySelector("i").addEventListener("click", () => removeTag(tag))
        tagList.appendChild(tagElement)
      })
    }
  
    function removeTag(tag) {
      const index = tags.indexOf(tag)
      if (index > -1) {
        tags.splice(index, 1)
        localStorage.setItem("tags", JSON.stringify(tags))
        displayTags()
        showNotification("Tag removed successfully!", "success")
      }
    }
  
    function addTag() {
      const tagInput = document.getElementById("tagInput")
      const newTags = tagInput.value
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "")
      if (newTags.length > 0) {
        tags = [...new Set([...tags, ...newTags])]
        localStorage.setItem("tags", JSON.stringify(tags))
        displayTags()
        tagInput.value = ""
        showNotification("Tags added successfully!", "success")
      }
    }
  
    document.getElementById("tagInput").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        addTag()
      }
    })
  
    // Search and Replace
    document.getElementById("searchBtn").addEventListener("click", () => {
      const searchTerm = document.getElementById("searchInput").value
      if (searchTerm) {
        const regex = new RegExp(searchTerm, "gi")
        note.innerHTML = note.innerHTML.replace(regex, (match) => `<mark class="highlight">${match}</mark>`)
        showNotification(`Highlighted all occurrences of "${searchTerm}"`, "info")
      }
    })
  
    document.getElementById("replaceBtn").addEventListener("click", () => {
      const searchTerm = document.getElementById("searchInput").value
      const replaceTerm = document.getElementById("replaceInput").value
      if (searchTerm && replaceTerm) {
        const regex = new RegExp(searchTerm, "gi")
        note.innerHTML = note.innerHTML.replace(regex, replaceTerm)
        showNotification("Text replaced successfully!", "success")
      }
    })
  
    // Export to PDF
    document.getElementById("exportPdfBtn").addEventListener("click", () => {
      const { jsPDF } = window.jspdf
      const doc = new jsPDF()
      doc.text(noteTitle.value, 10, 10)
      doc.text(note.innerText, 10, 20)
      doc.save(noteTitle.value + ".pdf")
      showNotification("PDF exported successfully!", "success")
    })
  
    // Toggle Markdown
    let isMarkdownMode = false
    document.getElementById("toggleMarkdownBtn").addEventListener("click", () => {
      isMarkdownMode = !isMarkdownMode
      if (isMarkdownMode) {
        note.innerText = note.innerHTML
        showNotification("Markdown mode enabled", "info")
      } else {
        const marked = window.marked
        note.innerHTML = marked(note.innerText)
        showNotification("Rich text mode enabled", "info")
      }
    })
  
    // Auto-save
    let autoSaveTimeout
    note.addEventListener("input", () => {
      clearTimeout(autoSaveTimeout)
      autoSaveTimeout = setTimeout(() => {
        saveNote()
        showNotification("Auto-saved", "info", 2000)
      }, 2000)
    })
  
    // Update word and letter counts
    function updateCounts() {
      const text = note.innerText
      wordCount.textContent = "Words: " + (text.trim() ? text.trim().split(/\s+/).length : 0)
      letterCount.textContent = "Letters: " + text.replace(/\s/g, "").length
    }
  
    note.addEventListener("input", updateCounts)
  
    // Toggle dark mode
    darkModeToggle.addEventListener("click", () => {
      body.classList.toggle("dark-mode")
      localStorage.setItem("darkMode", body.classList.contains("dark-mode"))
      showNotification(body.classList.contains("dark-mode") ? "Dark mode enabled" : "Light mode enabled", "info")
    })
  
    // Load dark mode preference
    if (localStorage.getItem("darkMode") === "true") {
      body.classList.add("dark-mode")
    }
  
    // Keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey) {
        switch (e.key) {
          case "b":
            e.preventDefault()
            document.execCommand("bold", false, null)
            break
          case "s":
            e.preventDefault()
            saveNote()
            showNotification("Note saved!", "success")
            break
          case "z":
            e.preventDefault()
            document.execCommand("undo", false, null)
            break
        }
      }
    })
  
    // Notification system
    function showNotification(message, type = "info", duration = 3000) {
      const notification = document.createElement("div")
      notification.textContent = message
      notification.className = `notification ${type} slide-in`
      document.body.appendChild(notification)
  
      setTimeout(() => {
        notification.classList.remove("slide-in")
        notification.classList.add("slide-out")
        setTimeout(() => {
          document.body.removeChild(notification)
        }, 300)
      }, duration)
    }
  
    // Responsive sidebar toggle
    const sidebarToggle = document.createElement("button")
    sidebarToggle.innerHTML = '<i class="fas fa-bars"></i>'
    sidebarToggle.className = "sidebar-toggle"
    sidebarToggle.addEventListener("click", () => {
      sidebar.classList.toggle("open")
    })
    document.body.appendChild(sidebarToggle)
  
    // Cloud sync placeholder
    document.getElementById("syncBtn").addEventListener("click", () => {
      showNotification("Cloud sync feature coming soon!", "warning")
    })
  
    // Initialize
    if (notes.length === 0) {
      notes.push({ title: "Welcome to Plugged In Notes", content: "Start writing your first note!" })
    }
    displayNotes()
    loadNote(0)
    displayTags()
  })
  
  // Add this to your existing JavaScript file

document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const main = document.querySelector('main');
  let backdrop;

  // Create backdrop element for mobile
  function createBackdrop() {
      backdrop = document.createElement('div');
      backdrop.className = 'sidebar-backdrop';
      document.body.appendChild(backdrop);
  }
  createBackdrop();

  // Toggle sidebar function
  function toggleSidebar() {
      sidebar.classList.toggle('collapsed');
      
      // Handle backdrop for mobile
      if (window.innerWidth <= 768) {
          if (sidebar.classList.contains('collapsed')) {
              backdrop.classList.remove('active');
          } else {
              backdrop.classList.add('active');
          }
      }

      // Save sidebar state to localStorage
      localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
  }

  // Add click event listeners
  sidebarToggle.addEventListener('click', toggleSidebar);
  
  // Close sidebar when clicking backdrop (mobile only)
  backdrop.addEventListener('click', function() {
      if (!sidebar.classList.contains('collapsed')) {
          toggleSidebar();
      }
  });

  // Handle window resize
  let timeout;
  window.addEventListener('resize', function() {
      clearTimeout(timeout);
      timeout = setTimeout(function() {
          if (window.innerWidth > 768) {
              backdrop.classList.remove('active');
          }
      }, 250);
  });

  // Restore sidebar state from localStorage
  const sidebarCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
  if (sidebarCollapsed) {
      sidebar.classList.add('collapsed');
  }
});