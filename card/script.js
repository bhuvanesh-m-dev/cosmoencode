document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');
    const navActions = document.getElementById('nav-actions');

    // Check for URL parameters
    const params = new URLSearchParams(window.location.search);
    // We consider it "Card Mode" if there is at least a name or email
    const hasData = params.has('name') || params.has('email');

    if (hasData) {
        renderCardView(params);
    } else {
        renderGeneratorView();
    }

    function renderCardView(params) {
        // Extract data
        const data = {
            name: params.get('name') || '',
            title: params.get('title') || '',
            company: params.get('company') || '',
            bio: params.get('bio') || '',
            avatar: params.get('avatar') || '',
            email: params.get('email') || '',
            phone: params.get('phone') || '',
            website: params.get('website') || '',
            location: params.get('location') || '',
            github: params.get('github') || '',
            linkedin: params.get('linkedin') || '',
            twitter: params.get('twitter') || '',
            instagram: params.get('instagram') || '',
            youtube: params.get('youtube') || '',
            portfolio: params.get('portfolio') || '',
            theme: params.get('theme') || 'light',
            accent: params.get('accent') || '#000000'
        };

        // Add "Create Your Own" button to nav
        navActions.innerHTML = `<a href="index.html" class="text-sm font-medium bg-black text-white px-4 py-2 rounded-lg hover:bg-neutral-800 transition-colors">Create Your Own</a>`;

        // Render Card
        appContainer.innerHTML = `
            <div class="flex flex-col items-center justify-center w-full gap-8 animate-fade-in">
                ${getCardHTML(data)}
                
                <div class="bg-white p-6 rounded-xl shadow-sm border border-neutral-200 flex flex-col items-center gap-4 w-full max-w-sm">
                    <h3 class="text-sm font-semibold text-neutral-500 uppercase tracking-wider">Scan to Save</h3>
                    <div id="qr-code" class="bg-white p-2 rounded-lg"></div>
                    <button id="share-btn" class="flex items-center gap-2 text-sm font-medium text-black hover:text-neutral-600 transition-colors">
                        <i class="fa-solid fa-share-nodes"></i> Share Card Link
                    </button>
                </div>
            </div>
        `;

        // Generate QR
        const qrCode = new QRCodeStyling({
            width: 200,
            height: 200,
            type: "svg",
            data: window.location.href,
            dotsOptions: { color: data.accent, type: "rounded" },
            backgroundOptions: { color: "#ffffff" },
            imageOptions: { crossOrigin: "anonymous", margin: 10 }
        });
        qrCode.append(document.getElementById("qr-code"));

        // Share functionality
        document.getElementById('share-btn').addEventListener('click', () => {
            if (navigator.share) {
                navigator.share({
                    title: `${data.name} - Digital Card`,
                    url: window.location.href
                });
            } else {
                navigator.clipboard.writeText(window.location.href);
                const btn = document.getElementById('share-btn');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Copied!';
                setTimeout(() => btn.innerHTML = originalText, 2000);
            }
        });
    }

    function renderGeneratorView() {
        navActions.innerHTML = ''; 

        appContainer.classList.remove('items-center', 'justify-center'); // Reset layout for grid
        appContainer.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
                <!-- Form Section -->
                <div class="lg:col-span-5 space-y-6">
                    <div class="bg-white rounded-xl shadow-sm border border-neutral-200 p-6">
                        <h2 class="text-lg font-bold mb-4">Create Your Card</h2>
                        <form id="card-form" class="space-y-4">
                            
                            <!-- Identity -->
                            <div class="space-y-3">
                                <h3 class="text-xs font-semibold text-neutral-400 uppercase">Identity</h3>
                                <input type="text" name="name" placeholder="Full Name" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm" required>
                                <input type="text" name="title" placeholder="Job Title" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                <input type="text" name="company" placeholder="Company" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                <textarea name="bio" placeholder="Short Bio" rows="2" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm"></textarea>
                                <input type="url" name="avatar" placeholder="Avatar URL (Optional)" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                            </div>

                            <!-- Contact -->
                            <div class="space-y-3">
                                <h3 class="text-xs font-semibold text-neutral-400 uppercase">Contact</h3>
                                <input type="email" name="email" placeholder="Email Address" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                <input type="tel" name="phone" placeholder="Phone Number" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                <input type="url" name="website" placeholder="Website URL" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                <input type="text" name="location" placeholder="Location" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                            </div>

                            <!-- Social -->
                            <div class="space-y-3">
                                <h3 class="text-xs font-semibold text-neutral-400 uppercase">Social Links</h3>
                                <div class="grid grid-cols-2 gap-3">
                                    <input type="url" name="github" placeholder="GitHub URL" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                    <input type="url" name="linkedin" placeholder="LinkedIn URL" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                    <input type="url" name="twitter" placeholder="Twitter URL" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                    <input type="url" name="instagram" placeholder="Instagram URL" class="w-full p-3 rounded-lg border border-neutral-200 focus:ring-2 focus:ring-black focus:border-transparent outline-none text-sm">
                                </div>
                            </div>

                            <!-- Customization -->
                            <div class="space-y-3">
                                <h3 class="text-xs font-semibold text-neutral-400 uppercase">Style</h3>
                                <div class="flex items-center gap-4">
                                    <div class="flex-1">
                                        <label class="block text-xs text-neutral-500 mb-1">Accent Color</label>
                                        <input type="color" name="accent" value="#000000" class="w-full h-10 rounded cursor-pointer">
                                    </div>
                                    <div class="flex-1">
                                        <label class="block text-xs text-neutral-500 mb-1">Theme</label>
                                        <select name="theme" class="w-full p-2.5 rounded-lg border border-neutral-200 text-sm bg-white outline-none focus:ring-2 focus:ring-black">
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                            <option value="midnight">Midnight</option>
                                            <option value="forest">Forest</option>
                                            <option value="berry">Berry</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <!-- Preview Section -->
                <div class="lg:col-span-7 space-y-6 sticky top-24 h-fit">
                    <div class="bg-neutral-100 rounded-xl p-8 flex flex-col items-center justify-center min-h-[500px] border border-neutral-200 relative overflow-hidden">
                        <div class="absolute top-4 left-4 text-xs font-bold text-neutral-400 uppercase tracking-widest">Live Preview</div>
                        
                        <div id="preview-container" class="w-full flex justify-center">
                            <!-- Card renders here -->
                        </div>

                        <!-- Generated Output -->
                        <div id="generated-output" class="hidden mt-8 w-full max-w-md bg-white p-4 rounded-xl shadow-lg border border-neutral-200 animate-fade-in">
                            <div class="flex gap-4">
                                <div id="preview-qr" class="flex-shrink-0"></div>
                                <div class="flex-grow min-w-0 flex flex-col justify-center">
                                    <p class="text-xs font-semibold text-neutral-500 mb-1">Your Card Link</p>
                                    <div class="flex gap-2">
                                        <input type="text" id="share-url" readonly class="w-full text-xs bg-neutral-50 border border-neutral-200 rounded p-2 text-neutral-600 truncate outline-none">
                                        <button id="copy-link-btn" class="bg-black text-white text-xs px-3 py-2 rounded hover:bg-neutral-800 transition-colors">Copy</button>
                                    </div>
                                    <a href="#" id="open-link-btn" target="_blank" class="text-xs text-blue-600 hover:underline mt-2 inline-block">Open in new tab &rarr;</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const form = document.getElementById('card-form');
        const previewContainer = document.getElementById('preview-container');
        const generatedOutput = document.getElementById('generated-output');
        const previewQr = document.getElementById('preview-qr');
        const shareUrlInput = document.getElementById('share-url');
        const copyLinkBtn = document.getElementById('copy-link-btn');
        const openLinkBtn = document.getElementById('open-link-btn');

        let qrCodeObj = null;

        // Initial Render
        updatePreview();

        // Event Listeners
        form.addEventListener('input', updatePreview);

        function updatePreview() {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            
            // Default preview data if empty
            if(!data.name) data.name = "Your Name";
            if(!data.title) data.title = "Job Title";
            
            previewContainer.innerHTML = getCardHTML(data);
            
            // Generate URL
            const params = new URLSearchParams();
            for (const [key, value] of formData.entries()) {
                if (value) params.append(key, value);
            }
            const fullUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
            
            // Update Output Section
            generatedOutput.classList.remove('hidden');
            shareUrlInput.value = fullUrl;
            openLinkBtn.href = fullUrl;

            // Update QR
            if (!qrCodeObj) {
                previewQr.innerHTML = '';
                qrCodeObj = new QRCodeStyling({
                    width: 100,
                    height: 100,
                    type: "svg",
                    data: fullUrl,
                    dotsOptions: { color: data.accent || "#000000", type: "rounded" },
                    backgroundOptions: { color: "#ffffff" }
                });
                qrCodeObj.append(previewQr);
            } else {
                qrCodeObj.update({
                    data: fullUrl,
                    dotsOptions: { color: data.accent || "#000000" }
                });
            }
        }

        copyLinkBtn.addEventListener('click', () => {
            shareUrlInput.select();
            document.execCommand('copy');
            const originalText = copyLinkBtn.textContent;
            copyLinkBtn.textContent = 'Copied!';
            setTimeout(() => copyLinkBtn.textContent = originalText, 2000);
        });
    }

    function getCardHTML(data) {
        const themes = {
            light: {
                bg: 'bg-white text-neutral-900',
                border: 'border-neutral-200',
                subText: 'text-neutral-500',
                iconBg: 'bg-neutral-100 hover:bg-neutral-200',
                avatarBorder: 'border-white',
                avatarBg: 'bg-neutral-100'
            },
            dark: {
                bg: 'bg-neutral-900 text-white',
                border: 'border-neutral-800',
                subText: 'text-neutral-400',
                iconBg: 'bg-neutral-800 hover:bg-neutral-700',
                avatarBorder: 'border-neutral-800',
                avatarBg: 'bg-neutral-800'
            },
            midnight: {
                bg: 'bg-slate-900 text-white',
                border: 'border-slate-800',
                subText: 'text-slate-400',
                iconBg: 'bg-slate-800 hover:bg-slate-700',
                avatarBorder: 'border-slate-800',
                avatarBg: 'bg-slate-800'
            },
            forest: {
                bg: 'bg-emerald-950 text-emerald-50',
                border: 'border-emerald-900',
                subText: 'text-emerald-400',
                iconBg: 'bg-emerald-900 hover:bg-emerald-800',
                avatarBorder: 'border-emerald-900',
                avatarBg: 'bg-emerald-900'
            },
            berry: {
                bg: 'bg-rose-950 text-rose-50',
                border: 'border-rose-900',
                subText: 'text-rose-300',
                iconBg: 'bg-rose-900 hover:bg-rose-800',
                avatarBorder: 'border-rose-900',
                avatarBg: 'bg-rose-900'
            }
        };

        const t = themes[data.theme] || themes.light;
        
        // Avatar handling
        const avatarHtml = data.avatar 
            ? `<img src="${data.avatar}" alt="${data.name}" class="w-24 h-24 rounded-full object-cover border-4 ${t.avatarBorder} shadow-lg mb-4">`
            : `<div class="w-24 h-24 rounded-full ${t.avatarBg} flex items-center justify-center mb-4 text-2xl font-bold ${t.subText}">${data.name.charAt(0)}</div>`;

        // Social Links
        const socialLinks = [
            { key: 'github', icon: 'fa-github', url: data.github },
            { key: 'linkedin', icon: 'fa-linkedin', url: data.linkedin },
            { key: 'twitter', icon: 'fa-twitter', url: data.twitter },
            { key: 'instagram', icon: 'fa-instagram', url: data.instagram },
            { key: 'youtube', icon: 'fa-youtube', url: data.youtube },
            { key: 'portfolio', icon: 'fa-globe', url: data.portfolio }
        ].filter(item => item.url).map(item => `
            <a href="${item.url}" target="_blank" class="w-10 h-10 rounded-full ${t.iconBg} flex items-center justify-center transition-colors text-lg" style="color: ${data.accent}">
                <i class="fa-brands ${item.icon}"></i>
            </a>
        `).join('');

        // Contact Info
        const contactInfo = [
            { val: data.email, icon: 'fa-envelope', href: `mailto:${data.email}` },
            { val: data.phone, icon: 'fa-phone', href: `tel:${data.phone}` },
            { val: data.website, icon: 'fa-link', href: data.website },
            { val: data.location, icon: 'fa-location-dot', href: null }
        ].filter(item => item.val).map(item => `
            <div class="flex items-center gap-3 ${t.subText} text-sm">
                <i class="fa-solid ${item.icon} w-4 text-center" style="color: ${data.accent}"></i>
                ${item.href ? `<a href="${item.href}" class="hover:underline">${item.val}</a>` : `<span>${item.val}</span>`}
            </div>
        `).join('');

        return `
            <div class="visiting-card ${t.bg} rounded-2xl shadow-xl overflow-hidden border ${t.border} relative flex flex-col sm:flex-row">
                <!-- Accent Bar -->
                <div class="h-2 sm:h-auto sm:w-2 w-full absolute top-0 left-0 sm:bottom-0" style="background-color: ${data.accent}"></div>
                
                <div class="p-8 flex flex-col sm:flex-row gap-8 w-full relative z-10">
                    <!-- Header / Left -->
                    <div class="flex flex-col items-center sm:items-start text-center sm:text-left min-w-[140px]">
                        ${avatarHtml}
                        <h1 class="text-xl font-bold tracking-tight mb-1 break-words w-full">${data.name}</h1>
                        ${data.title ? `<p class="text-sm ${t.subText} font-medium mb-1 break-words w-full">${data.title}</p>` : ''}
                        ${data.company ? `<p class="text-xs ${t.subText} uppercase tracking-wider break-words w-full">${data.company}</p>` : ''}
                    </div>

                    <!-- Body / Right -->
                    <div class="flex-grow flex flex-col justify-center gap-6 w-full">
                        ${data.bio ? `<p class="text-sm ${t.subText} italic border-l-2 pl-3 break-words" style="border-color: ${data.accent}30">${data.bio}</p>` : ''}
                        
                        <div class="space-y-2">
                            ${contactInfo}
                        </div>

                        ${socialLinks ? `<div class="flex flex-wrap gap-3 justify-center sm:justify-start pt-2">${socialLinks}</div>` : ''}
                    </div>
                </div>
            </div>
        `;
    }
});