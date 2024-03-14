# Fractals
https://cubedr.github.io/fractals/ \
A project to build a web-based fractal explorer in a day, inspired by the following Youtube video:

[![역사상 최고의 수학자도 풀지 못한 문제](https://img.youtube.com/vi/PROONug8hCM/0.jpg)](https://www.youtube.com/watch?v=PROONug8hCM)

The first target fractal is Mandelbrot.

![image](https://github.com/CubeDr/fractals/assets/13654700/35bca700-ece5-44ec-9e80-8977fbc87935)

Languages
- Plain Javascript
- HTML / CSS

Focuses
- Clean code
  - Modularization
    - Though written in plain javascript, we tried to gain the benefit of javascript's modularity as much as possible.
    - Most of the codes are written in their own module, maintaining high reusability.
  - Readability
    - The codes are kept short and concise to improve readability.
    - We tried our best to meet the [Google Javascript Coding Convention](https://google.github.io/styleguide/jsguide.html).
  - Scalability
    - The project can easily support other fractals other than the Mandelbrot set.
    - User interactions are built abstract, so we can easily add other interactions when needed.
- Smooth interaction
  - Double buffering
    - Only create two 2d arrays and toggle them to reduce unnecessary array creation.
  - Coordinate conversion
    - Fix cursor position when zoom in/out or drag so users can interact intuitively.
 
Future Improvements
- Optimizations
  - Progressive Loading
    - Unloaded parts of the fractal can be loaded progressively, by divide-and-conquer method.
  - Expanded canvas
    - We can render some area outside of the canvas in the background to prepare the user's drag interaction.
- Features
  - Precise calculation
    - Use precise decimal library to prevent fractals from breaking from precision errors when zoomed in too much.
  - Touch support
    - Support mobile interactions.
  - Wider canvas
    - Make canvas bigger. High optimization is required.
 
