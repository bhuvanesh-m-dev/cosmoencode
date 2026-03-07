/**
 * QRGenerator
 * Encapsulates the QR Code generation logic using qr-code-styling library.
 * This separates the core generation logic from the UI handling.
 */
class QRGenerator {
    constructor() {
        this.qrCode = null;
    }

    /**
     * Initialize and render the QR code into the container.
     * @param {HTMLElement} container - The DOM element to append the QR code to.
     * @param {Object} config - The configuration object for the QR code.
     */
    init(container, config) {
        // Default options combined with provided config
        const finalConfig = {
            type: "canvas",
            imageOptions: {
                crossOrigin: "anonymous",
                margin: 10
            },
            ...config
        };

        // Clear previous content handled by library or manually if needed
        container.innerHTML = '';
        
        this.qrCode = new QRCodeStyling(finalConfig);
        this.qrCode.append(container);
    }

    update(config) {
        if (this.qrCode) this.qrCode.update(config);
    }

    download(name, extension) {
        if (this.qrCode) this.qrCode.download({ name, extension });
    }
}