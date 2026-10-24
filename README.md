# ⚡ React Sorting Visualizer

An interactive, high-performance **Sorting Algorithm Visualizer & Telemetry Studio** built with **React 19** and **Vite**, styled in a sleek **Cyber-Glassmorphism** aesthetic.

![React](https://img.shields.io/badge/React-19.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-Glassmorphism-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

---

## 🌟 Overview

The **React Sorting Visualizer** transforms algorithmic concepts into intuitive, color-coded step-by-step animations. Users can inspect how various sorting algorithms work under the hood, feed in custom arrays or generate randomized datasets, adjust execution speeds in real time, and monitor live telemetry including operation counts (comparisons & swaps).

---

## ✨ Features

- **🎨 Cyber-Glassmorphism UI**: Deep radial gradients, frosted glass panels (`backdrop-filter`), glowing neon text headers, and vibrant state-dependent bar colors.
- **🔢 Custom Data Input**:
  - Set custom element count ($2 \le N \le 50$).
  - Enter custom numeric arrays (comma- or space-separated).
  - Instant **"Generate Random Numbers"** button for quick testing.
  - Input validation with real-time user feedback.
- **📊 Color-Coded Visual States**:
  - **Default**: Cyan gradient bars with value labels and indices.
  - **Comparing**: Glowing Amber/Yellow bars indicating elements currently being evaluated.
  - **Pivot**: Violet/Purple highlight for partitioning algorithms (Quick Sort).
  - **Sorted**: Emerald Green glow upon completion.
- **📈 Real-Time Telemetry & Metrics**:
  - Live comparison counter.
  - Live swap/overwrite counter.
  - Dynamic status badge: `Ready`, `Sorting... ⚡`, `Paused ⏸️`, and `Sorted 🎉`.
- **🕹️ Playback Controls**:
  - **Start / Pause / Resume**: Freeze execution at any step to inspect the array state.
  - **Speed Slider**: Dynamically adjust speed from slow step-by-step inspection to high-speed completion.
  - **Reset**: Instantly restore the original array order.

---

## 🧠 Supported Algorithms & Complexity

| Algorithm | Best Time | Average Time | Worst Time | Space Complexity | Stability |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Bubble Sort** | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Stable |
| **Selection Sort** | $O(N^2)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Unstable |
| **Insertion Sort** | $O(N)$ | $O(N^2)$ | $O(N^2)$ | $O(1)$ | Stable |
| **Quick Sort** | $O(N \log N)$ | $O(N \log N)$ | $O(N^2)$ | $O(\log N)$ | Unstable |
| **Merge Sort** | $O(N \log N)$ | $O(N \log N)$ | $O(N \log N)$ | $O(N)$ | Stable |

---

## 📁 Project Architecture

```text
sorting-visualizer/
├── frontend/
│   └── frontend/
│       ├── src/
│       │   ├── algorithms/
│       │   │   └── sortingAlgorithms.js  # Generator logic for moves/animations
│       │   ├── components/
│       │   │   ├── Visualizer.jsx        # Dynamic bar rendering & heights
│       │   │   └── customeInputSectio.jsx# Custom array input & validation
│       │   ├── App.jsx                   # Central state machine & controls
│       │   ├── App.css                   # Cyber-glassmorphic component styles
│       │   ├── index.css                 # Base resets, typography, and theme
│       │   └── main.jsx                  # React application root
│       ├── package.json                  # Dependencies & npm scripts
│       └── vite.config.js                # Vite build configuration
├── .gitignore                            # Excludes node_modules and builds
└── README.md                             # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed (version 18 or higher recommended).

### Installation & Running Locally

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Sachink00/React_sorting-visualizer.git
   cd React_sorting-visualizer
   ```

2. **Navigate to the frontend directory**:
   ```bash
   cd frontend/frontend
   ```

3. **Install dependencies**:
   ```bash
   npm install
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

5. **Open in browser**:
   Navigate to `http://localhost:5173/` in your browser.

---

## 🛠️ How It Works Internally

1. **Move Generator (`sortingAlgorithms.js`)**:
   Instead of using asynchronous delays directly inside sorting algorithms, each algorithm function takes an array copy and returns an ordered queue of discrete animation moves (`compare`, `swap`, `overwrite`, `pivot`).
2. **Tick Engine (`App.jsx`)**:
   A React `useEffect` timer ticks at an interval determined by the speed slider, popping moves one by one from the queue and updating React states.
3. **Responsive Visualizer (`Visualizer.jsx`)**:
   Array elements are rendered as flexible CSS vertical bars whose heights scale proportionally to $\frac{\text{value}}{\max(\text{value})}$.

---

## 🤝 Contributing

Contributions are welcome! If you'd like to add new algorithms (Heap Sort, Radix Sort, Shell Sort) or sound synthesis:

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/NewFeature`)
3. Commit your Changes (`git commit -m 'Add NewFeature'`)
4. Push to the Branch (`git push origin feature/NewFeature`)
5. Open a Pull Request

---

## 👤 Author

**Sachin Kumar**
- GitHub: [@Sachink00](https://github.com/Sachink00)
- Repository: [React_sorting-visualizer](https://github.com/Sachink00/React_sorting-visualizer)

---

## 📄 License

This project is licensed under the MIT License - feel free to use and adapt it for learning and personal projects!
