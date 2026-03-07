````markdown
# CosmoEncode

CosmoEncode is a lightweight SaaS-style QR code generation platform designed to create permanent, self-contained QR codes directly in the browser.

The platform allows users to generate QR codes, customize their appearance, and embed them into websites without relying on external QR APIs or backend servers.

CosmoEncode follows a stateless architecture, meaning all QR generation happens locally in the browser and the generated QR codes can be embedded permanently.

## Official Deployment

https://bhuvanesh-m-dev.github.io/cosmoencode

---

# Product Vision

CosmoEncode aims to provide a simple, reliable, and sustainable QR generation service where QR codes do not depend on third-party servers or external APIs.

Unlike many online QR tools that generate temporary links, CosmoEncode produces permanent QR embeds that remain functional indefinitely.

---

# Key Features

## Permanent QR Codes

CosmoEncode generates QR codes as Base64 encoded images.

This means the QR code image is embedded directly into HTML instead of being loaded from an external server.

### Benefits

- No external API calls
- No expiration
- Works offline
- Fully self-contained

### Example Embed Code

```html
<img src="data:image/png;base64,..." alt="CosmoEncode QR Code">
````

This ensures the QR code will always work once embedded.

---

## QR Code Customization

CosmoEncode allows users to customize the visual style of their QR codes.

### Pattern Styles

* Classic
* Bubble
* Smooth
* Sharp
* Elegant
* Dots

### Eye Styles (Corner Markers)

* Classic
* Circle
* Bubble
* Smooth
* Elegant
* Dotted

These options allow users to generate visually distinct QR codes while maintaining scanning reliability.

---

## Embed QR Codes

Users can embed generated QR codes directly into their websites using a simple HTML snippet.

### Example

```html
<!-- CosmoEncode QR Code -->
<img src="data:image/png;base64,..." alt="QR Code">
```

Because the QR image is embedded using Base64 encoding, the QR code remains permanent and independent of CosmoEncode servers.

---

## Download Options

Generated QR codes can be exported as:

* PNG
* SVG

PNG format is ideal for web use and printing.

SVG format allows infinite scaling without loss of quality.

---

# Architecture

CosmoEncode uses a fully client-side architecture.

```
User Input
     ↓
QR Generation in Browser
     ↓
Canvas Rendering
     ↓
Convert Image to Base64
     ↓
Embed or Download QR
```

No backend processing or database storage is required.

---

# Technology Stack

CosmoEncode is built using modern web technologies:

* HTML5
* CSS3
* JavaScript
* Client-side QR generation libraries

The platform is designed to run entirely on static hosting platforms such as GitHub Pages.

---

# Sustainability Approach

CosmoEncode focuses on sustainable web architecture.

Many QR generators rely on external APIs that generate a new QR image every time a page loads.

CosmoEncode avoids this by generating QR codes locally and embedding them directly into HTML.

### Advantages

* Reduced server dependency
* Lower network traffic
* Long-term reliability
* No third-party service requirements

---

# Example Workflow

1. User enters a URL or text.
2. CosmoEncode generates the QR code locally in the browser.
3. The QR code is rendered using canvas.
4. The image is converted into Base64.
5. The user can download or embed the QR code.

---

# Example Embed Output

```html
<!-- Generated with CosmoEncode -->
<div style="text-align:center;">
  <img src="data:image/png;base64,..." alt="QR Code" width="200">
  <p>Scan to visit</p>
</div>
```

---

# Deployment

CosmoEncode is deployed using GitHub Pages.

### Example Project Structure

```
cosmoencode/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│
└── README.md
```

### Live Application

[https://bhuvanesh-m-dev.github.io/cosmoencode](https://bhuvanesh-m-dev.github.io/cosmoencode)

---

# Future Improvements

Possible future enhancements include:

* advanced style customization
* logo embedding inside QR codes
* batch QR generation
* QR analytics (optional backend support)
* improved export formats

---

# License

CosmoEncode is an open project created and maintained by Bhuvanesh M.

```
```
