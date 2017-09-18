# Sierpinski Triangle Explorer

- Sierpinski trianlge explore using pan and zoom

## Built-with

- Webpack
- D3
- Bootsrap-Sass

## Installing and running

npm:
- npm i
- npm run dev
- npm run dist

# Notes

I decided to use D3. I've heard its used for graphs and data visualisation. It also handles svg which I initially though was a good choice for zooming without loss of quality. In retrospect my feeling to go with canvas due to performance gains was probably correct.

Looked at various articles about Sirepnski traingles and other self organsing structures. Shrinking and duplication made most sense to me when thinking about programming the structure.

I dont beleieve in re-inventing the wheel so I did look at solutions/algorithm other people have produced

I liked the simpleness of this one:

http://gettingsharper.de/2012/04/03/a-simple-fractal-using-paper-js/

Found this fiddle had taken the approach of above but written for d3, which I borrowed heavily from:

http://jsfiddle.net/khigia/rggQB/ 