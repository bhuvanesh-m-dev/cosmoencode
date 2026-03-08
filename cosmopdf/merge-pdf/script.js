const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileListContainer = document.getElementById('file-list-container');
const fileList = document.getElementById('file-list');
const fileCount = document.getElementById('file-count');
const mergeBtn = document.getElementById('merge-btn');
const clearAllBtn = document.getElementById('clear-all');
const loading = document.getElementById('loading');
const themeToggleBtn = document.getElementById('theme-toggle');

let files = [];
let draggedIndex = null;

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.4.120/pdf.worker.min.js';

// Drag and Drop Events
dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    handleFiles(e.dataTransfer.files);
});

dropZone.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);
    fileInput.value = ''; // Reset input
});

function handleFiles(newFiles) {
    const validFiles = Array.from(newFiles).filter(file => file.type === 'application/pdf');
    
    if (validFiles.length === 0 && newFiles.length > 0) {
        alert('Please upload PDF files only.');
        return;
    }

    files = [...files, ...validFiles];
    updateUI();
}

function updateUI() {
    if (files.length > 0) {
        fileListContainer.classList.remove('hidden');
    } else {
        fileListContainer.classList.add('hidden');
    }

    fileCount.textContent = files.length;
    renderFileList();
}

function renderFileList() {
    fileList.innerHTML = '';
    
    files.forEach((file, index) => {
        const item = document.createElement('div');
        item.className = 'file-item relative bg-black p-4 border-2 border-white flex items-center justify-between group hover:bg-gray-900 transition-colors cursor-move';
        
        item.draggable = true;

        item.addEventListener('dragstart', (e) => {
            draggedIndex = index;
            item.classList.add('opacity-50');
            e.dataTransfer.effectAllowed = 'move';
        });

        item.addEventListener('dragend', () => {
            draggedIndex = null;
            item.classList.remove('opacity-50');
            document.querySelectorAll('.file-item').forEach(el => {
                el.classList.remove('border-dashed', 'bg-gray-800');
            });
        });

        item.addEventListener('dragover', (e) => {
            e.preventDefault();
        });

        item.addEventListener('dragenter', () => {
            if (draggedIndex !== null && draggedIndex !== index) {
                item.classList.add('border-dashed', 'bg-gray-800');
            }
        });

        item.addEventListener('dragleave', (e) => {
            if (item.contains(e.relatedTarget)) return;
            item.classList.remove('border-dashed', 'bg-gray-800');
        });

        item.addEventListener('drop', (e) => {
            e.preventDefault();
            if (draggedIndex !== null && draggedIndex !== index) {
                const itemToMove = files[draggedIndex];
                files.splice(draggedIndex, 1);
                files.splice(index, 0, itemToMove);
                updateUI();
            }
        });
        
        item.innerHTML = `
            <div class="flex items-center gap-4 overflow-hidden">
                <div class="w-10 h-10 border-2 border-white flex items-center justify-center flex-shrink-0 text-white font-mono text-sm">
                    PDF
                </div>
                <div class="min-w-0">
                    <p id="file-name-${index}" class="font-bold text-white truncate font-mono text-sm cursor-help hover:text-gray-300 transition-colors">${file.name}</p>
                    <p class="text-xs text-gray-400 font-mono">${formatSize(file.size)}</p>
                </div>
            </div>
            
            <!-- Preview Tooltip -->
            <div id="preview-${index}" class="hidden fixed left-8 top-1/2 -translate-y-1/2 z-50 bg-black border-2 border-white p-1 shadow-2xl pointer-events-none">
                <div class="w-64 h-80 flex items-center justify-center bg-gray-900">
                    <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
            </div>

            <div class="flex items-center gap-2">
                <button onclick="moveFile(${index}, -1)" class="w-8 h-8 border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center ${index === 0 ? 'opacity-30 cursor-not-allowed' : ''}" ${index === 0 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-up"></i>
                </button>
                <button onclick="moveFile(${index}, 1)" class="w-8 h-8 border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center ${index === files.length - 1 ? 'opacity-30 cursor-not-allowed' : ''}" ${index === files.length - 1 ? 'disabled' : ''}>
                    <i class="fas fa-arrow-down"></i>
                </button>
                <button onclick="removeFile(${index})" class="w-8 h-8 border border-white text-white hover:bg-white hover:text-black transition flex items-center justify-center ml-2">
                    <i class="fas fa-trash-alt"></i>
                </button>
            </div>
        `;
        
        fileList.appendChild(item);

        // Add hover events for preview
        const nameEl = item.querySelector(`#file-name-${index}`);
        const previewEl = item.querySelector(`#preview-${index}`);
        
        nameEl.addEventListener('mouseenter', () => {
            previewEl.classList.remove('hidden');
            renderPreview(file, previewEl);
        });
        
        nameEl.addEventListener('mouseleave', () => {
            previewEl.classList.add('hidden');
        });
    });
}

async function renderPreview(file, container) {
    if (container.querySelector('canvas')) return; // Already rendered

    try {
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await pdfjsLib.getDocument(arrayBuffer).promise;
        const page = await pdf.getPage(1);
        
        const viewport = page.getViewport({ scale: 1 });
        const desiredWidth = 256; // w-64 is roughly 256px
        const scale = desiredWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;

        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport
        };
        
        await page.render(renderContext).promise;
        
        container.innerHTML = '';
        container.appendChild(canvas);
    } catch (error) {
        console.error('Error rendering preview:', error);
        container.innerHTML = '<div class="w-64 h-80 flex items-center justify-center text-red-500 text-xs text-center p-2">Preview failed</div>';
    }
}

window.moveFile = (index, direction) => {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < files.length) {
        const temp = files[index];
        files[index] = files[newIndex];
        files[newIndex] = temp;
        updateUI();
    }
};

window.removeFile = (index) => {
    files.splice(index, 1);
    updateUI();
};

clearAllBtn.addEventListener('click', () => {
    files = [];
    updateUI();
});

function formatSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

mergeBtn.addEventListener('click', async () => {
    if (files.length < 2) {
        alert('Please select at least 2 PDF files to merge.');
        return;
    }

    try {
        loading.classList.remove('hidden');
        
        const mergedPdf = await PDFLib.PDFDocument.create();
        
        for (const file of files) {
            const arrayBuffer = await file.arrayBuffer();
            const pdf = await PDFLib.PDFDocument.load(arrayBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }
        
        const pdfBytes = await mergedPdf.save();
        download(pdfBytes, "merged-document.pdf", "application/pdf");
        
    } catch (error) {
        console.error('Error merging PDFs:', error);
        alert('An error occurred while merging the PDFs. Please try again.');
    } finally {
        loading.classList.add('hidden');
    }
});

// Theme Toggle Logic
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
    themeToggleBtn.querySelector('i').classList.replace('fa-sun', 'fa-moon');
}

themeToggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-theme');
    const icon = themeToggleBtn.querySelector('i');
    
    if (document.body.classList.contains('light-theme')) {
        localStorage.setItem('theme', 'light');
        icon.classList.replace('fa-sun', 'fa-moon');
    } else {
        localStorage.setItem('theme', 'dark');
        icon.classList.replace('fa-moon', 'fa-sun');
    }
});
