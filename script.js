let tasks = []; // Array untuk menyimpan tugas yang telah ditambahkan

// Fungsi untuk menambah tugas
function addTask(event) {
    event.preventDefault(); // Menghentikan pengiriman form

    // Ambil data dari form
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;
    const taskFile = document.getElementById('taskFile').files[0]; // Ambil file yang diupload

    if (!taskFile) {
        alert("Harap pilih file tugas.");
        return;
    }

    // Membaca file yang diupload menggunakan FileReader
    const reader = new FileReader();
    reader.onload = function(e) {
        const fileData = e.target.result;

        // Simpan tugas ke dalam array
        const task = {
            title: taskTitle,
            description: taskDescription,
            fileName: taskFile.name,
            fileData: fileData
        };
        tasks.push(task);

        // Perbarui daftar tugas
        displayTasks();

        // Reset form
        document.getElementById('taskForm').reset();
    };

    // Membaca file sebagai URL data (untuk menampilkan file atau link)
    reader.readAsDataURL(taskFile);
}

// Fungsi untuk menampilkan tugas
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; // Kosongkan daftar tugas sebelum ditampilkan ulang

    tasks.forEach((task, index) => {
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item');

        taskItem.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>File:</strong> ${task.fileName}</p>
            <a href="${task.fileData}" download="${task.fileName}">Download Tugas</a>
            <button onclick="deleteTask(${index})">Hapus</button>
        `;
        taskList.appendChild(taskItem);
    });
}

// Fungsi untuk menghapus tugas
function deleteTask(index) {
    tasks.splice(index, 1); // Menghapus tugas dari array berdasarkan index
    displayTasks(); // Perbarui tampilan tugas
}
